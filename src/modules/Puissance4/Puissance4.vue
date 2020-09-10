<template>
  <section class="root">
    <div v-if="winningPlayer">
      {{ winningPlayer === 1 ? "Joueur 1" : "Joueur 2" }}
    </div>
    <div class="puissance">
      <div
        v-for="(col, colId) in grid"
        :key="colId"
        class="puissance_col"
        @click="addCoin(col, colId)"
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
      diagoGrid: [],
      player: true,
      winCondition: 0,
      reversGrid: [],
      newGrid: [],
      winningPlayer: 0,
    };
  },

  methods: {
    addCoin(column, colId) {
      let blockId = this.reversedBlockId(column);
      if (blockId >= 0) {
        column.blocks[blockId].player = this.currentPlayer;
        column.activeBlocks++;
        this.switchPlayer();
        this.checkColumns(column);
        this.checkRows(blockId);
        this.checkDiagonal(column, colId, blockId);
        this.checkAntiDiagonal(column, colId, blockId);
      }
    },

    checkColumns(column) {
      let sequence = 0;
      for (
        let blockIndex = column.blocks.length - 1;
        blockIndex >= 0;
        blockIndex--
      ) {
        const hasPreviousBlock = column.blocks[blockIndex - 1] ? true : false;
        const previousblock = hasPreviousBlock
          ? column.blocks[blockIndex - 1]
          : false;
        const block = column.blocks[blockIndex];

        if (block.player && block.player === previousblock.player) {
          sequence++;

          if (sequence >= 3) {
            this.finishGame(block.player);
          }
        } else {
          sequence = 0;
        }
      }
    },

    checkRows(row) {
      let sequence = 0;
      for (let blockIndex = 0; blockIndex < this.grid.length; blockIndex++) {
        const hasPreviousColumn = this.grid[blockIndex - 1] ? true : false;
        const previousColumn = hasPreviousColumn
          ? this.grid[blockIndex - 1].blocks
          : false;
        const column = this.grid[blockIndex].blocks;

        if (
          previousColumn[row] &&
          column[row].player &&
          column[row].player === previousColumn[row].player
        ) {
          sequence++;
          if (sequence >= 3) {
            this.finishGame(column[row].player);
          }
        } else {
          sequence = 0;
        }
      }
    },

    checkDiagonal(colObject, column, row) {
      const startingBlock = this.getStartingDiagonal(colObject, column, row);
      let sequence = 0;

      let o = startingBlock.row;

      for (let index = startingBlock.col; index < this.grid.length; index++) {
        const currentBlock = this.grid[index].blocks[o];
        const previousBlock =
          this.grid[index - 1] && this.grid[index - 1].blocks[o + 1]
            ? this.grid[index - 1].blocks[o + 1]
            : false;

        if (o >= 0) {
          if (
            previousBlock &&
            currentBlock.player &&
            previousBlock.player === currentBlock.player
          ) {
            sequence++;
            if (sequence >= 3) {
              this.finishGame(currentBlock.player);
            }
          } else {
            sequence = 0;
          }
          o--;
        }
      }
    },

    checkAntiDiagonal(colObject, column, row) {
      const startingBlock = this.getStartingAntiDiagonal(
        colObject,
        column,
        row
      );

      let sequence = 0;

      let o = startingBlock.row;

      for (let index = startingBlock.col; index >= 0; index--) {
        const currentBlock = this.grid[index].blocks[o];
        const previousBlock =
          this.grid[index + 1] && this.grid[index + 1].blocks[o + 1]
            ? this.grid[index + 1].blocks[o + 1]
            : false;

        if (o >= 0) {
          if (
            previousBlock &&
            currentBlock.player &&
            previousBlock.player === currentBlock.player
          ) {
            sequence++;
            if (sequence >= 3) {
              this.finishGame(currentBlock.player);
            }
          } else {
            sequence = 0;
          }
          o--;
        }
      }
    },

    switchPlayer() {
      this.player = !this.player;
    },

    reversedBlockId(column) {
      return column.blocks.length - column.activeBlocks - 1;
    },

    getStartingDiagonal(colObject, column, row) {
      const collBlocks = colObject.blocks;
      let startingBlock = {
        row: row,
        col: column,
      };
      if (row < collBlocks.length - 1) {
        for (let index = row; index < collBlocks.length - 1; index++) {
          if (startingBlock.col - 1 >= 0) {
            startingBlock.row = index + 1;
            startingBlock.col--;
          }
        }
      }
      return startingBlock;
    },

    getStartingAntiDiagonal(colObject, column, row) {
      const collBlocks = colObject.blocks;
      let startingBlock = {
        row: row,
        col: column,
      };
      if (row < collBlocks.length - 1) {
        for (let index = row; index < collBlocks.length - 1; index++) {
          if (startingBlock.col + 1 <= collBlocks.length) {
            startingBlock.row = index + 1;
            startingBlock.col++;
          }
        }
      }
      return startingBlock;
    },

    finishGame(winner) {
      this.winningPlayer = winner;
    },
  },

  computed: {
    currentPlayer() {
      return this.player ? 1 : 2;
    },
  },
};
</script>

<style lang="scss" scoped>
.puissance {
  background: linear-gradient(45deg, #bf47fd, #002094);
  display: inline-flex;
  margin: auto;
  padding: 8px;
  position: relative;
  border-radius: 10px;

  &::before,
  &::after {
    position: absolute;
    bottom: 0;

    width: 50px;
    height: 8px;

    background-color: #bf47fd;
    transform: translateY(100%);
    border-radius: 0 0 2px 2px;
    content: "";
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
  width: 50px;
  height: 50px;
  background-color: #020217;
  border-radius: 100%;
  margin: 5px;
  line-height: 50px;

  /*  Delete after  */
  font-family: arial;
  font-weight: bold;
  font-size: 2em;

  &.activePlayer1 {
    background-color: red;
  }
  &.activePlayer2 {
    background-color: blue;
  }
}
</style>
