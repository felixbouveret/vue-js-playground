<template>
  <section class="root" :class="{ error: error.isError }">
    <div class="simon">
      <div class="simon-container">
        <div
          v-for="(block, blockIndex) in SIMON_BLOCKS"
          :key="blockIndex"
          class="simon-block"
          :class="[block.color, { active: block.active }]"
          @click="simonsTurn ? onBlockClick(blockIndex) : null"
        />
      </div>
    </div>
    <button class="st-button" @click="gameButton.function">
      {{ gameButton.text }}
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      SIMON_BLOCKS: [
        {
          color: 'yellow',
          sound: new Audio(require('@/assets/sounds/Simon/yellow.mp3')),
          active: false,
        },
        {
          color: 'blue',
          sound: new Audio(require('@/assets/sounds/Simon/blue.mp3')),
          active: false,
        },
        {
          color: 'red',
          sound: new Audio(require('@/assets/sounds/Simon/green.mp3')),
          active: false,
        },
        {
          color: 'green',
          sound: new Audio(require('@/assets/sounds/Simon/red.mp3')),
          active: false,
        },
      ],
      SIMON_PATH: [],
      PLAYER_PATH: [],
      error: {
        isError: false,
        sound: new Audio(require('@/assets/sounds/Simon/error.mp3')),
      },

      button: {
        start: {
          text: 'Start',
          function: () => this.startSimon(),
        },
        restart: {
          text: 'Restart',
          function: () => this.startSimon(),
        },
        stop: {
          text: 'Stop',
          function: () => this.stopSimon(),
        },
      },

      simonsTurn: false,
      isFirstGame: true,
      simonRunning: false,
    }
  },

  computed: {
    checkPlayerMoves() {
      for (let i = 0; i < this.PLAYER_PATH.length; i++) {
        const move = this.PLAYER_PATH[i]
        console.log(move)
        console.log(this.SIMON_PATH)
        if (
          move !== this.SIMON_PATH[i] ||
          this.PLAYER_PATH.length > this.SIMON_PATH.length
        ) {
          return false
        }
      }
      return true
    },

    gameButton() {
      if (this.simonRunning) {
        return this.button.stop
      }
      if (this.isFirstGame) {
        return this.button.start
      } else {
        return this.button.restart
      }
    },
  },

  methods: {
    startSimon() {
      this.simonRunning = true
      this.isFirstGame = false
      this.resetSimon()
      this.prepareSimon()
    },

    resetSimon() {
      this.SIMON_PATH = []
      this.PLAYER_PATH = []
    },

    onBlockClick(blockIndex) {
      this.PLAYER_PATH.push(blockIndex)
      if (this.checkPlayerMoves) {
        this.blinkBlock(blockIndex)
      }

      if (
        this.PLAYER_PATH.length === this.SIMON_PATH.length &&
        this.checkPlayerMoves
      ) {
        this.PLAYER_PATH = []
        setTimeout(() => {
          this.onSimonsTurn()
          console.log('simon s turn')
        }, 500)
      } else if (!this.checkPlayerMoves) {
        this.stopSimon()
      }
    },

    onSimonsTurn() {
      const randomBlock = Math.floor(Math.random() * 4)
      this.SIMON_PATH.push(randomBlock)
      this.simonsTurn = false

      let blockIndex = 0

      const blockTimer = setInterval(() => {
        if (blockIndex === this.SIMON_PATH.length) {
          blockIndex = 0
          this.simonsTurn = true
          window.clearInterval(blockTimer)
        } else {
          this.blinkBlock(this.SIMON_PATH[blockIndex])
        }
        blockIndex++
      }, 700)
    },

    stopSimon() {
      this.simonRunning = false
      this.flashError()
      this.resetSimon()
    },

    prepareSimon() {
      for (
        let blockIndex = 0;
        blockIndex < this.SIMON_BLOCKS.length;
        blockIndex++
      ) {
        this.blinkBlock(blockIndex, false)
      }
      setTimeout(() => {
        this.onSimonsTurn()
      }, 500)
    },

    blinkBlock(blockIndex, hasSound = false) {
      if (hasSound) {
        this.SIMON_BLOCKS[blockIndex].sound.load()
        this.SIMON_BLOCKS[blockIndex].sound.play()
      }

      this.SIMON_BLOCKS[blockIndex].active = true
      setTimeout(() => {
        this.SIMON_BLOCKS[blockIndex].active = false
      }, 400)
    },

    flashError() {
      // this.error.sound.load();
      // this.error.sound.play();

      this.error.isError = true
      setTimeout(() => {
        this.error.isError = false
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.simon {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.simon-container {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(2, 100px);
  box-sizing: content-box;
  max-width: 248px;
  max-height: 248px;
  margin: auto;
  padding: 32px;
  border-radius: 16px;

  box-shadow: 0 0 20px 4px transparent;
  transform: rotate(45deg);

  transition: box-shadow 0.3s, background-color 0.3s;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    width: 70vw;
    height: 70vw;
  }
}

.simon-block {
  position: relative;

  width: 100px;
  height: 100px;
  border-radius: 10px;

  cursor: pointer;

  transition: box-shadow 0.3s, background-color 0.3s;

  @media (min-width: 720px) {
    width: 100%;
    height: 100%;
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 0;
    height: 0;
    border-radius: 4px;

    background-color: #ffffff7c;
    box-shadow: 0 0 10px 10px #ffffff7c;
    transform: translate(-50%, -50%);
    opacity: 0;

    transition: ease 0.3s;

    content: '';
  }
}

.yellow {
  background-color: #efe611;
  box-shadow: 0 0 32px 2px #efe61150;

  &.active {
    box-shadow: 0 0 32px 8px #efe61177;
  }

  &:hover {
    box-shadow: 0 0 32px 8px #efe611b9;
  }
}

.blue {
  background-color: #2281f0;
  box-shadow: 0 0 32px 2px #2281f050;

  &.active {
    box-shadow: 0 0 32px 8px #2281f077;
  }

  &:hover {
    box-shadow: 0 0 32px 8px #2281f0b9;
  }
}

.green {
  background-color: #29d34e;
  box-shadow: 0 0 32px 2px #29d34e50;

  &.active {
    box-shadow: 0 0 32px 8px #29d34e77;
  }

  &:hover {
    box-shadow: 0 0 32px 8px #29d34eb9;
  }
}

.red {
  background-color: #f24822;
  box-shadow: 0 0 32px 2px #f2482277;

  &.active {
    box-shadow: 0 0 32px 8px #f2482277;
  }

  &:hover {
    box-shadow: 0 0 32px 8px #f24822b9;
  }
}

.active::after {
  width: 30%;
  height: 30%;

  opacity: 1;
}

.error {
  background-color: #440b0b;

  .simon-container {
    background-color: #ab2121;
    box-shadow: 0 0 20px 4px #ab2121;
  }
}
</style>
