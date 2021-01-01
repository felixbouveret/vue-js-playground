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
              { hasBomb: j.hasBomb },
            ]"
            @click="blockClick($event, i, j)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      boardSize: 30,
      boardGrid: [],
      bombList: [],
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
          })
        }
        this.boardGrid.push(row)
      }
      this.createBombs()
    },

    blockClick(event, rowObject, colObject) {
      if (colObject.isShowed) return
      if (event.shiftKey) {
        if (colObject.isFlaged) {
          this.unflagBlock(rowObject, colObject)
        } else {
          this.flagBlock(rowObject, colObject)
        }
      } else {
        if (colObject.isFlaged) return
        this.showBlock(rowObject, colObject)
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

    createBombs() {
      for (let bomb = 0; bomb < this.bombNumber; bomb++) {
        this.setRandomBomb()
      }
    },

    setRandomBomb() {
      if (this.flatGrid[this.getRandomBombId()].hasBomb) {
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
  width: 100%;
  height: 100%;
  border: solid 1px #00000050;

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
