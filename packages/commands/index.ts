const { Command } = require('commander')
const { onGenerate } = require('../generate')
const { onRegister } = require('../register')
const { onBuild } = require('../build')

type Opts = {
  [k: string]: any
}
function funcType(cmd: Opts) {
  const key = Object.keys(cmd)[0]
  switch(key) {
    case 'generate':
      onGenerate(cmd)
      break
    case 'register':
      onRegister(cmd)
      break
    case 'build':
      onBuild(cmd)
      break
    default:
      new Error('请查看配置是否正确!!!')
      break
  }
}

const program = new Command()
program.command('start')
.option('-g --generate <type>', "生成组件的文件夹")
.option('-r --register <type>', "指定要自动注册组件的文件夹")
.option('-b --build <type>', "指定要打包的组件库文件夹")
.action((cmd: Opts) => funcType(cmd))
program.parse()

module.exports = {  
  program
}
export {}
