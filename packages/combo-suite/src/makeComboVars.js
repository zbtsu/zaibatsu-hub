//requiring path and fs modules
const path = require('path')
const fs = require('fs')

//joining path of directory

const finalFile = path.join(__dirname, './comboVars.json')
console.log(finalFile)

fs.readdir(path.resolve(__dirname, './images/icons/'), function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }
  //listing all files using forEach
  const x = JSON.stringify(
    files.map((e) => e.replace('.svg', '')),
    null,
    '\t'
  )

  fs.writeFile(finalFile, x, function (err) {
    if (err) return console.log(err)
    console.log('File Written!')
  })
})
