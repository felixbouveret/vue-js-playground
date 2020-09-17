<template>
  <section class="root">
    <div class="inner">
      <!-- <img svg-inline src="@/assets/SvgAnimations/image.svg" alt="" /> -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <path
          fill="red"
          d="
          M 200 50
          c 50 -40
            100 30
            0 100
          M 200 50
          c -50 -40
            -100 30
            0 100
        "
        />
      </svg>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
svg {
  width: 400px;
}
</style>
