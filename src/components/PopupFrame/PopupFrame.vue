<template>
  <div class="container">
    <div class="frame">
      <slot />
    </div>
    <div class="backdrop" @click="$emit('close-popup')" />
  </div>
</template>

<script>
export default {
  name: 'PopupFrame',
}
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;

  width: 100%;
  height: 100%;

  background-color: #00000080;
}
.container {
  position: fixed;

  display: flex;

  width: 100%;
}
.frame {
  position: relative;
  z-index: 2;

  margin: auto;
  padding: 32px;
  border-radius: 8px;

  background-color: #171739;
}
</style>
