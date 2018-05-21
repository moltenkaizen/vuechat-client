<template>
    <aside class="user-list">
      <article class="search">
        <i class="fas fa-search fa-2x search__icon"></i>
        <input class="search__input" type="text" v-model="userFilter" placeholder="filter users...">
      </article>
      <ul class="users">
        <li v-if="filteredUsers" v-for="user in filteredUsers" :key="filteredUsers.indexOf(user)" class="users__box">
          <img class="users__image" :src="user.photoURL" alt="user profile image">
          <span class="users__name">{{ user.displayName }}</span>
        </li>
      </ul>
    </aside>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      userFilter: ''
    }
  },
  computed: {
    users () {
      return this.$store.getters.users
    },
    filteredUsers () {
      return this.users.filter(user => {
        return user.displayName.match(new RegExp(this.userFilter, 'ig'))
      })
    }
  }
}
</script>

<style scoped>
  .user-list {
    /* Fixed width*/
    min-width: 200px;
    width: 308px;
    background: #F0F0F0;
  }

  .search {
    border-bottom: 1px solid #ccc;
    padding: 12px 9px;
    position: relative;
  }

  .search__icon {
    position: absolute;
    top: 21px;
    left: 17px;
    color: #ccc;
  }

  .search__input {
    box-sizing: border-box;
    width: 100%;
    height: 37px;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    border-radius: 16px;
    border: 1px solid #ccc;
    padding-left: 37px;
    font-size: 14px;
    font-weight: 500;
    outline: none;
  }

  .users {
    margin: 0;
    padding: 0 1.4em;
  }

  .users__box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
    padding-bottom: 10px;
  }

  .users__image {
    box-sizing: border-box;
    width: 45px;
    border: 2px solid white;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .users__name {
    margin-left: 5px;
    font-size: 14px;
    font-weight: 600;
    color: #707070;
  }

  @media only screen and (max-width: 768px) {
    .user-list {
      display: none;
    }
  }
</style>
