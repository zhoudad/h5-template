<template>
  <div class="app">
    <t-cell-group bordered>
    <t-cell title="单行标题" arrow hover />
    <t-cell title="单行标题" arrow hover required />
    <t-cell title="单行标题" arrow hover>
      <template #note>
        <t-badge :count="16" />
      </template>
    </t-cell>
    <t-cell title="单行标题" hover>
      <template #note>
        <t-switch :default-value="true" />
      </template>
    </t-cell>
    <t-cell title="单行标题" note="辅助信息" arrow hover />
  </t-cell-group>
  <t-button block theme="primary">填充按钮</t-button>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
</style>