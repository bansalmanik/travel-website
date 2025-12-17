import { execSync } from 'child_process';
import fs from 'fs';

console.log('📊 Generating from D1...\n');

const query = 'SELECT p.name as program_name, ps_from.name as from_name, ps_to.name as to_name, cr.rate, cr.insight FROM conversion_rates cr JOIN point_sources ps_from ON cr.from_source_id = ps_from.id JOIN point_sources ps_to ON cr.to_source_id = ps_to.id LEFT JOIN programs p ON ps_from.program_id = p.id WHERE cr.enabled = 1 AND ps_from.enabled = 1 AND ps_to.enabled = 1';

try {
  console.log('🔍 Querying D1...');
  const output = execSync(
    `npx wrangler d1 execute points-conversion-db --remote --json --command="${query}"`,
    { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 }
  );

  const jsonMatch = output.match(/\[[\s\S]*\]/);
  const result = JSON.parse(jsonMatch[0]);
  const rows = result[0].results;
  
  console.log(`✓ Got ${rows.length} records from D1\n`);

  const conversionsMap = new Map();

  rows.forEach(row => {
    const key = `${row.program_name || 'Other'}|${row.from_name}`;
    
    if (!conversionsMap.has(key)) {
      conversionsMap.set(key, {
        program: row.program_name || 'Other',
        from: row.from_name,
        rates: []
      });
    }

    const conversion = conversionsMap.get(key);
    let rateGroup = conversion.rates.find(r => r.rate === row.rate);
    
    if (!rateGroup) {
      rateGroup = { rate: row.rate, partners: [] };
      conversion.rates.push(rateGroup);
    }

    rateGroup.partners.push({
      to: row.to_name,
      insight: row.insight || '',
      enabled: true
    });
  });

  const conversions = Array.from(conversionsMap.values());
  fs.writeFileSync('data/points-conversion.json', JSON.stringify(conversions, null, 2));

  console.log(`✅ Generated fresh data! ${conversions.length} sources\n`);

} catch (error) {
  console.warn('⚠️  Could not fetch from D1:', error.message);
  console.log('📦 Using existing data/points-conversion.json');
  
  // Check if existing file exists
  if (!fs.existsSync('data/points-conversion.json')) {
    console.error('❌ No existing data file found!');
    console.error('💡 Run this script locally first to generate initial data.');
    process.exit(1);
  }
  
  console.log('✓ Build will continue with existing data\n');
}
