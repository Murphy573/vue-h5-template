<template>
  <div class="app-page-container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content page-container">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPageContainer'
};
</script>

<style lang="scss" scoped>
.app-page-container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  > .header {
    height: 44px;
    width: 100%;
  }

  > .content {
    height: calc(100% - 44px);
    width: 100%;
    position: relative;
  }
}
</style>
