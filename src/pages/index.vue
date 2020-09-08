<template>
  <section class="root">
    <div class="inner">
      <h1>Playground</h1>
      <p>Choose your game</p>

      <div class="nav">
        <ul class="nav-list">
          <template v-for="(route, routeIndex) in routes">
            <li v-if="route.path !== '/'" :key="routeIndex" class="nav-block">
              <router-link :to="route.path" class="nav-link"
                >{{ route.name }}
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import routes from "@/router/routes";

export default {
  data() {
    return {
      routes: routes,
    };
  },
};
</script>

<style lang="scss" scoped>
.root {
  min-height: 700px;
  height: 100vh;
  display: flex;
  align-items: center;
}

h1 {
  color: #8b37e4;
  text-shadow: 0 0 11px #8b37e4;
}

p {
  color: #afa2a2;
}

.nav {
  width: 100%;
  margin: 64px 0 64px;
}
.nav-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
}

.nav-link {
  position: relative;
  z-index: 1;
  display: block;
  background: linear-gradient(45deg, #bf47fd, #002094);
  padding: 64px 32px;
  border-radius: 8px;
  font-size: 125%;
  font-weight: 500;
  box-shadow: 0 0 0 0px #306682;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 27px 0px #306682;
  }
}
</style>
