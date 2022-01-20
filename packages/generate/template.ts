function createTemplate(options: {
  componentname: string,
  type: {
    typescript: boolean,
    setup: boolean
  }
}) {
  const { componentname, type } = options
  const { typescript, setup } = type
  if (!typescript && !setup) {
  return `<template>
<div class='${componentname}'>
</div>
</template>

<script>
</script>

<style lang='scss'>
</style>
`
  }
  if (typescript && !setup) {
    return `<template>
<div class='${componentname}'>
</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {},
  setup(props, { slots, emit }) {
    return {}
  }
})
</script>

<style lang='scss'>
</style>
`
  }
  if (!typescript && setup) {
    return `<template>
<div class='${componentname}'>
</div>
</template>

<script setup>
</script>

<style lang='scss'>
</style>
`
  }
  if (typescript && setup) {
    return `<template>
<div class='${componentname}'>
</div>
</template>

<script lang='ts' lang='setup'>
</script>

<style lang='scss'>
</style>
`
  }
}

module.exports = {
  createTemplate
}
export {}
