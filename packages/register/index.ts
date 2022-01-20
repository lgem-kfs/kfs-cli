const fs = require('fs-extra')
const path = require('path')
const { green } = require('kolorist')
const { TRUE } = require('../config/icon')

function createMapTemplate(components: any[]) {
  return `const components = ${JSON.stringify(components)}\n`
}

function createVueTempalte() {
  return `import { App, Component } from 'vue'\n`
}

function createTemplate() {
  return `function install(app: App) {
  components.forEach(component => {
    app.use(component, eval(component))
  })
}

export default install
`
}

async function onRegister(cmd: {
  [k: string]: any
}) {
  const { register } = cmd
  const dirPath = path.join(__dirname, register)
  const dirs: string[] = await fs.readdirSync(dirPath)
  await fs.appendFileSync(path.join(dirPath, 'index.ts'), createVueTempalte())
  
  const components = dirs.filter(dir => dir !== 'index.ts')
  components.forEach(async component => {
    await fs.appendFileSync(path.join(dirPath, 'index.ts'), `import ${component} from './${component}/${component}.vue'\n`)
  })

  await fs.appendFileSync(path.join(dirPath, 'index.ts'), createMapTemplate(components))
  await fs.appendFileSync(path.join(dirPath, 'index.ts'), createTemplate())

  console.log(green(`${TRUE} 注册成功`))
}

module.exports = {
  onRegister
}
export {}
