<template>
  <section id="commeAuStade" class="root">
    <div class="inner">
      <div class="headline">
        <h1>Comme Au Stade</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
          nobis natus illum eveniet. Provident vitae distinctio totam obcaecati
          sint dignissimos accusantium, est illum quasi at, harum voluptatibus
          dolores, sapiente excepturi.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CommeAuStade',
}
</script>

<style lang="scss" scoped>
#commeAuStade {
  margin-top: 128px;

  color: white;
}
.root {
  display: block;
}
.headline {
  max-width: 700px;
  margin: 0 auto;

  p {
    font-size: 130%;
    line-height: 125%;
  }
}
</style>
