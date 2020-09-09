<template>
  <div class="pageRoot">
    <Navigation />
    <SwitchModule />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import SwitchModule from "@/modules/Switch";

export default {
  components: {
    Navigation,
    SwitchModule,
  },
};
</script>
