#!/usr/bin/env node

/**
 * Validates that all image references use lowercase extensions
 * Run this before deploying to catch case-sensitivity issues
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif'];

function findUppercaseExtensions(dir) {
  const files = [];
  
  function walk(directory) {
    const items = fs.readdirSync(directory);
    
    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
          walk(fullPath);
        }
      } else {
        const ext = path.extname(item);
        if (IMAGE_EXTENSIONS.includes(ext.toLowerCase()) && ext !== ext.toLowerCase()) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walk(dir);
  return files;
}

function findUppercaseReferencesInJSON() {
  const issues = [];
  const jsonFiles = ['data/*.json'];
  
  jsonFiles.forEach(pattern => {
    const files = glob.sync(pattern);
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        const match = line.match(/"src":\s*"([^"]+\.(JPG|JPEG|PNG|GIF|SVG|WEBP|AVIF))"/i);
        if (match && match[2] === match[2].toUpperCase()) {
          issues.push({
            file,
            line: index + 1,
            path: match[1],
            extension: match[2]
          });
        }
      });
    });
  });
  
  return issues;
}

console.log('🔍 Checking for case-sensitivity issues...\n');

// Check actual files
const uppercaseFiles = findUppercaseExtensions('public');
if (uppercaseFiles.length > 0) {
  console.log('❌ Found files with uppercase extensions:');
  uppercaseFiles.forEach(file => console.log(`   ${file}`));
  console.log('\n💡 Run: node scripts/fix-image-extensions.js\n');
} else {
  console.log('✅ All image files have lowercase extensions\n');
}

// Check JSON references
const uppercaseRefs = findUppercaseReferencesInJSON();
if (uppercaseRefs.length > 0) {
  console.log('❌ Found uppercase extension references in JSON:');
  uppercaseRefs.forEach(issue => {
    console.log(`   ${issue.file}:${issue.line} - ${issue.path}`);
  });
  console.log('\n💡 Update these references to use lowercase extensions\n');
} else {
  console.log('✅ All JSON references use lowercase extensions\n');
}

if (uppercaseFiles.length > 0 || uppercaseRefs.length > 0) {
  console.log('⚠️  Case-sensitivity issues found! Fix before deploying to Cloudflare.\n');
  process.exit(1);
} else {
  console.log('✨ No case-sensitivity issues found! Safe to deploy.\n');
  process.exit(0);
}
