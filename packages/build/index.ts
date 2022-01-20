const fs = require('fs-extra')
import Vue from '@vitejs/plugin-vue'
import { defineConfig, build, InlineConfig } from 'vite'
const path = require('path')
const { green } = require('kolorist')


const baseConfig = defineConfig({
  optimizeDeps: {
    exclude: ['esbuild']
  },
  plugins: [Vue()]
})

const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

function buildAll() {
  build(defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entry, 'index.ts'),
        name: 'index',
        fileName: 'index',
        formats: ['umd']
      },
      outDir: output
    }
  }) as InlineConfig)
}

function buildSingle(name: string) {
  build(defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entry, 'index.ts'),
        name: 'index',
        fileName: 'index',
        formats: ['umd']
      },
      outDir: path.resolve(output, name)
    }
  }) as InlineConfig)
}

function createPackageJson(name: string) {
  const config = `{
    "name": "${name}",
    "version": "1.0.0",
    "main": "index.umd.js",
    "module": "index.es.js",
    "style": "style.css"
  }`
  fs.outputFile(
    path.resolve(output, `${name}/packages.json`),
    config,
    'utf-8'
  )
}

function createTypes(name: string) {
  const config = `declare module 'kfs-ui/lib/${name}.umd.js'`
  fs.outputFile(
    path.resolve(output, `${name}/index.d.ts`),
    config,
    'utf-8'
  )
}

const entry = path.join(__dirname, 'packages')
const output = path.join(__dirname, 'lib')

async function onBuild(cmd: {
  [k: string]: any
}) {
  await buildAll()
  const components = fs.readdirSync(entry).filter((name: string) => {
    const dir = path.resolve(entry, name)
    const isDir = fs.lstatSync(dir).isDirectory()
    return isDir && (fs.readdirSync(dir) as string[]).includes('index.ts')
  })

  for(const name of components) {
    await buildSingle(name)
    createPackageJson(name)
    createTypes(name)
  }
  console.log(green('打包组件成功'))
}

module.exports = {
  onBuild
}
export {}
