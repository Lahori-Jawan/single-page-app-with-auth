<template>
  <div id="app" class="app-container">
    <p>
      I am coming from
      <strong>App.vue</strong> file. You can use
      <strong>Nav</strong> here
    </p>
    <nav>
      <router-link to="/">Home</router-link>&nbsp;
      <router-link to="/auth/login">Login</router-link>&nbsp;
      <router-link to="/about">About</router-link>&nbsp;
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
