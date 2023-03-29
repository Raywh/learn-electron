
<script setup lang="ts">
import ChatList from "./ChatList.vue";
import { message } from 'ant-design-vue';
import { ref, Ref } from "vue";
const chatValue = ref(""); // 输入的内容
const chatResult = ref(""); // 输出的内容
const chatHistory = ref([]); // 聊天记录
const loading = ref(false); // 是否正在加载
const todoListRef = ref(null);
const store = ref({})

// 发送消息
async function load() {
  //示例
  // const OPENAI_API_KEY = "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"; // 用于测试的key
  const OPENAI_API_KEY = "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"; // 我自己的key

  try {
    const prompt = chatValue.value.trim(); // 输入的内容
    if (prompt === "") return; // 如果没有输入内容，直接返回
    loading.value = true; // 正在加载
    chatResult.value = ""; // 清空输出内容
    const res = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 1000,
        temperature: 0,
      }),
    });
    const response = await res.json();
    console.log(response);
    store.value = {
      title: prompt,
      description: response.choices[0].text,
      id: response.id
    };

    const result = response.choices[0].text;
    console.log(result);
    chatResult.value = result;
    loading.value = false;
    console.log(chatValue)
  } catch (error) {
    console.log(error)
    const msg = JSON.stringify(error)
    message.info(msg)
    load()

  }
}
// load()
</script>

<template>
  <div>
    ChatGpt index

    <div class="chat-container">
      <div class="left">
        <ChatList ref="todoList" :data="store" />
      </div>
      <div class="right">
        <!-- 一个多行的input，绑定输入chatValue，一个button 提交，一个div为输出的内容 -->
        <div class="box">
          <a-textarea v-model:value="chatValue" placeholder="请输入文本内容" :autoSize="{ minRows: 3 }" allow-clear showCount
            class="input-box" @pressEnter="load" />
          <a-button :disabled="loading" :loading="loading" class="submit-btn" @click="load">查 询</a-button>
        </div>
        <div class="content">{{ chatResult }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  width: 100%;
}

.left {
  flex: 1;
  min-width: 600px;
  max-height: 100vh;
  overflow-y: auto;
}

.right {
  width: 500px;
  margin-left: 20px;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-box {
  min-width: 360px;
  max-width: 600px;
}

.submit-btn {
  margin-left: 10px;
}
.content {
  white-space: pre-line;
}
</style>