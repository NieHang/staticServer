const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const mime = require('./mime');
const compress = require('./compress');
const range = require('./range');
//* 引入设置缓存函数
// const isFresh = require('./cache');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function (req, res, filePath, config) {
  try {
    const status = await stat(filePath);
    if (status.isFile()) {
      const contentType = mime(filePath);

      res.setHeader('Content-Type', contentType);

      //! 设置缓存，但是访问文件会404，未解决
      // if (isFresh(status, req, res)) {
      //   console.info(123);
      //   res.statusCode = 304;
      //   res.end();
      //   return;
      // }

      let rs;
      const { code, start, end } = range(status.size, req, res);
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, { start, end });
      }

      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (status.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html;charset:utf-8');
      const dir = path.relative(config.root, filePath);
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => ({
          file,
          icon: mime(file)
        }))
      };
      res.end(template(data));
    }
  } catch (error) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');

    res.end(`${filePath}不存在`);
  }
};