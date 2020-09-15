export default {
  ADD_SNAKE_SCORE(state, scores) {
    if (scores.name && scores.points) {
      state.snakeScores.push(scores);
    }
  },
};
