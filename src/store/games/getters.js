export default {
  getSnakeSortedScores(state) {
    let scores = [...state.snakeScores]

    return scores.sort((a, b) => b.points - a.points)
  },
}
