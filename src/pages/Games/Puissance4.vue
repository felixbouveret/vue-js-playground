<template>
  <div class="pageRoot">
    <Navigation />
    <Puissance4Module />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Puissance4Module from "@/modules/Puissance4";

export default {
  components: {
    Navigation,
    Puissance4Module,
  },
};
</script>
