const path = require('path')
const { pascalCase } = require('change-case')

function defaultIndexTemplate(filePaths) {
  const imports = filePaths.map((filePath, i) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const exportName = /^\d/.test(basename)
      ? `Svg${pascalCase(basename)}`
      : `${pascalCase(basename)}`
    console.log(basename)

    return {
      imports: `import { default as ${exportName} } from './${basename}'`,
      nameArray: `${exportName}`,
      hashMap: {
        name: `${basename
          .replace('-uc', '_uc')
          .replace(/\-/g, '+')
          .toLowerCase()}`,
        value: `${exportName}`
      }
    }
  })
  const nameArray = imports.map(({ nameArray }) => nameArray).join(', \n')
  const importString = imports.map(({ imports }) => imports).join('\n')
  const mapString = imports
    .map(({ hashMap }) => `inputMap.set(\`${hashMap.name}\`, ${hashMap.value})`)
    .join('\n')
  return `
  ${importString}
  const inputMap = new Map();
  ${mapString}
  export default inputMap;
  `
}

module.exports = defaultIndexTemplate
