<template>
  <section class="root">
    <div class="inner">
      <h1>Playground</h1>

      <div class="nav">
        <template v-for="(route, routeIndex) in routes">
          <h2 v-if="route.path !== '/'" :key="routeIndex + '-title'">
            {{ route.name }}
          </h2>
          <ul v-if="route.path !== '/'" :key="routeIndex" class="nav-list">
            <template v-for="(child, childIndex) in route.children">
              <li v-if="child.path !== ''" :key="childIndex" class="nav-block">
                <router-link
                  :to="route.path + '/' + child.path"
                  class="nav-link"
                  >{{ child.name }}
                </router-link>
              </li>
            </template>
          </ul>
        </template>
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
  margin-top: 64px;
  @media (min-width: 720px) {
    display: flex;
    align-items: center;
    margin-top: 0;
  }
}

h1 {
  color: #8b37e4;
  text-shadow: 0 0 11px #8b37e4;
}

h2 {
  margin-bottom: 32px;
}

.nav {
  width: 100%;
  max-width: 800px;
  margin: 64px auto 64px;
}
.nav-list {
  display: grid;
  grid-gap: 16px;
  margin-bottom: 48px;
  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }
  @media (min-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;
  }
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
