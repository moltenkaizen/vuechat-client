<template>
    <div class="sign-in">
      <h1 class="sign-in__header">VueChat</h1>
      <img class="sign-in__button" @click="signInWithGoogle" src="../assets/btn_google_signin_dark_normal_web.png" alt="">
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    signInWithGoogle () {
      this.$store.dispatch('signIn')
    }
  }
}
</script>

<style scoped>
  .sign-in {
    margin-top: 10vh;
    text-align: center;
  }
  .sign-in__header {
    font-size: 2rem;
    color: #383F51;
  }
  .sign-in__button:hover {
    cursor: pointer;
  }

</style>
