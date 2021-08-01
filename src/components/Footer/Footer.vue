<template>
  <footer>
    <ul>
      <li>
        <a href="https://github.com/felixbouveret" target="_blank">
          <GithubLogo height="24px" width="24px" />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/felixbouveret" target="_blank">
          <TwitterLogo />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/f%C3%A9lix-bouveret-010005150/"
          target="_blank"
        >
          <LinkedinLogo height="24px" width="24px" />
        </a>
      </li>
    </ul>
    <p>Copyright © {{ getYear }} Félix Bouveret</p>
  </footer>
</template>

<script>
import LinkedinLogo from '@/assets/Footer/icons/linkedin.svg'
import GithubLogo from '@/assets/Footer/icons/github.svg'
import TwitterLogo from '@/assets/Footer/icons/twitter.svg'

export default {
  name: 'Footer',

  components: {
    LinkedinLogo,
    GithubLogo,
    TwitterLogo,
  },

  computed: {
    getYear() {
      const currentDate = new Date()
      return currentDate.getFullYear()
    },
  },
}
</script>

<style lang="scss" scoped>
footer {
  padding: 16px 0;

  @media (min-width: 720px) {
    margin-bottom: 0;
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

    transition: fill 0.3s;

    fill: #2c3e50;
  }

  a:hover svg {
    fill: #708294;
  }
}
</style>
