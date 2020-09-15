<template>
  <div>
    <ul>
      <li v-for="(score, scoreId) in snakeScores" :key="scoreId">
        {{ score.name }} | {{ score.points }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("games", ["snakeScores"]),
  },
};
</script>

<style lang="scss" scoped>
li {
  color: white;
}
</style>
