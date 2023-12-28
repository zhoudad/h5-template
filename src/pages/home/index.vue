<template>
  <div class="main-page">
    <t-cell-group bordered>
      <t-cell title="单行标题" arrow hover />
      <t-cell title="单行标题" arrow hover required />
      <t-cell title="单行标题" arrow hover />
      <t-cell title="单行标题" arrow hover required />
      <t-cell title="单行标题" arrow hover />
      <t-cell title="单行标题" arrow hover required />

      <t-cell title="单行标题" arrow hover />
      <t-cell title="单行标题" arrow hover required />
      <t-cell title="单行标题" arrow hover />
      <t-cell title="单行标题" arrow hover required />
      <t-cell title="单行标题" arrow hover />
      <t-cell title="单行标题" arrow hover required />
      <t-cell title="单行标题" arrow hover />
      <t-cell title="单行标题" arrow hover required />
      <t-cell title="单行标题" arrow hover>
        <template #note>
          <t-badge :count="16" />
        </template>
      </t-cell>
      <t-cell title="暗色模式" hover>
        <template #note>
          <t-switch v-model:value="modeValue" @change="onModeChange" />
        </template>
      </t-cell>
      <t-cell title="单行标题" note="辅助信息" arrow hover />
    </t-cell-group>

    <TabBar />
  </div>
</template>

<script setup>
const modeValue = ref(false);
function onModeChange(value) {
  if (value) {
    // 设置暗色模式
    document.documentElement.setAttribute('theme-mode', 'dark');
  } else {
    // 重置为浅色模式
    document.documentElement.removeAttribute('theme-mode');
  }
}
</script>

<style lang="less" scoped></style>
