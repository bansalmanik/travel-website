/**
 * Backup Cloudflare D1 database to JSON
 * 
 * Usage: node scripts/backup-d1.js
 */

const { execSync } = require('child_process');
const fs = require('fs');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const backupDir = 'backups';
const backupFile = `${backupDir}/d1-backup-${timestamp}.json`;

// Create backups directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

console.log('📦 Starting D1 database backup...\n');

try {
  // Export programs
  console.log('Exporting programs...');
  const programs = execSync(
    'npx wrangler d1 execute points-conversion-db --remote --command="SELECT * FROM programs" --json',
    { encoding: 'utf8' }
  );
  
  // Export point_sources
  console.log('Exporting point sources...');
  const pointSources = execSync(
    'npx wrangler d1 execute points-conversion-db --remote --command="SELECT * FROM point_sources" --json',
    { encoding: 'utf8' }
  );
  
  // Export conversion_rates
  console.log('Exporting conversion rates...');
  const conversionRates = execSync(
    'npx wrangler d1 execute points-conversion-db --remote --command="SELECT * FROM conversion_rates" --json',
    { encoding: 'utf8' }
  );
  
  // Export transfer_bonuses
  console.log('Exporting transfer bonuses...');
  const transferBonuses = execSync(
    'npx wrangler d1 execute points-conversion-db --remote --command="SELECT * FROM transfer_bonuses" --json',
    { encoding: 'utf8' }
  );
  
  // Combine all data
  const backup = {
    timestamp: new Date().toISOString(),
    database: 'points-conversion-db',
    tables: {
      programs: JSON.parse(programs),
      point_sources: JSON.parse(pointSources),
      conversion_rates: JSON.parse(conversionRates),
      transfer_bonuses: JSON.parse(transferBonuses)
    }
  };
  
  // Write to file
  fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
  
  console.log(`\n✅ Backup completed successfully!`);
  console.log(`📁 Backup saved to: ${backupFile}`);
  console.log(`📊 Backup size: ${(fs.statSync(backupFile).size / 1024).toFixed(2)} KB`);
  
  // Show summary
  console.log('\n📈 Backup Summary:');
  console.log(`   Programs: ${backup.tables.programs[0]?.results?.length || 0}`);
  console.log(`   Point Sources: ${backup.tables.point_sources[0]?.results?.length || 0}`);
  console.log(`   Conversion Rates: ${backup.tables.conversion_rates[0]?.results?.length || 0}`);
  console.log(`   Transfer Bonuses: ${backup.tables.transfer_bonuses[0]?.results?.length || 0}`);
  
} catch (error) {
  console.error('❌ Backup failed:', error.message);
  process.exit(1);
}
