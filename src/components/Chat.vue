<template>
  <main class="container">
    <LeftBar/>
    <UserList/>
    <ChatArea/>
  </main>
</template>

<script>
import UserList from './UserList'
import LeftBar from './LeftBar'
import ChatArea from './ChatArea'
import VueSocketio from 'vue-socket.io'
import store from '../store'
import Vue from 'vue'

let socketURL = window.location.hostname

if (window.location.hostname === 'localhost') {
  socketURL = window.location.hostname + ':3000'
}

export default {
  name: 'Chat',
  components: { LeftBar, UserList, ChatArea },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    // Connect to socket.io server when this Chat component is created
    Vue.use(VueSocketio, socketURL, store)
    this.$socket.emit('new user', this.user)
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: space-between;
    height: 100vh;
  }
</style>
