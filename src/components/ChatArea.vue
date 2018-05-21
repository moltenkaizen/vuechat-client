<template>
    <section class="chat-area">
      <ul class="messages" ref="chatArea">
        <li v-for="message in messages" :key="messages.indexOf(message)" class="message">
          <img class="message__image" :src="message.photoURL" alt="Profile Image">
          <article>
            <h3 class="message__author">{{ message.author }}</h3>
            <span class="message__time">{{ message.time }}</span>
            <p class="message__body">{{ message.body }}</p>
          </article>
        </li>
      </ul>
        <p>{{ typingString }}</p>
      <form class="chat-area__form" @submit.prevent="sendMessage">
        <input class="chat-area__input" autofocus type="text" v-model="myMessage" placeholder="Type Something...">
      </form>
    </section>
</template>

<script>
export default {
  name: 'ChatArea',
  data () {
    return {
      myMessage: ''
    }
  },
  computed: {
    messages () {
      return this.$store.getters.messages
    },
    typingString () {
      return this.$store.getters.typingString
    }
  },
  watch: {
    myMessage () {
      if (this.myMessage) {
        this.isTyping = true
        this.$socket.emit('typing')
      } else {
        this.$socket.emit('not typing')
      }
    },
    messages () {
      // When messages array changes, scroll up the messages area
      this.$nextTick(() => this.scrollMessagesUp())
    }
  },
  methods: {
    sendMessage () {
      if (!this.myMessage) {
        return
      }
      this.$socket.emit('send message', this.myMessage)
      this.myMessage = ''
    },
    scrollMessagesUp () {
      let messageDisplay = this.$refs.chatArea
      messageDisplay.scrollTop = messageDisplay.scrollHeight
    }
  },
  mounted () {
    // Scroll up the messages area after the component is mounted because of messages in array
    this.scrollMessagesUp()
  }
}
</script>

<style scoped>
  .chat-area {
    background: white;
    width: 100%;
    padding: 32px 24px 0 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .messages {
    padding: 0;
    list-style: none;
    flex: 1;
    overflow-y: auto;
  }

  .message {
    display: flex;
    margin-top: 10px;
  }

  .message__image {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 9px;
  }

  .message__author {
    display: inline;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0;
  }

  .message__time {
    font-size: 13px;
    color: #737373;
    font-weight: 400;
    letter-spacing: -0.64px;
    margin-left: .2rem;
  }

  .message__body {
    font-size: 13px;
    font-weight: 500;
    color: #545454;
    margin-top: 4px;
    letter-spacing: .4px;
  }

  .chat-area__form {
    margin-right: 20px;
    margin-bottom: 20px;
    /*background: green;*/
    /*position: fixed;*/
    /*width: 69%;*/
  }

  .chat-area__input {
    border: 2px solid #595959;
    height: 40px;
    font-size: 15px;
    color: black;
    font-weight: 400;
    padding-left: 15px;
    width: 100%;
    outline: none;
  }

  /*@media only screen and (max-width: 768px) {*/
    /*.chat-area__form {*/
      /*margin-bottom: 10vh;*/
    /*}*/
  /*}*/
</style>
