<template>
    <main>
      <p>Profile photo</p>
      <img class="round-profile" :src="url" alt="">
      <p>{{ url }}</p>
      <form action="">
        <label for="name">Name</label>
        <input id="name" type="text">
        <button>Cancel</button>
        <button>Save</button>
      </form>
      <input type="radio" id="man" value="men" v-model="sex">
      <label for="man">Man</label>
      <br>
      <input type="radio" id="woman" value="women" v-model="sex">
      <label for="woman">Woman</label>
      <br>
      <button @click="number--">Back</button>
      <button @click="number++">Forward</button>
    </main>
</template>

<script>
export default {
  name: 'ProfileEdit',
  data () {
    return {
      number: 0,
      sex: 'women'
    }
  },
  computed: {
    url () {
      return `https://randomuser.me/api/portraits/${this.sex}/${this.number}.jpg`
    }
  }
}
</script>

<style scoped>
  .round-profile {
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

</style>
