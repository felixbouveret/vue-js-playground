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
  width: 100%;
  top: 0;
  left: 0;
}
header .inner {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-button {
  position: relative;
  font-size: 115%;
  font-weight: 600;
  color: #47617a;
  transition: color 0.3s;

  &:hover {
    color: #708294;
    svg {
      fill: #708294;
    }
  }
}

svg {
  fill: #47617a;
  height: 12px;
  transition: fill 0.3s;
}

.username {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  color: black;
  font-weight: 400;
  padding-left: 4px;
  transition-property: color;
  transition-duration: 0.3s;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #bf47fd, #002094);
    opacity: 1;
    transition-property: opacity;
    transition-duration: 0.3s;
    z-index: -1;
    border-radius: 4px;
  }

  &.isOpen,
  &:hover {
    &::before {
      opacity: 1;
    }
    svg {
      opacity: 1;
      margin-right: 0;
    }
  }

  svg {
    fill: black;
    opacity: 0;
    transition-property: opacity, margin-right;
    transition-duration: 0.3s;
    margin-right: -24px;
  }

  p {
    padding: 8px 8px 8px 4px;
    font-size: 100%;
  }

  input {
    background-color: transparent;
    border: none;
    color: white;
    padding: 8px 0 8px 4px;
    outline: none;
    font-size: 100%;
  }
}

.backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
