<template>
  <div class="scoreBoard">
    <div class="header">
      <span class="name">Name</span>
      <span class="score">Score</span>
    </div>
    <ul>
      <li v-for="(score, scoreId) in scoreList" :key="scoreId">
        <span class="name">{{ score.name }}</span>
        <span class="score">{{ score.points }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    scoreList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  color: white;
}
ul {
  border: white 2px solid;
  max-width: 300px;
  margin: 0 auto;
  max-height: 300px;
  overflow-y: scroll;
}

li {
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 8px;
}
</style>
