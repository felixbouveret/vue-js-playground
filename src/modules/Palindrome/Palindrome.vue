<template>
  <section class="root">
    <div class="inner">
      <div class="palindromeContainer">
        <transition name="palinFade" mode="out-in">
          <span v-if="reversWord">Palindrome</span>
        </transition>
        <input v-model="word" type="text" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      word: null,
    };
  },
  computed: {
    reversWord() {
      if (this.word && this.word.length > 1) {
        const splitWord = this.word.split("");
        const isOdd = splitWord.length % 2;

        let firstLetterId = this.word.length - 1;
        for (
          let lastLetterId = 0;
          lastLetterId < splitWord.length / 2 + isOdd;
          lastLetterId++
        ) {
          const lastLetter = splitWord[lastLetterId];
          const firstLetter = splitWord[firstLetterId];

          if (lastLetter !== firstLetter) {
            firstLetterId--;
            return false;
          }
          firstLetterId--;
        }
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.palindromeContainer {
  position: relative;
}

span {
  position: absolute;
  top: -32px;
  left: 50%;

  margin-top: 16px;

  color: white;
  font-size: 2em;

  transform: translate(-50%, -100%);
}

input {
  padding: 16px 24px;
  border: 0;
  border-radius: 4px;

  font-size: 125%;

  background: linear-gradient(45deg, #bf47fd, #002094);
}

.palinFade-enter-active,
.palinFade-leave-active {
  transition-timing-function: ease;
  transition-duration: 0.3s;
  transition-property: opacity, top;
}

.palinFade-enter,
.palinFade-leave-active {
  opacity: 0;
}

.palinFade-enter {
  top: -24px;
}
</style>
