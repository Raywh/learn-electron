<template>
  <div>
    <h1>Todolist</h1>
    <!-- <ul class="no-bullets">
      <li v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
        <span class="todo-index">{{ index + 1 }}.</span>
        <span class="todo-text">{{ todo.text }}</span>
        <button class="remove-button" @click="removeTodo(index)">X</button>
      </li>
    </ul> -->
    <a-list :grid="{ gutter: 10 }" :data-source="todos">
      <template #renderItem="{ item, index }">
        <a-list-item>
          <a-card :title="item.title">
            <template #extra >
              <a-button type="primary" danger shape="round" size="small" 
              class="del-btn"
              @click="removeTodo(index)">
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>
            </template>
            <div>{{ item.text }}
            </div>
          </a-card>
        </a-list-item>
      </template>
    </a-list>

    <div class="add-todo">
      <input type="text" v-model="newTodo" @keyup.enter="addTodo">
      <button @click="addTodo">Add Todo</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
interface Todo {
  id: number;
  title: string;
  text: string;
}

const todos: Ref<Todo[]> = ref([]);

const localTodo = JSON.parse(localStorage.getItem("todos") || "[]"); // 获取本地存储的数据
console.log(localTodo);
todos.value = localTodo; // 将本地存储的数据赋值给todos

const newTodo: Ref<string> = ref('');
// 添加
function addTodo(): void {
  if (newTodo.value.trim() !== '') {
    todos.value.push({
      id: todos.value.length + 1,
      title: `todo ${todos.value.length + 1}`,
      text: newTodo.value.trim(),
    });
    localStorage.setItem("todos", JSON.stringify(todos.value));
    newTodo.value = '';
  }
}

// 删除
function removeTodo(index: number) {
  todos.value.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos.value));
}
</script>
<style scoped>
.no-bullets {
  list-style: none;
  padding-left: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.todo-index {
  font-weight: bold;
  margin-right: 10px;
}
.del-btn {
  margin-left: 10px;
}
</style>
