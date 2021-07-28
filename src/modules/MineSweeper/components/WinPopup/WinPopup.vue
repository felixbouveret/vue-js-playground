<template>
  <PopupFrame @close-popup="$emit('close')">
    <h2 class="title">Wow you win! 🎉</h2>
    <button @click="$emit('close')">Close and play again</button>
  </PopupFrame>
</template>

<script>
import PopupFrame from '@/components/PopupFrame'

export default {
  name: 'WinPopup',

  components: {
    PopupFrame,
  },
}
</script>

<style lang="scss" scoped>
h2.title {
  color: white;
}

button {
  margin-top: 8px;
  padding: 8px 16px;
  border: 0;
  border-radius: 4px;

  font-size: 16px;
}
</style>
