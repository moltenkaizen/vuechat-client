<template>
    <aside class="left-bar">
      <article class="profile">
        <img class="profile__img" :src="user.photoURL" alt="">
        <p class="profile__name">{{ user.displayName }}</p>
        <a class="profile__logout" href="#" @click.prevent="signOut">Log Out</a>
      </article>
      <article class="actions">
        <i class="fas fa-cog fa-2x action__settings"></i>
        <!--<button @click="showAuthData">Auth console.log()</button>-->
        <br/>
      </article>
    </aside>
</template>

<script>
import firebase from '../firebase'
export default {
  name: 'LeftBar',
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
    },
    showAuthData () {
      console.log(firebase.auth().currentUser)
    }
  }
}
</script>

<style scoped>
  .left-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #383F51;
    min-width: 120px; /* em rem or px? */
    width: 120px;
    padding-top: 22px;
    text-align: center;
  }
  .profile__img {
    box-sizing: border-box;
    width: 76px; /* px to rem or em */
    border-radius: 50%;
    border: 2px solid white;

  }
  .profile__name {
    margin-top: .6em;
    font-size: .875rem;
    font-weight: 600;
    color: white;
  }
  .profile__logout {
    color: #ccc;
    font-size: .7rem;
  }
  .actions {
    width: 75%;
    border-top: 1px solid #979797;
    text-align: center;
    height: 73px;
  }
  .action__settings {
    margin-top: 15px;
    font-size: 32px;
    color: white;
  }
  @media only screen and (max-width: 768px) {
    .left-bar {
      display: none;
    }
  }
</style>
