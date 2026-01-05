/**
 * Migration script: JSON → Cloudflare D1
 * 
 * This script reads data/points-conversion.json and migrates it to D1 database
 * 
 * Usage:
 *   node scripts/migrate-to-d1.js
 */

const fs = require('fs');
const { execSync } = require('child_process');

// Read JSON data
const jsonData = JSON.parse(fs.readFileSync('data/points-conversion.json', 'utf8'));

console.log('📊 Starting migration...');
console.log(`Found ${jsonData.length} conversion entries in JSON\n`);

// Track unique programs and partners
const programs = new Map();
const pointSources = new Map();
const conversions = [];

// Step 1: Extract unique programs and point sources
console.log('Step 1: Extracting programs and point sources...');

jsonData.forEach((entry) => {
  const programName = entry.program;
  const cardName = entry.from;
  
  // Add program if not exists
  if (!programs.has(programName)) {
    programs.set(programName, {
      name: programName,
      type: 'credit_card_issuer',
      logo_url: `/Logo/${programName.toLowerCase()}_logo.webp`
    });
  }
  
  // Add card (point source) if not exists
  const cardKey = `${programName}:${cardName}`;
  if (!pointSources.has(cardKey)) {
    pointSources.set(cardKey, {
      program: programName,
      name: cardName,
      type: 'credit_card'
    });
  }
  
  // Extract partners from rates
  entry.rates.forEach((rateGroup) => {
    rateGroup.partners.forEach((partner) => {
      const partnerKey = `partner:${partner.to}`;
      
      if (!pointSources.has(partnerKey)) {
        // Determine partner type
        let partnerType = 'airline_miles';
        if (partner.to.includes('Marriott') || partner.to.includes('IHG') || partner.to.includes('Accor') || partner.to.includes('Wyndham')) {
          partnerType = 'hotel_points';
        } else if (partner.to.includes('ITC')) {
          partnerType = 'hotel_points';
        }
        
        pointSources.set(partnerKey, {
          program: null,
          name: partner.to,
          type: partnerType,
          logo_url: `/Logo/${partner.to.toLowerCase().replace(/\s+/g, '_')}_logo.webp`
        });
      }
      
      // Store conversion for later
      conversions.push({
        from: cardKey,
        to: partnerKey,
        rate: rateGroup.rate,
        insight: partner.insight,
        enabled: partner.enabled
      });
    });
  });
});

console.log(`✓ Found ${programs.size} unique programs`);
console.log(`✓ Found ${pointSources.size} unique point sources`);
console.log(`✓ Found ${conversions.length} conversion rates\n`);

// Step 2: Generate SQL
console.log('Step 2: Generating SQL...');

let sql = '-- Generated migration SQL\n\n';

// Insert programs
sql += '-- Insert programs\n';
programs.forEach((program) => {
  const name = program.name.replace(/'/g, "''");
  const type = program.type.replace(/'/g, "''");
  const logo = program.logo_url.replace(/'/g, "''");
  sql += `INSERT OR IGNORE INTO programs (name, type, logo_url) VALUES ('${name}', '${type}', '${logo}');\n`;
});

sql += '\n-- Insert point sources\n';
pointSources.forEach((source, key) => {
  const name = source.name.replace(/'/g, "''");
  const type = source.type.replace(/'/g, "''");
  const logo = source.logo_url ? source.logo_url.replace(/'/g, "''") : '';
  
  if (source.program) {
    const programName = source.program.replace(/'/g, "''");
    sql += `INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, '${name}', '${type}', '${logo}' FROM programs WHERE name = '${programName}';\n`;
  } else {
    sql += `INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, '${name}', '${type}', '${logo}');\n`;
  }
});

sql += '\n-- Insert conversion rates\n';
conversions.forEach((conv) => {
  const fromSource = pointSources.get(conv.from);
  const toSource = pointSources.get(conv.to);
  const rate = conv.rate.replace(/'/g, "''");
  const insight = conv.insight ? conv.insight.replace(/'/g, "''") : '';
  const enabled = conv.enabled ? 1 : 0;
  
  const fromName = fromSource.name.replace(/'/g, "''");
  const toName = toSource.name.replace(/'/g, "''");
  
  sql += `INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = '${fromName}' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = '${toName}' LIMIT 1),
            '${rate}',
            '${insight}',
            ${enabled};\n`;
});

// Write SQL to file
fs.writeFileSync('migrations/migration-data.sql', sql);
console.log('✓ Generated migrations/migration-data.sql\n');

// Step 3: Execute migration
console.log('Step 3: Executing migration on production database...');
console.log('Running: npx wrangler d1 execute points-conversion-db --remote --file=migrations/migration-data.sql\n');

try {
  const output = execSync('npx wrangler d1 execute points-conversion-db --remote --file=migrations/migration-data.sql', {
    encoding: 'utf8'
  });
  console.log(output);
  console.log('\n✅ Migration completed successfully!');
} catch (error) {
  console.error('❌ Migration failed:', error.message);
  process.exit(1);
}

// Step 4: Verify
console.log('\nStep 4: Verifying migration...');
try {
  const countPrograms = execSync('npx wrangler d1 execute points-conversion-db --remote --command="SELECT COUNT(*) as count FROM programs"', {
    encoding: 'utf8'
  });
  const countSources = execSync('npx wrangler d1 execute points-conversion-db --remote --command="SELECT COUNT(*) as count FROM point_sources"', {
    encoding: 'utf8'
  });
  const countRates = execSync('npx wrangler d1 execute points-conversion-db --remote --command="SELECT COUNT(*) as count FROM conversion_rates"', {
    encoding: 'utf8'
  });
  
  console.log('Database counts:');
  console.log(countPrograms);
  console.log(countSources);
  console.log(countRates);
  
  console.log('\n🎉 Migration complete! Your data is now in Cloudflare D1.');
} catch (error) {
  console.error('Could not verify migration:', error.message);
}
