<template>
  <transition name="fade" mode="out-in">
    <div v-if="isDisplayed" class="infos">
      <p v-for="(info, infoId) in infosList" :key="infoId">
        {{ info }}
      </p>
      <button
        v-for="({ emit, label, icon }, actionId) in actionsList"
        :key="'action-' + actionId"
        @click="$emit(emit, $event)"
      >
        <component :is="icon" v-if="icon" class="icon" />
        <p v-if="label">{{ label }}</p>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'GameMenu',

  props: {
    isDisplayed: {
      type: Boolean,
      default: false,
    },
    infosList: {
      type: Array,
      default: () => {},
    },
    actionsList: {
      type: Array,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.infos {
  display: flex;
  gap: 12px;
  justify-content: center;

  color: white;
  font-weight: 600;
  font-size: 16px;

  p,
  button {
    display: inline-block;
    padding: 16px 24px;
    border-radius: 8px;

    background-color: rgba($color: white, $alpha: 0.1);
  }

  button {
    padding: 8px;
    border: 0;

    cursor: pointer;

    transition: background-color 0.3s;

    svg {
      display: block;

      path {
        fill: rgba($color: white, $alpha: 0.8);
      }
    }

    &:hover {
      background-color: rgba($color: white, $alpha: 0.2);
    }
  }
}
</style>
