<template>
  <div>
    <a-list size="small" bordered item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item, index }">
        <a-list-item>
          <a-list-item-meta>
            <template #description>
              <span class="content">{{ item.description }}</span>
            </template>
            <template #title>
              <span>{{ item.title }}</span>
            </template>
            <template #avatar>
              <a-avatar :size="30">{{index + 1}}</a-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
// 定义props 父组件传一个object进来
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
interface DataItem {
  title: string;
  description: string;
}
const data = ref([
  {
    title: 'Ant Design Title 1',
    description: '示例'
  }
]);
// 监听props的 data
watch(
  () => props.data,
  (obj) => {
    console.log(obj)
    addTodo(obj)
  }
)

const addTodo = (obj: any) => {
  console.log('addTodo');
  data.value.push(obj)
};
</script>

<style scoped>
.content {
  white-space: pre-line;
}
</style>