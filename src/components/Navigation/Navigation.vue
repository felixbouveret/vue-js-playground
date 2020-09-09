<template>
  <header>
    <div class="inner">
      <router-link to="/" class="back-button">
        <img
          svg-inline
          src="@/assets/Header/icons/left-arrow.svg"
          class="arrow"
        />
        Retour
      </router-link>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
header .inner {
  height: 64px;
  display: flex;
  align-items: center;
}

.back-button {
  font-size: 115%;
  font-weight: 600;
  color: #47617a;
}

.arrow {
  fill: #47617a;
  height: 12px;
}
</style>
