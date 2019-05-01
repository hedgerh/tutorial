const walk = require('walk')
const slash = require('slash')
const fs = require('./lib/Files')

const walker = walk.walk("../", { filters: [ 'node_modules', '.git', '.vscode', 'base' ] });

let files = {}

walker.on("file", async (root, fileStats, next) => {
  if (fileStats.name.includes('yarn') || fileStats.name.includes('node_modules') || fileStats.name.includes('files.js')) {
    next()
    return
  }

  const file = await fs.read(`${root}/${fileStats.name}`)
  const cleanFilePath = slash(`${root}/${fileStats.name}`).substr(3)

  files[cleanFilePath] = { code: file }
  next()
});

walker.on("errors", function (_, __, next) {
  next();
});

walker.on("end", function () {
  fs.create('./src/files.js', `export default ${JSON.stringify(files, undefined, 2)}`.trim())
    .then(res => console.log('res:', res))
    .catch(e => console.log('error:', e))
});


// background: -webkit-linear-gradient(278deg, rgb(52, 157, 189) 0%, rgb(183, 198, 203) 23%, rgb(178, 169, 172) 37%, rgb(82, 102, 127) 57%, rgb(35, 25, 33) 72%, rgb(77, 46, 52) 86%, rgb(127, 68, 70) 100%);
// background: -o-linear-gradient(278deg, rgb(52, 157, 189) 0%, rgb(183, 198, 203) 23%, rgb(178, 169, 172) 37%, rgb(82, 102, 127) 57%, rgb(35, 25, 33) 72%, rgb(77, 46, 52) 86%, rgb(127, 68, 70) 100%);
// background: -ms-linear-gradient(278deg, rgb(52, 157, 189) 0%, rgb(183, 198, 203) 23%, rgb(178, 169, 172) 37%, rgb(82, 102, 127) 57%, rgb(35, 25, 33) 72%, rgb(77, 46, 52) 86%, rgb(127, 68, 70) 100%);
// background: -moz-linear-gradient(278deg, rgb(52, 157, 189) 0%, rgb(183, 198, 203) 23%, rgb(178, 169, 172) 37%, rgb(82, 102, 127) 57%, rgb(35, 25, 33) 72%, rgb(77, 46, 52) 86%, rgb(127, 68, 70) 100%);
// background: linear-gradient(172deg, rgb(52, 157, 189) 0%, rgb(183, 198, 203) 23%, rgb(178, 169, 172) 37%, rgb(82, 102, 127) 57%, rgb(35, 25, 33) 72%, rgb(77, 46, 52) 86%, rgb(127, 68, 70) 100%);
