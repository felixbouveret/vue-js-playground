<template>
  <div id="app">
    <Navigation />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  position: relative;
  top: 0;
  transition-duration: 0.3s;
  transition-property: opacity, top;
  transition-timing-function: ease;
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
