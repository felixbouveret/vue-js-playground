<template>
  <section class="root">
    <div class="inner">
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
  </section>
</template>

<script>
export default {
  data() {
    return {
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
      return Math.floor(this.totalBlocks / 8)
    },

    bombDropRate() {
      return this.totalBlocks / this.bombNumber
    },

    flatGrid() {
      return this.boardGrid.map((e) => e.columns).flat()
    },
  },

  watch: {
    boardSize: function() {
      this.boardGrid = []
      this.createGrid()
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
      if (!this.hasClicked) {
        this.firstClick(colObject)
      } else {
        this.regularClick(event, rowObject, colObject)
      }
    },

    firstClick(colObject) {
      colObject.isFirstClick = true
      this.hasClicked = true
      this.createBombs()
      colObject.isShowed = true
    },

    regularClick(event, rowObject, colObject) {
      if (colObject.isShowed) return
      if (event.shiftKey) {
        this.flagClick(rowObject, colObject)
      } else {
        if (colObject.isFlaged) return
        if (colObject.hasBomb) this.showBlock(rowObject, colObject)
      }
    },

    flagClick(rowObject, colObject) {
      if (colObject.isFlaged) {
        this.unflagBlock(rowObject, colObject)
      } else {
        this.flagBlock(rowObject, colObject)
      }
    },

    flagBlock(rowObject, colObject) {
      colObject.isFlaged = true
    },

    unflagBlock(rowObject, colObject) {
      colObject.isFlaged = false
    },

    showBlock(rowObject, colObject) {
      colObject.isShowed = true
      console.log('show', colObject.isShowed)
    },

    setBombNumber() {
      this.flatGrid.forEach((block) => {
        this.searchBlockForBombs(block)
      })
    },

    searchBlockForBombs(colObject) {
      if (colObject.hasBomb) return
      const colCoordonates = {
        row: parseInt(colObject.gId.split('-')[0]),
        col: parseInt(colObject.gId.split('-')[1]),
      }
      let bombNumber = 0
      for (let row = -1; row < 2; row++) {
        for (let col = -1; col < 2; col++) {
          const gId = `${colCoordonates.row + row}-${colCoordonates.col + col}`
          const element = this.flatGrid.find((e) => e.gId === gId)

          if (element?.hasBomb) {
            bombNumber++
          }
        }
      }

      colObject.bombNumber = bombNumber
    },

    createBombs() {
      for (let bomb = 0; bomb < this.bombNumber; bomb++) {
        this.setRandomBomb()
      }
      this.setBombNumber()
    },

    setRandomBomb() {
      if (
        this.flatGrid[this.getRandomBombId()].hasBomb &&
        this.flatGrid[this.getRandomBombId()].isFirstClick
      ) {
        this.setRandomBomb()
      } else {
        const randomBlock = this.flatGrid[this.getRandomBombId()]
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
          this.showLoosePopup = true
          break

        case 'win':
          this.showWinPopup = true
          break

        default:
          break
      }
    },

    loose() {},
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
