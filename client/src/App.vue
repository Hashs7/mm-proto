<template>
  <Header />
  <div id="nav">
    <router-link to="/">List</router-link>
    |
    <router-link to="/create">Create</router-link>
    |
    <router-link to="/chat">Chat</router-link>
    |
    <router-link to="/register">Sign up</router-link>
    |
    <router-link to="/login">Log in</router-link>
  </div>
  <router-view/>
</template>

<script>
  import Header from '@/components/Header';

  export default {
    components: {
      Header,
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
