<template>
  <div id="app">
    <p>
      I am coming from <strong>App.vue</strong> file. You can use <strong>Nav</strong> here
    </p>
    <!-- <button v-on="{'click': $store.getters.isLoggedIn ? Logout(): Login()}">Logout</button> -->
    <button v-if="$store.getters.isLoggedIn" @click="Logout">Logout</button>
    <nav>
      <router-link to="/">Home</router-link> &nbsp;
      <router-link to="/auth/login">Login</router-link> &nbsp;
      <router-link to="/auth/register">Register</router-link> &nbsp;
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { axios } from '@/config/axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { TokenService } from '@/services/Token'
export default {
  name: 'App',
  async beforeCreate () {
    const token = TokenService.getToken();
    const user = token ? (await axios.get('/api/user')).data : null
    user && await this.SET_USER(user.user)
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_USER'
    ]),
    ...mapActions([
      'Logout',
      'Login'
    ])
  },
  //* here we observe Vuex state for loggedin user and take action accordingly
  watch: {
    'isLoggedIn': function (loggedIn, loggedOut) {
      console.log({loggedIn, loggedOut})
      if(loggedIn) {
        console.log('if', {loggedIn});
        this.$router.replace({path: '/'}).catch(err => {});
      }
      if(loggedOut) {
        console.log({loggedOut});
        this.$router.replace({path: '/auth/*'}).catch(err => console.log('logged-out err', err));
      }
    }
  }
}
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
