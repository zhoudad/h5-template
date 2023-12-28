<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next'
import { useRoute, useRouter } from 'vue-router'
// import { useStore } from '@/store/index'
import type { TabNameType } from '@/store/index'

const router = useRouter()
// const store = useStore()
const route = useRoute()

const tab = ref('home')
const list = ref([
  { value: 'home', label: '首页', icon: 'home' },
  { value: 'send', label: '发快递', icon: 'send' },
  { value: 'me', label: '我的', icon: 'user' },
])

const change = (name: TabNameType) => {
  router.replace({
    name,
  })
  // store.setTab(name)
}

onMounted(() => {
  tab.value = route.name.toString()
})
</script>

<template>
  <t-tab-bar v-model="tab" :split="false" @change="change">
    <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
      {{ item.label }}
      <template #icon>
        <Icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<style lang="less" scoped></style>

