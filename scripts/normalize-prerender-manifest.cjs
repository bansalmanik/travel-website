const fs = require('fs');
const path = require('path');

const manifestPath = path.join(process.cwd(), '.next', 'prerender-manifest.json');

if (!fs.existsSync(manifestPath)) {
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const stripKey = (value) => {
  if (Array.isArray(value)) {
    return value.map(stripKey);
  }

  if (value && typeof value === 'object') {
    if ('experimentalBypassFor' in value) {
      delete value.experimentalBypassFor;
    }

    for (const key of Object.keys(value)) {
      value[key] = stripKey(value[key]);
    }
  }

  return value;
};

stripKey(manifest);

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
