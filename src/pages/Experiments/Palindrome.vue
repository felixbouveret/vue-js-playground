<template>
  <div>
    <Navigation />
    <PalindromeModule />
  </div>
</template>
<script>
import Navigation from "@/components/Navigation";
import PalindromeModule from "@/modules/Palindrome";

export default {
  components: {
    Navigation,
    PalindromeModule,
  },
};
</script>
