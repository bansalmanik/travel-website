/**
 * Restore Cloudflare D1 database from JSON backup
 * 
 * Usage: node scripts/restore-d1.js backups/d1-backup-YYYY-MM-DD.json
 */

const { execSync } = require('child_process');
const fs = require('fs');

const backupFile = process.argv[2];

if (!backupFile) {
  console.error('❌ Please provide a backup file path');
  console.log('Usage: node scripts/restore-d1.js backups/d1-backup-YYYY-MM-DD.json');
  process.exit(1);
}

if (!fs.existsSync(backupFile)) {
  console.error(`❌ Backup file not found: ${backupFile}`);
  process.exit(1);
}

console.log('🔄 Starting D1 database restore...\n');
console.log(`📁 Reading backup from: ${backupFile}\n`);

try {
  // Read backup file
  const backup = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
  
  console.log(`📅 Backup created: ${backup.timestamp}`);
  console.log(`🗄️  Database: ${backup.database}\n`);
  
  // Generate SQL
  let sql = '-- Restore from backup\n';
  sql += `-- Backup date: ${backup.timestamp}\n\n`;
  
  // Clear existing data
  sql += '-- Clear existing data\n';
  sql += 'DELETE FROM transfer_bonuses;\n';
  sql += 'DELETE FROM conversion_rates;\n';
  sql += 'DELETE FROM point_sources;\n';
  sql += 'DELETE FROM programs;\n\n';
  
  // Restore programs
  sql += '-- Restore programs\n';
  const programs = backup.tables.programs[0]?.results || [];
  programs.forEach(p => {
    const name = p.name.replace(/'/g, "''");
    const type = p.type.replace(/'/g, "''");
    const logo = p.logo_url ? p.logo_url.replace(/'/g, "''") : '';
    sql += `INSERT INTO programs (id, name, type, logo_url, enabled) VALUES (${p.id}, '${name}', '${type}', '${logo}', ${p.enabled});\n`;
  });
  
  // Restore point_sources
  sql += '\n-- Restore point sources\n';
  const sources = backup.tables.point_sources[0]?.results || [];
  sources.forEach(s => {
    const name = s.name.replace(/'/g, "''");
    const type = s.type.replace(/'/g, "''");
    const logo = s.logo_url ? s.logo_url.replace(/'/g, "''") : '';
    const programId = s.program_id || 'NULL';
    sql += `INSERT INTO point_sources (id, program_id, name, type, logo_url, enabled) VALUES (${s.id}, ${programId}, '${name}', '${type}', '${logo}', ${s.enabled});\n`;
  });
  
  // Restore conversion_rates
  sql += '\n-- Restore conversion rates\n';
  const rates = backup.tables.conversion_rates[0]?.results || [];
  rates.forEach(r => {
    const rate = r.rate.replace(/'/g, "''");
    const insight = r.insight ? r.insight.replace(/'/g, "''") : '';
    const cap = r.annual_cap ? r.annual_cap.replace(/'/g, "''") : '';
    const group = r.group_type ? r.group_type.replace(/'/g, "''") : '';
    sql += `INSERT INTO conversion_rates (id, from_source_id, to_source_id, rate, insight, annual_cap, group_type, enabled) VALUES (${r.id}, ${r.from_source_id}, ${r.to_source_id}, '${rate}', '${insight}', '${cap}', '${group}', ${r.enabled});\n`;
  });
  
  // Restore transfer_bonuses
  sql += '\n-- Restore transfer bonuses\n';
  const bonuses = backup.tables.transfer_bonuses[0]?.results || [];
  bonuses.forEach(b => {
    const desc = b.bonus_description ? b.bonus_description.replace(/'/g, "''") : '';
    const terms = b.terms ? b.terms.replace(/'/g, "''") : '';
    sql += `INSERT INTO transfer_bonuses (id, conversion_rate_id, bonus_percentage, bonus_description, start_date, end_date, terms, enabled) VALUES (${b.id}, ${b.conversion_rate_id}, ${b.bonus_percentage}, '${desc}', '${b.start_date}', '${b.end_date}', '${terms}', ${b.enabled});\n`;
  });
  
  // Write SQL to temp file
  const tempFile = 'temp-restore.sql';
  fs.writeFileSync(tempFile, sql);
  
  console.log('⚠️  WARNING: This will DELETE all current data and restore from backup!');
  console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
  // Wait 5 seconds
  execSync('timeout /t 5', { stdio: 'inherit' });
  
  // Execute restore
  console.log('🔄 Restoring database...');
  execSync(`npx wrangler d1 execute points-conversion-db --remote --file=${tempFile}`, {
    stdio: 'inherit'
  });
  
  // Clean up
  fs.unlinkSync(tempFile);
  
  console.log('\n✅ Restore completed successfully!');
  console.log(`📊 Restored:`);
  console.log(`   Programs: ${programs.length}`);
  console.log(`   Point Sources: ${sources.length}`);
  console.log(`   Conversion Rates: ${rates.length}`);
  console.log(`   Transfer Bonuses: ${bonuses.length}`);
  
} catch (error) {
  console.error('❌ Restore failed:', error.message);
  process.exit(1);
}
