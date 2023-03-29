<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(100)

// Set a value in local storage
// localStorage.setItem('myKey', 'myValue');

// Get a value from local storage
const value = localStorage.getItem('myKey');

</script>

<template>
  <h1>{{ msg }}</h1>
  <div>
    <a-button type="primary">Primary Button</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
  </div>
  <div>
    <a-button type="primary" shape="circle">
      A
    </a-button>
    <a-button type="primary" icon="download">
      Download
    </a-button>
    <a-button shape="circle" icon="download" />
    <a-button icon="download">Download</a-button>
  </div>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    yes
    <div>
      {{ value }}
    </div>
  </div>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
