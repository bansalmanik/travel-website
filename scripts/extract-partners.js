const fs = require('fs');

// Read JSON data
const jsonData = JSON.parse(fs.readFileSync('data/points-conversion.json', 'utf8'));

// Extract unique partners
const partners = new Set();
const programs = new Set();

jsonData.forEach((entry) => {
  programs.add(entry.program);
  
  entry.rates.forEach((rateGroup) => {
    rateGroup.partners.forEach((partner) => {
      partners.add(partner.to);
    });
  });
});

console.log('PROGRAMS:');
Array.from(programs).sort().forEach(p => console.log(`  "${p}"`));

console.log('\nPARTNERS:');
Array.from(partners).sort().forEach(p => console.log(`  "${p}"`));

console.log(`\nTotal: ${programs.size} programs, ${partners.size} partners`);
