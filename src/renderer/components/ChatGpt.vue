
<script setup lang="ts">
import { ref, Ref } from "vue";
const chatValue = ref(""); // 输入的内容
const chatResult = ref(""); // 输出的内容
const chatHistory = ref([]); // 聊天记录
const loading = ref(false); // 是否正在加载
// 发送消息
async function load() {
  //示例
  // const OPENAI_API_KEY = "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"; // 用于测试的key
  const OPENAI_API_KEY = "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"; // 我自己的key
  console.log(chatValue)

  const prompt = chatValue.value; // 输入的内容
  if (prompt === "") return; // 如果没有输入内容，直接返回
  loading.value = true; // 正在加载
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
  const result = response.choices[0].text;
  console.log(result);
  chatResult.value = result;
  loading.value = false;
}
// load()
</script>

<template>
  <div>
    ChatGpt
    <!-- 一个多行的input，绑定输入chatValue，一个button 提交，一个div为输出的内容 -->
    <div class="box">
      <a-textarea 
      v-model:value="chatValue" 
      placeholder="请输入文本内容"
      :autoSize="{ minRows: 3 }"
      allow-clear
      showCount
      class="input-box"
      @pressEnter="load"
      />
      <a-button :disabled="loading" :loading="loading" class="submit-btn" @click="load">查 询</a-button>
    </div>

    <div>{{ chatResult }}</div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.input-box {
  min-width: 300px;
  max-width: 600px;
}
.submit-btn {
  margin-left: 10px;
}
</style>