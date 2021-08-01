<template>
  <div class="pageRoot" :class="{ gameRunning: isGameStarted }">
    <SnakeModule @gameStarted="isGameStarted = $event" />
    <ScoreBoard :score-list="getSnakeSortedScores" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SnakeModule from '@/modules/Snake'
import ScoreBoard from '@/components/ScoreBoard'

export default {
  components: {
    SnakeModule,
    ScoreBoard,
  },

  data() {
    return {
      isGameStarted: false,
    }
  },

  computed: {
    ...mapGetters('games', ['getSnakeSortedScores']),
  },
}
</script>

<style lang="scss" scoped>
.gameRunning {
  height: 100vh;
  overflow-y: hidden;
}
</style>
