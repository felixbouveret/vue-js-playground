<template>
  <section class="root">
    <div class="inner">
      <h1>Experiments</h1>
      <ul>
        <template v-for="(experiment, experimentId) in experiments">
          <li v-if="experiment.path !== ''" :key="experimentId">
            <router-link class="nav-link" :to="`experiment/${experiment.path}`">
              {{ experiment.name }}
            </router-link>
          </li>
        </template>
      </ul>
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

  computed: {
    experiments() {
      for (let routeIndex = 0; routeIndex < this.routes.length; routeIndex++) {
        const route = this.routes[routeIndex];
        if (route.name === "Experiments") {
          return route.children;
        }
      }

      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  height: auto;
  display: block;
  padding-top: 64px;
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
