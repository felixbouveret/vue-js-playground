<template>
  <div class="pageRoot" :class="{ gameRunning: isGameStarted }">
    <Navigation />
    <SnakeModule @gameStarted="isGameStarted = $event" />
    <ScoreBoard :score-list="getSnakeSortedScores" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Navigation from "@/components/Navigation";
import SnakeModule from "@/modules/Snake";
import ScoreBoard from "@/components/ScoreBoard";

export default {
  components: {
    Navigation,
    SnakeModule,
    ScoreBoard,
  },

  data() {
    return {
      isGameStarted: false,
    };
  },

  computed: {
    ...mapGetters("games", ["getSnakeSortedScores"]),
  },
};
</script>

<style lang="scss" scoped>
.gameRunning {
  overflow-y: hidden;
  height: 100vh;
}
</style>
