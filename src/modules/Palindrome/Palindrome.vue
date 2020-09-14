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
  color: white;
  font-size: 2em;
  margin-top: 16px;
  transform: translate(-50%, -100%);
  left: 50%;
  top: -32px;
}

input {
  background: linear-gradient(45deg, #bf47fd, #002094);
  padding: 16px 24px;
  border-radius: 4px;
  border: 0;
  font-size: 125%;
}

.palinFade-enter-active,
.palinFade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity, top;
  transition-timing-function: ease;
}

.palinFade-enter,
.palinFade-leave-active {
  opacity: 0;
}

.palinFade-enter {
  top: -24px;
}
</style>
