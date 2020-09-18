<template>
  <transition name="fade">
    <header v-if="$route.fullPath !== '/'">
      <div class="inner">
        <div>
          <router-link to="/" class="back-button">
            <img
              svg-inline
              src="@/assets/Header/icons/left-arrow.svg"
              class="arrow"
            />
            Retour
          </router-link>
        </div>
        <div
          class="username"
          :class="{ isOpen: isInputShown }"
          @click="showInput"
        >
          <img svg-inline src="@/assets/Header/icons/edit.svg" alt="edit" />
          <p v-if="!isInputShown">
            {{ usernameDisplayed }}
          </p>
          <input
            v-show="isInputShown"
            ref="input"
            type="text"
            v-model="usernameDisplayed"
            @keydown="isHitingEnter"
          />
        </div>
      </div>
      <portal to="root-app">
        <div v-if="isInputShown" class="backdrop" @click="hideInput"></div>
      </portal>
    </header>
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      usernameDisplayed: this.$store.state.app.username
        ? this.$store.state.app.username
        : "Anonymous",
      isInputShown: false,
    };
  },

  computed: {
    ...mapState("app", ["username"]),
  },

  methods: {
    ...mapMutations("app", ["SET_USERNAME"]),

    showInput() {
      this.isInputShown = true;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 50);
    },

    isHitingEnter(event) {
      if (event.code === "Enter") {
        this.hideInput();
      }
    },

    hideInput() {
      this.isInputShown = false;

      if (this.usernameDisplayed !== "") {
        this.SET_USERNAME(this.usernameDisplayed);
      } else {
        this.usernameDisplayed = this.username;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
}
header .inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.back-button {
  position: relative;

  color: #47617a;
  font-weight: 600;
  font-size: 115%;

  transition: color 0.3s;

  &:hover {
    color: #708294;
    svg {
      fill: #708294;
    }
  }
}

svg {
  height: 12px;

  transition: fill 0.3s;

  fill: #47617a;
}

.username {
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  padding-left: 4px;

  color: black;
  font-weight: 400;
  font-size: 105%;

  cursor: pointer;

  transition-duration: 0.3s;
  transition-property: color;

  &::before {
    position: absolute;
    top: 0%;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;
    border-radius: 4px;

    background: linear-gradient(45deg, #bf47fd, #002094);
    opacity: 1;

    transition-duration: 0.3s;
    transition-property: opacity;

    content: "";
  }

  &.isOpen,
  &:hover {
    &::before {
      opacity: 1;
    }
    svg {
      margin-right: 0;

      opacity: 1;
    }
  }

  svg {
    margin-right: -24px;

    opacity: 0;

    transition-duration: 0.3s;
    transition-property: opacity, margin-right;

    fill: black;
  }

  p {
    padding: 8px 8px 8px 4px;
  }

  input {
    padding: 8px 0 8px 4px;
    border: none;

    color: white;
    font-size: 100%;

    background-color: transparent;
    outline: none;
  }
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition-timing-function: ease;
  transition-duration: 0.3s;
  transition-property: opacity;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
