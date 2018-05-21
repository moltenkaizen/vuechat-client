import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../firebase'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    user: {
      displayName: null,
      photoURL: null,
      email: null
    },
    connected: false,
    users: [],
    messages: [],
    typingUsers: []
  },
  actions: {
    signIn ({commit}) {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(data => {
          commit('loggedIn', data.user)
          router.replace('/')
          // this._vm.$socket.emit('new user', {
          //   displayName: data.user.displayName,
          //   photoURL: data.user.photoURL,
          //   email: data.user.email
          // })
        })
        .catch(error => console.log(error))
    },
    signOut ({commit}) {
      firebase.auth().signOut().then(() => {
        console.log('Letting socketio server know I left')
        this._vm.$socket.emit('user left', this.state.user)
        commit('signOut')
        router.replace('/login')
      })
    }
  },
  mutations: {
    loggedIn (state, user) {
      state.typingUsers = []
      state.user.displayName = user.displayName
      state.user.photoURL = user.photoURL
      state.user.email = user.email
    },
    signOut (state) {
      state.typingUsers = []
      state.user.displayName = null
      state.user.photoURL = null
      state.user.email = null
      state.users = []
      state.messages = []
    },
    SOCKET_CONNECT (state) {
      state.connected = true
      console.log('socket.io connected')
    },
    SOCKET_DISCONNECT (state, data) {
      state.connected = false
      console.log('socket.io disconnected', data)
    },
    SOCKET_NEW_MESSAGE (state, message) {
      // Getting an array back from the server, grabbing first element
      state.messages.push(message[0])
    },
    SOCKET_TYPING (state, data) {
      const typingUser = data[0].displayName
      if (!state.typingUsers.includes(typingUser)) {
        state.typingUsers.push(typingUser)
      }
    },
    SOCKET_NOT_TYPING (state, data) {
      const typingUser = data[0].displayName
      if (state.typingUsers.includes(typingUser)) {
        let index = state.typingUsers.indexOf(typingUser)
        state.typingUsers.splice(index, 1)
      }
    },
    SOCKET_USER_LEFT (state, data) {
      const userLeft = data[0]
      console.log(`${userLeft} left`)
      state.users = state.users.filter(user => user.displayName !== userLeft)
    },
    SOCKET_SEND_ALL_CLIENTS (state, allClients) {
      // console.log(allClients[0])
      state.users = allClients[0]
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.user.email !== null
    },
    users (state) {
      return state.users
    },
    messages (state) {
      return state.messages
    },
    typingString (state) {
      let typingString = ''
      if (state.typingUsers.length === 1) {
        return `${state.typingUsers[0]} is typing...`
      } else if (state.typingUsers.length > 1) {
        state.typingUsers.forEach((user, index) => {
          if (index === state.typingUsers.length - 1) {
            typingString += `${user}`
          } else {
            typingString += `${user} and `
          }
        })
        typingString += ' are typing...'
        return typingString
      }
    }
  }
})

export default store
