<template>
    <div class="buttons">
      <input type="text" v-model="displayName" placeholder="displayName">
      <input type="text" v-model="email" placeholder="email">
      <input type="text" v-model="photoURL" placeholder="photoUrl">
      <input type="text" v-model="message" placeholder="message">
      <button @click="SignIn">Vuex SignIn Action</button>
      <button @click="userJoined({displayName, email, photoURL})">Vuex userJoined Action</button>
      <button @click="isTyping">Vuex isTyping Action</button>
      <button @click="notTyping">Vuex notTyping Action</button>
      <button @click="sendMessage">Vuex sendMessage Action</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SocketTest',
  data () {
    return {
      displayName: 'Bob Blob',
      email: 'bblob@test.com',
      photoURL: 'https://google.come/profiles/bblob.png',
      message: 'Nice message'
    }
  },
  methods: {
    ...mapActions([
      'SignIn',
      'userJoined',
      'isTyping',
      'notTyping',
      'sendMessage'
    ])
  }
}
</script>

<style scoped>
  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 4em;
  }
  input {
    font-size: 1rem;
  }
  button {
    display: block;
    font-size: 2em;
    margin: .6em;
  }

</style>
