
<script setup lang="ts">
import ChatList from "./ChatList.vue";
import { message } from 'ant-design-vue';
import { ref, reactive } from "vue";
const chatValue = ref(""); // 输入的内容
const chatResult = ref(""); // 输出的内容
const chatHistory = ref([]); // 聊天记录
const loading = ref(false); // 是否正在加载
const todoListRef = ref(null);
const store = ref({})
const context = reactive({ "role": "user", "content": "" })
const history = ref([])// 定义上下文历史记录
// 发送消息
async function load() {
  //示例
  // const OPENAI_API_KEY = "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"; // 用于测试的key
  const OPENAI_API_KEY = ""; // 我自己的key
  console.log(context)
  // 需要深拷贝context
  const val = JSON.parse(JSON.stringify(context))
  history.value.push(val)
  console.log(history.value)
  try {
    // const prompt = chatValue.value.trim(); // 输入的内容
    const prompt = context.content.trim(); // 输入的内容
    if (prompt === "") return; // 如果没有输入内容，直接返回
    loading.value = true; // 正在加载
    chatResult.value = ""; // 清空输出内容
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        // prompt,
        max_tokens: 1000,
        temperature: 0,
        messages: history.value
      }),
    });
    const response = await res.json();
    console.log(response);
    store.value = {
      title: prompt,
      description: response.choices[0].message.content,
      id: response.id
    };
    history.value.push(response.choices[0].message)

    const result = response.choices[0].message.content;
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
          <a-textarea v-model:value="context.content" placeholder="请输入文本内容" :autoSize="{ minRows: 3 }" allow-clear showCount
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