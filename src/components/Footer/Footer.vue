<template>
  <footer>
    <ul>
      <li>
        <a href="https://github.com/felixbouveret" target="_blank">
          <img
            svg-inline
            src="@/assets/Footer/icons/github.svg"
            alt="Github Logo"
          />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/felixbouveret" target="_blank">
          <img
            svg-inline
            src="@/assets/Footer/icons/twitter.svg"
            alt="Twitter Logo"
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/f%C3%A9lix-bouveret-010005150/"
          target="_blank"
        >
          <img
            svg-inline
            src="@/assets/Footer/icons/linkedin.svg"
            alt="Linkedin Logo"
          />
        </a>
      </li>
    </ul>
    <p>Copyright © {{ getYear }} Félix Bouveret</p>
  </footer>
</template>

<script>
export default {
  computed: {
    getYear() {
      const currentDate = new Date();
      return currentDate.getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  margin-bottom: 16px;
  @media (min-width: 720px) {
    position: absolute;
    margin-bottom: 0;
    bottom: 16px;
  }
}

ul {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 12px;

  li {
    display: block;
    margin-left: 8px;
    &:first-of-type {
      margin-left: 0;
    }
  }

  svg {
    display: block;
    width: 24px;
    height: 24px;
    fill: #2c3e50;
    transition: fill 0.3s;
  }

  a:hover svg {
    fill: #708294;
  }
}
</style>
