<template>
  <section class="root">
    <div class="inner">
      <div class="infos">
        <span v-if="bombList"> Mines: {{ bombList.length - flagNumber }} </span>
      </div>
      <div class="mine_container">
        <div v-for="i in boardGrid" :key="i.id" class="mine_row">
          <div
            v-for="j in i.columns"
            :key="j.id + i.id"
            class="mine_block"
            :class="[
              { isShowed: j.isShowed },
              { isFlaged: j.isFlaged },
              { hasBomb: j.hasBomb && j.isShowed },
            ]"
            @click="blockClick($event, i, j)"
          >
            <span v-if="showBlockNumber(j)">
              {{ showBlockNumber(j) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <LoosePopup v-if="showLoosePopup" @close="closeLoosePopup()" />
  </section>
</template>

<script>
import { LoosePopup } from './components'

export default {
  components: {
    LoosePopup,
  },

  data() {
    return {
      flagNumber: 0,
      boardSize: 15,
      boardGrid: [],
      bombList: [],
      hasClicked: false,
      showLoosePopup: false,
      showWinPopup: false,
    }
  },

  computed: {
    totalBlocks() {
      return this.boardSize ** 2
    },

    bombNumber() {
      return Math.floor(this.totalBlocks / 5)
    },

    flatGrid() {
      return this.boardGrid.map((e) => e.columns).flat()
    },
  },

  watch: {
    boardSize() {
      this.resetGame()
    },
  },

  mounted() {
    this.createGrid()
  },

  methods: {
    createGrid() {
      for (let i = 0; i < this.boardSize; i++) {
        const row = { id: i, columns: [] }
        for (let j = 0; j < this.boardSize; j++) {
          row.columns.push({
            id: j,
            gId: `${i}-${j}`,
            isShowed: false,
            isFlaged: false,
            hasBomb: false,
            bombNumber: 0,
            isFirstClick: false,
          })
        }
        this.boardGrid.push(row)
      }
    },

    blockClick(event, rowObject, colObject) {
      if (!this.hasClicked) this.firstClick(colObject)
      else this.regularClick(event, rowObject, colObject)
    },

    firstClick(colObject) {
      const colCoordonates = this.getBlockCoordonates(colObject)

      for (let row = -1; row < 2; row++) {
        for (let col = -1; col < 2; col++) {
          const gId = `${colCoordonates.row + row}-${colCoordonates.col + col}`
          const element = this.flatGrid.find((e) => e.gId === gId)

          if (element) element.isFirstClick = true
        }
      }
      this.hasClicked = true
      this.createBombs()
      colObject.isShowed = true
      this.showSafeAreaOnClick(colObject)
    },

    regularClick(event, rowObject, colObject) {
      if (colObject.isShowed) return
      if (event.shiftKey) {
        this.flagClick(rowObject, colObject)
      } else {
        if (colObject.isFlaged) return
        if (colObject.hasBomb) this.gameEnd('loose')
        this.showBlock(colObject)
      }
    },

    flagClick(rowObject, colObject) {
      if (colObject.isFlaged) this.unflagBlock(colObject)
      else this.flagBlock(colObject)
    },

    flagBlock(colObject) {
      this.flagNumber++
      colObject.isFlaged = true
    },

    unflagBlock(colObject) {
      this.flagNumber--
      colObject.isFlaged = false
    },

    showBlock(colObject) {
      colObject.isShowed = true
      this.showSafeAreaOnClick(colObject)
    },

    setBombNumber() {
      this.flatGrid.forEach((block) => {
        this.searchBlockForBombs(block)
      })
    },

    getBlockCoordonates: (blockObject) => ({
      row: parseInt(blockObject.gId.split('-')[0]),
      col: parseInt(blockObject.gId.split('-')[1]),
    }),

    searchBlockForBombs(colObject) {
      if (colObject.hasBomb) return

      const colCoordonates = this.getBlockCoordonates(colObject)
      let bombNumber = 0

      for (let row = -1; row < 2; row++) {
        for (let col = -1; col < 2; col++) {
          const gId = `${colCoordonates.row + row}-${colCoordonates.col + col}`
          const element = this.flatGrid.find((e) => e.gId === gId)

          if (element?.hasBomb) bombNumber++
        }
      }

      colObject.bombNumber = bombNumber
    },

    showSafeAreaOnClick(colObject) {
      if (colObject.bombNumber) return

      const coordonates = this.getBlockCoordonates(colObject)

      for (let row = 0; row < this.boardSize; row++) {
        const test = `${coordonates.row + row}-${coordonates.col}`
        const testElement = this.flatGrid.find((e) => e.gId === test)
        if (
          testElement === undefined ||
          testElement.bombNumber > 0 ||
          testElement.hasBomb
        )
          break

        for (let col = 0; col < this.boardSize; col++) {
          const gId = `${coordonates.row + row}-${coordonates.col + col}`
          const element = this.flatGrid.find((e) => e.gId === gId)

          if (element === undefined) break
          if (element.bombNumber > 0 || element.hasBomb) break

          this.clearBlock(element)
        }
      }
    },

    clearBlock(colObject) {
      const colCoordonates = this.getBlockCoordonates(colObject)

      for (let row = -1; row < 2; row++) {
        for (let col = -1; col < 2; col++) {
          const gId = `${colCoordonates.row + row}-${colCoordonates.col + col}`
          const element = this.flatGrid.find((e) => e.gId === gId)

          if (element) element.isShowed = true
        }
      }
    },

    createBombs() {
      for (let bomb = 0; bomb < this.bombNumber; bomb++) this.setRandomBomb()

      this.setBombNumber()
    },

    setRandomBomb() {
      const randomBlock = this.flatGrid[this.getRandomBombId()]

      if (randomBlock.isFirstClick) return
      if (randomBlock.hasBomb) {
        this.setRandomBomb()
      } else {
        randomBlock.hasBomb = true
        this.bombList.push(randomBlock)
      }
    },

    getRandomBombId() {
      return Math.floor(Math.random() * this.totalBlocks)
    },

    showBlockNumber(colObject) {
      if (colObject.isShowed && colObject.bombNumber)
        return colObject.bombNumber
      return ''
    },

    gameEnd(status) {
      switch (status) {
        case 'loose':
          this.looseGame()
          break

        case 'win':
          this.showWinPopup = true
          break

        default:
          break
      }
    },

    looseGame() {
      this.showLoosePopup = true
      this.flatGrid.forEach((element) => (element.isShowed = true))
    },

    resetGame() {
      this.hasClicked = false
      this.flagNumber = 0
      this.boardGrid = []
      this.bombList = []
      this.createGrid()
    },

    closeLoosePopup() {
      this.showLoosePopup = false
      this.resetGame()
    },
  },
}
</script>

<style lang="scss" scoped>
.mine_row {
  display: flex;
}

.mine_container {
  display: grid;
  box-sizing: initial;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;

  background: linear-gradient(45deg, #bf47fd, #002094);
}

.mine_block {
  position: relative;

  width: 100%;
  height: 100%;
  border: solid 1px #00000050;

  color: black;

  cursor: default;

  user-select: none;

  span {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  &:hover {
    background-color: #00000050;
  }

  &.isShowed {
    background-color: #ffffff50;
  }

  &.isFlaged {
    background-color: #ff000050;
  }

  &.hasBomb {
    background-color: #00000050;
  }
}
</style>
