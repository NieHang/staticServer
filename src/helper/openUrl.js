const {
  exec
} = require('child_process');

module.exports = url => {
  switch (process.platform) {
  // 苹果系统
  case 'darwin':
    exec(`open ${url}`);
    break;
  // win系统
  case 'win32':
    exec(`start ${url}`);
    break;
  }
};