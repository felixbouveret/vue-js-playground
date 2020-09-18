<template>
  <div id="app">
    <Navigation />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <portal-target name="root-app"></portal-target>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: "App",
  components: {
    Navigation,
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || "Playground";
    },
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-enter-active,
.fade-leave-active {
  position: relative;
  top: 0;

  transition-timing-function: ease;
  transition-duration: 0.3s;
  transition-property: opacity, top;
}

.fade-enter,
.fade-leave-active {
  position: relative;

  opacity: 0;
}

.fade-enter {
  top: -8px;
}
</style>
