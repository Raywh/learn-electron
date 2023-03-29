<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import TodoList from './components/TodoList.vue'

window.electronAPI.sendMessage('Hello from App.vue!');
// q: 上面这句话是干嘛的？
// a: 用于测试electronAPI是否可用
// q: 为什么要在这里测试？
// a: 因为这个文件是最先被加载的，所以在这里测试就可以保证在整个应用中electronAPI都是可用的
// q: 原理是什么？
// a: 通过在preload.js中将electronAPI挂载到window上，然后在这里通过window.electronAPI来调用electronAPI
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <router-link to="/">HelloWorld</router-link> |
  <router-link to="/todo">TodoList</router-link> |
  <router-link to="/chat">ChatGpt</router-link>

  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
