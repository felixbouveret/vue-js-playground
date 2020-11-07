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
          @click="!winningPlayer ? addCoin(col, colId) : null"
        >
          <div
            v-for="(block, blockId) in col.blocks"
            :key="blockId"
            class="puissance_block"
            :class="{
              activePlayer1: block.player === 1,
              activePlayer2: block.player === 2,
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
      grid: [
        {
          activeBlocks: 0,
          blocks: [
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
          ],
        },
        {
          activeBlocks: 0,
          blocks: [
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
          ],
        },
        {
          activeBlocks: 0,
          blocks: [
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
          ],
        },
        {
          activeBlocks: 0,
          blocks: [
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
          ],
        },
        {
          activeBlocks: 0,
          blocks: [
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
          ],
        },
        {
          activeBlocks: 0,
          blocks: [
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
          ],
        },
        {
          activeBlocks: 0,
          blocks: [
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
            { player: false },
          ],
        },
      ],
      button: {
        restart: {
          text: 'Restart',
          function: () => this.resetGame(),
        },
      },
      player: true,
      winningPlayer: 0,
      gameRunning: false,
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

  methods: {
    resetGame() {
      this.winningPlayer = 0
      this.player = true
      for (let col = 0; col < this.grid.length; col++) {
        const columnObject = this.grid[col]
        columnObject.activeBlocks = 0
        for (let blockId = 0; blockId < columnObject.blocks.length; blockId++) {
          const block = columnObject.blocks[blockId]
          block.player = false
        }
      }
    },
    addCoin(column, colId) {
      if (!this.gameRunning) {
        this.gameRunning = true
      }

      let blockId = this.reversedBlockId(column)
      if (blockId >= 0) {
        column.blocks[blockId].player = this.currentPlayer
        column.activeBlocks++
        this.switchPlayer()
        this.checkColumns(column)
        this.checkRows(blockId)
        this.checkDiagonal(column, colId, blockId)
        this.checkAntiDiagonal(column, colId, blockId)
      }
    },

    checkColumns(column) {
      let sequence = 0
      for (
        let blockIndex = column.blocks.length - 1;
        blockIndex >= 0;
        blockIndex--
      ) {
        const hasPreviousBlock = column.blocks[blockIndex - 1] ? true : false
        const previousblock = hasPreviousBlock
          ? column.blocks[blockIndex - 1]
          : false
        const block = column.blocks[blockIndex]

        if (block.player && block.player === previousblock.player) {
          sequence++

          if (sequence >= 3) {
            this.finishGame(block.player)
          }
        } else {
          sequence = 0
        }
      }
    },

    checkRows(row) {
      let sequence = 0
      for (let blockIndex = 0; blockIndex < this.grid.length; blockIndex++) {
        const hasPreviousColumn = this.grid[blockIndex - 1] ? true : false
        const previousColumn = hasPreviousColumn
          ? this.grid[blockIndex - 1].blocks
          : false
        const column = this.grid[blockIndex].blocks

        if (
          previousColumn[row] &&
          column[row].player &&
          column[row].player === previousColumn[row].player
        ) {
          sequence++
          if (sequence >= 3) {
            this.finishGame(column[row].player)
          }
        } else {
          sequence = 0
        }
      }
    },

    checkDiagonal(colObject, column, row) {
      const startingBlock = this.getStartingDiagonal(colObject, column, row)
      let sequence = 0

      let o = startingBlock.row

      for (let index = startingBlock.col; index < this.grid.length; index++) {
        const currentBlock = this.grid[index].blocks[o]
        const previousBlock =
          this.grid[index - 1] && this.grid[index - 1].blocks[o + 1]
            ? this.grid[index - 1].blocks[o + 1]
            : false

        if (o >= 0) {
          if (
            previousBlock &&
            currentBlock.player &&
            previousBlock.player === currentBlock.player
          ) {
            sequence++
            if (sequence >= 3) {
              this.finishGame(currentBlock.player)
            }
          } else {
            sequence = 0
          }
          o--
        }
      }
    },

    checkAntiDiagonal(colObject, column, row) {
      const startingBlock = this.getStartingAntiDiagonal(colObject, column, row)

      let sequence = 0

      let o = startingBlock.row

      for (let index = startingBlock.col; index >= 0; index--) {
        const currentBlock = this.grid[index].blocks[o]
        const previousBlock =
          this.grid[index + 1] && this.grid[index + 1].blocks[o + 1]
            ? this.grid[index + 1].blocks[o + 1]
            : false

        if (o >= 0) {
          if (
            previousBlock &&
            currentBlock.player &&
            previousBlock.player === currentBlock.player
          ) {
            sequence++
            if (sequence >= 3) {
              this.finishGame(currentBlock.player)
            }
          } else {
            sequence = 0
          }
          o--
        }
      }
    },

    switchPlayer() {
      this.player = !this.player
    },

    reversedBlockId(column) {
      return column.blocks.length - column.activeBlocks - 1
    },

    getStartingDiagonal(colObject, column, row) {
      const collBlocks = colObject.blocks
      let startingBlock = {
        row: row,
        col: column,
      }
      if (row < collBlocks.length - 1) {
        for (let index = row; index < collBlocks.length - 1; index++) {
          if (startingBlock.col - 1 >= 0) {
            startingBlock.row = index + 1
            startingBlock.col--
          }
        }
      }
      return startingBlock
    },

    getStartingAntiDiagonal(colObject, column, row) {
      const collBlocks = colObject.blocks
      let startingBlock = {
        row: row,
        col: column,
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
.playersTurns {
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
