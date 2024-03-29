<template>
  <section class="root">
    <div class="inner">
      <span>{{ points }}</span>
      <div class="snake_container">
        <div v-for="i in 15" :key="i" class="snake_row">
          <div v-for="o in 15" :key="o" class="snake_block" />
        </div>
      </div>
      <button class="st-button" @click="initGame">start</button>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      points: 0,
      bodyLength: 0,
      position: {
        x: 7,
        y: 7,
      },
      direction: {
        x: -1,
        y: 0,
      },
      intervalFunction: null,
      isFirstGame: true,
      isGameRunning: false,
    }
  },

  computed: {
    ...mapState('app', ['username']),
    snakeBlock() {
      return document.querySelectorAll('.snake_block')
    },

    snakeGrid() {
      let snakeRow = document.querySelectorAll('.snake_row')
      let snakeGrid = []
      for (let i = 0; i < snakeRow.length; i++) {
        snakeGrid.push(snakeRow[i].querySelectorAll('.snake_block'))
      }
      return snakeGrid
    },
  },

  methods: {
    ...mapMutations('games', ['ADD_SNAKE_SCORE']),
    initGame() {
      if (!this.isGameRunning) {
        if (this.isFirstGame) {
          document.addEventListener('keydown', () => {
            this.direction.x = this.directionKeyX()
            this.direction.y = this.directionKeyY()
          })
          this.isFirstGame = false
        }

        this.points = 0

        for (let i = 0; i < this.snakeBlock.length; i++) {
          this.snakeBlock[i].active = false
        }

        this.snakeGrid[this.position.x][this.position.y].head = true

        this.randomPointLocalisation()

        this.intervalFunction = window.setInterval(() => {
          this.position.x += this.direction.x
          this.position.y += this.direction.y

          this.isOutOfPlayground(this.position.x, this.position.y)

          if (this.snakeGrid[this.position.x][this.position.y].point) {
            this.points++
          }

          if (this.snakeGrid[this.position.x][this.position.y].active) {
            this.resetGame()
          } else {
            this.gameRules(this.position.x, this.position.y)
          }
        }, 100)
        this.isGameRunning = true
        this.$emit('gameStarted', true)
      }
    },

    randomPointLocalisation() {
      let randomSnakeBlock = Math.floor(Math.random() * this.snakeBlock.length)
      if (this.snakeBlock[randomSnakeBlock].active === true) {
        this.randomPointLocalisation()
      } else {
        this.snakeBlock[randomSnakeBlock].point = true
        this.checkSnakeBlockColor()
      }
    },

    directionKeyY() {
      if (event.keyCode === 37) {
        if (this.direction.y !== 1) {
          this.direction.y = -1
        }
      } else if (event.keyCode === 39) {
        if (this.direction.y !== -1) {
          this.direction.y = 1
        }
      } else if (event.keyCode === 38 || event.keyCode === 40) {
        this.direction.y = 0
      }
      return this.direction.y
    },

    directionKeyX() {
      if (event.keyCode === 38) {
        if (this.direction.x !== 1) {
          this.direction.x = -1
        }
      } else if (event.keyCode === 40) {
        if (this.direction.x !== -1) {
          this.direction.x = 1
        }
      } else if (event.keyCode === 37 || event.keyCode === 39) {
        this.direction.x = 0
      }
      return this.direction.x
    },

    checkSnakeBlockColor() {
      for (let i = 0; i < this.snakeBlock.length; i++) {
        if (
          this.snakeBlock[i].active === false &&
          this.snakeBlock[i].point != true
        ) {
          this.snakeBlock[i].style.backgroundColor = ''
        } else if (
          (this.snakeBlock[i].active === true &&
            this.snakeBlock[i].point != true) ||
          (this.snakeBlock[i].head === true && this.snakeBlock[i].point != true)
        ) {
          if (this.snakeBlock[i].head === true) {
            this.snakeBlock[i].style.backgroundColor = '#43abdc'
          } else {
            this.snakeBlock[i].style.backgroundColor = '#43abdc'
          }
        } else {
          this.snakeBlock[i].style.backgroundColor = '#ff673a'
        }
      }
    },

    gameRules(positionX, positionY) {
      for (let i = 0; i < this.snakeBlock.length; i++) {
        this.snakeBlock[i].head = false
      }

      this.snakeGrid[positionX][positionY].head = true
      this.snakeGrid[positionX][positionY].active = true

      this.checkSnakeBlockColor()

      this.snakeGrid[positionX][positionY].body = this.points

      for (let i = 0; i < this.snakeBlock.length; i++) {
        if (this.snakeBlock[i].body == 0) {
          this.snakeBlock[i].active = false
        } else {
          this.snakeBlock[i].body--
        }
      }

      if (
        this.snakeGrid[positionX][positionY].active === true &&
        this.snakeGrid[positionX][positionY].point === true
      ) {
        this.snakeGrid[positionX][positionY].point = false
        this.checkSnakeBlockColor()
        this.randomPointLocalisation()
      }
    },

    isOutOfPlayground(positionX, positionY) {
      if (positionX < 0 || positionX > 14 || positionY < 0 || positionY > 14) {
        this.resetGame()
      }
    },

    resetGame() {
      this.ADD_SNAKE_SCORE({ points: this.points, name: this.username })
      clearInterval(this.intervalFunction)
      this.isGameRunning = false
      this.$emit('gameStarted', false)

      this.position.x = 7
      this.position.y = 7

      this.direction.x = -1
      this.direction.y = 0

      for (let i = 0; i < this.snakeBlock.length; i++) {
        this.snakeBlock[i].active = false
        this.snakeBlock[i].point = false
      }

      this.checkSnakeBlockColor()
    },
  },
}
</script>

<style lang="scss" scoped>
.snake_row {
  display: flex;
}

.snake_container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-sizing: initial;
  width: calc(15 * 20px);
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;

  background: linear-gradient(45deg, #bf47fd, #002094);

  @media (min-width: 540px) {
    width: calc(15 * 32px);
  }
}

.snake_block {
  width: 20px;
  height: 20px;

  @media (min-width: 540px) {
    width: 32px;
    height: 32px;
  }
}

.snake_row:nth-child(2n) .snake_block:nth-child(2n),
.snake_row:nth-child(2n + 1) .snake_block:nth-child(2n + 1) {
  background-color: #00000050;
}
</style>
