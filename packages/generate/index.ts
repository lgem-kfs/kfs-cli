const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const { yellow, green } = require('kolorist')
const { TRUE, FALSE } = require('../config/icon')
const { createTemplate } = require('./template')

function validate(value: string, name: string) {
  if (value.trim() === '') {
    return `${name} 是必填项!`
  }
  return true
}

async function onGenerate (cmd: {
  [k: string]: any
}) {
  let { generate } = cmd
  if (!generate) {
    console.log(yellow(`${FALSE} generate 不能为空`))
    const result = await inquirer.prompt([
      {
        name: 'generate',
        type: 'input',
        message: '（必填）请输入生成组件的存放文件夹:',
        validate: (value: string) => validate(value, 'generate')
      }
    ])
    generate = result['generate']
  }

  const info = await inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: '（必填）请输入组件名字，将用作目录及文件名：',
      validate: (value: string) => validate(value, 'name')
    },
    {
      name: 'setup',
      type: 'confirm',
      message: 'vue模板是否是setup'
    },
    {
      name: 'typescript',
      type: 'confirm',
      message: 'vue模板是否是typescript'
    }
  ])
  const message = {
    contents: generate,
    components: info['name'],
    type: {
      typescript: info['typescript'],
      setup: info['setup']
    }
  }
  createComponent(message as any)
}

type Message = {
  contents: string,
  components: string
  type: {
    typescript: string,
    setupt: string
  }
}

async function createComponent(message: Message) {
  const { contents, components, type } = message
  components.split(' ').forEach(async component => {
    const filePath = path.join(__dirname, `${contents}/${component}`)
    const dir: string[] =  fs.readdirSync(path.join(__dirname, '/'))
    if (!dir.includes(contents)) {
      await fs.mkdirSync(path.join(__dirname, `${contents}`))
    }
    const componentDir: string[] = await fs.readdirSync(path.join(__dirname, `${contents}`))
    if (!componentDir.includes(component)) {
      await fs.mkdirSync(filePath)
    }
  
    const componentOptions = {
      componentname: component,
      type: {
        typescript: type['typescript'],
        setup: type['setupt']
      }
    }
    const data: string = createTemplate(componentOptions)
    await fs.writeFileSync(`${filePath}/${component}.vue`, data)
    console.log(green(`${TRUE} 创建模板成功`))
  })
}

module.exports = {
  onGenerate
}
export {}
