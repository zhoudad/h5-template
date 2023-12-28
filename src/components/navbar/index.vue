<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
})
const router = useRouter()
function handleClick() {
  router.back()
}
</script>

<template>
  <t-navbar :title="props.title" :fixed="false" left-arrow @left-click="handleClick" />
</template>

<style lang="less" scoped>

</style>
