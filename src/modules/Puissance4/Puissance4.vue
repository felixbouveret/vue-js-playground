<template>
  <section class="root">
    <div class="inner">
      <div class="playersTurns" :class="{ winner: winningPlayer }">
        <template v-if="winningPlayer">
          {{
            winningPlayer === 2 ? 'Second player wins!' : 'First player wins!'
          }}
        </template>
        <template v-else>
          {{
            currentPlayer === 2 ? "Second player's turn" : "First player's turn"
          }}
        </template>
      </div>
      <div class="puissance">
        <div
          v-for="(col, colId) in grid"
          :key="colId"
          class="puissance_col"
          @click="!winningPlayer ? addCoin(col) : null"
        >
          <div
            v-for="(block, blockId) in col.rows"
            :key="blockId"
            class="puissance_block"
            :class="{
              activePlayer1: block.isFirstPlayer === 1,
              activePlayer2: block.isFirstPlayer === 2,
            }"
          />
        </div>
        <transition name="buttonFade" mode="out-in">
          <button
            v-if="gameRunning"
            class="st-button"
            @click="gameButton.function"
          >
            {{ gameButton.text }}
          </button>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      grid: [],
      gridDimentions: {
        columns: 7,
        rows: 6,
      },
      button: {
        restart: {
          text: 'Restart',
          function: () => this.resetGame(),
        },
      },
      player: true,
      winningPlayer: 0,
      gameRunning: false,
      winCondition: 4,
    }
  },

  computed: {
    currentPlayer() {
      return this.player ? 1 : 2
    },

    gameButton() {
      return this.button.restart
    },
  },

  mounted() {
    this.generateGridArray()
  },

  methods: {
    generateGridArray() {
      const rowsLimit = this.gridDimentions.rows
      const columnsLimit = this.gridDimentions.columns

      for (let gridColumn = 0; gridColumn < columnsLimit; gridColumn++) {
        const columnObject = {
          id: gridColumn,
          activeRows: 0,
          rows: [],
        }

        for (let gridRow = 0; gridRow < rowsLimit; gridRow++) {
          columnObject.rows.push({ isFirstPlayer: false })
        }

        this.grid.push(columnObject)
      }
    },

    resetGame() {
      this.winningPlayer = 0
      this.player = true
      this.generateGridArray()
    },

    addCoin(columnObject) {
      const emptyBlockIndex = this.getFirstEmptyBlockIndex(columnObject)

      if (emptyBlockIndex >= 0) {
        this.setCurrentPlayerForEmptyBlock(columnObject, emptyBlockIndex)
        this.incrementActiveRows(columnObject)
        this.switchPlayer()
        this.winCheck(columnObject, emptyBlockIndex)
      }
    },

    incrementActiveRows(columnObject) {
      columnObject.activeRows++
    },

    setGameAsRunning() {
      this.gameRunning = true
    },

    setCurrentPlayerForEmptyBlock(columnObject, emptyBlockIndex) {
      columnObject.rows[emptyBlockIndex].isFirstPlayer = this.currentPlayer
    },

    winCheck(columnObject, emptyBlockIndex) {
      this.checkLinear('column', columnObject)
      this.checkLinear('row', columnObject, emptyBlockIndex)
      // this.checkRows(emptyBlockIndex)
      this.checkDiagonal(false, columnObject, emptyBlockIndex)
      this.checkDiagonal(true, columnObject, emptyBlockIndex)
      // this.checkAntiDiagonal(columnObject, emptyBlockIndex)
    },

    checkLinear(checkType, columnObject, emptyBlockIndex) {
      let sequence = 1
      let loopLimit
      let blockArray

      switch (checkType) {
        case 'column':
          loopLimit = columnObject.rows.length
          blockArray = (id) => columnObject.rows[id]
          break

        case 'row':
          loopLimit = this.grid.length
          blockArray = (id, secondId) =>
            this.grid[id] ? this.grid[id].rows[secondId] : undefined
          break

        default:
          break
      }

      for (let blockIndex = 0; blockIndex < loopLimit; blockIndex++) {
        const currentBlock = blockArray(blockIndex, emptyBlockIndex)
        const nextBlock = blockArray(blockIndex + 1, emptyBlockIndex)

        if (
          nextBlock !== undefined &&
          currentBlock.isFirstPlayer === nextBlock.isFirstPlayer
        ) {
          sequence++

          if (sequence === this.winCondition) {
            this.finishGame(currentBlock.isFirstPlayer)
          }
        } else {
          sequence = 1
        }
      }
    },

    checkDiagonal(isAnti, colObject, row) {
      let sequence = 1

      const startingBlock = this.getStartingDiagonal(isAnti, colObject, row)
      let startingRow = startingBlock.newRow
      const gridLength = this.grid.length

      for (
        let blockIndex = startingBlock.newCol;
        blockIndex < gridLength;
        blockIndex++
      ) {
        const currentBlock = this.grid[blockIndex].rows[startingRow]
        const nextBlock = this.grid[blockIndex + 1]
          ? this.grid[blockIndex + 1].rows[startingRow - 1]
          : undefined

        if (
          nextBlock !== undefined &&
          currentBlock.isFirstPlayer === nextBlock.isFirstPlayer
        ) {
          sequence++

          if (sequence === this.winCondition) {
            this.finishGame(currentBlock.isFirstPlayer)
            break
          }
        } else {
          sequence = 1
        }
        startingRow--
      }
    },

    // checkAntiDiagonal(colObject, row) {
    //   const startingBlock = this.getStartingAntiDiagonal(colObject, row)

    //   let sequence = 0

    //   let o = startingBlock.row

    //   for (let index = startingBlock.col; index >= 0; index--) {
    //     const currentBlock = this.grid[index].rows[o]
    //     const previousBlock =
    //       this.grid[index + 1] && this.grid[index + 1].rows[o + 1]
    //         ? this.grid[index + 1].rows[o + 1]
    //         : false

    //     if (o >= 0) {
    //       if (
    //         previousBlock &&
    //         currentBlock.isFirstPlayer &&
    //         previousBlock.isFirstPlayer === currentBlock.isFirstPlayer
    //       ) {
    //         sequence++
    //         if (sequence >= 3) {
    //           this.finishGame(currentBlock.isFirstPlayer)
    //         }
    //       } else {
    //         sequence = 0
    //       }
    //       o--
    //     }
    //   }
    // },

    switchPlayer() {
      this.player = !this.player
    },

    getFirstEmptyBlockIndex(columnObject) {
      return columnObject.rows.length - columnObject.activeRows - 1
    },

    getStartingDiagonal(isAnti, columnObject, rowId) {
      const activeRows = columnObject.activeRows - 1
      let colId = columnObject.id
      let newRow
      let newCol

      if (isAnti) {
        newRow = rowId - colId
        newCol = colId - columnObject.rows.length - activeRows
        console.log(newRow, newCol)
      } else {
        newRow = rowId + activeRows
        newCol = colId - activeRows
      }

      if (newCol < 0) {
        if (!isAnti) {
          newRow += newCol
        }
        newCol = 0
      }
      if (isAnti && newRow < 0) {
        newRow = 0
      }
      let startingBlockCoor = {
        newRow: newRow,
        newCol: newCol,
      }

      return startingBlockCoor
    },

    getStartingAntiDiagonal(columnObject, row) {
      const collBlocks = columnObject.rows
      let startingBlock = {
        row: row,
        col: columnObject.id,
      }
      if (row < collBlocks.length - 1) {
        for (let index = row; index < collBlocks.length - 1; index++) {
          if (startingBlock.col + 1 <= collBlocks.length) {
            startingBlock.row = index + 1
            startingBlock.col++
          }
        }
      }
      return startingBlock
    },

    finishGame(winner) {
      this.winningPlayer = winner
    },
  },
}
</script>

<style lang="scss" scoped>
.isFirstPlayersTurns {
  font-weight: 500;
  font-size: 125%;

  transition: color 0.3s;

  &.winner {
    color: white;
  }
}

.puissance {
  position: relative;

  display: inline-flex;
  margin: 16px auto 0;
  padding: 8px;
  border-radius: 10px;

  background: linear-gradient(45deg, #bf47fd, #002094);

  &::before,
  &::after {
    position: absolute;
    bottom: 0;

    width: 50px;
    height: 8px;
    border-radius: 0 0 2px 2px;

    background-color: #bf47fd;
    transform: translateY(100%);

    content: '';
  }

  &::before {
    left: 14px;
  }

  &::after {
    right: 14px;

    background-color: #5e34c6;
  }
}

.puissance_block {
  width: 32px;
  height: 32px;
  margin: 5px;
  border-radius: 100%;
  overflow: hidden;

  background-color: #020217;

  @media (min-width: 540px) {
    width: 50px;
    height: 50px;
  }

  &::after {
    position: relative;
    top: -8px;

    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50px;

    background-color: transparent;

    transition-duration: 0.3s;
    transition-property: background-color, top;

    content: '';
  }

  &.activePlayer1::after {
    top: 0;

    background-color: #f9e900;
  }

  &.activePlayer2::after {
    top: 0;

    background-color: #00c2d1;
  }
}

.st-button {
  position: absolute;
  bottom: -64px;
  left: 50%;

  transform: translate(-50%, 100%);
}

.buttonFade-enter-active,
.buttonFade-leave-active {
  transition-timing-function: ease;
  transition-duration: 0.3s;
  transition-property: opacity, bottom;
}

.buttonFade-enter,
.buttonFade-leave-active {
  opacity: 0;
}

.buttonFade-enter {
  bottom: -72px;
}
</style>
