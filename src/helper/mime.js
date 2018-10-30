const path = require('path');

const mimeTypes = {
  'css': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'txt': 'text/plain',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'xml': 'text/xml',
  'tiff': 'image/tiff'
};

module.exports = filePath => {
  let ext = path.extname(filePath).split('.').pop().toLowerCase();

  if (!ext) {
    ext = filePath;
  }

  return mimeTypes[ext] || mimeTypes['txt'];
};