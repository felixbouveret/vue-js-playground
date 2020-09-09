<template>
  <div class="pageRoot">
    <Navigation />
    <SimonModule />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import SimonModule from "@/modules/Simon";

export default {
  components: {
    Navigation,
    SimonModule,
  },
};
</script>
