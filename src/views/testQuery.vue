<template>
  <h1>Posts</h1>
  <p>Current Page: {{ page }} | Previous data: {{ isPreviousData }}</p>
  <button v-if="page > 1" @click="prevPage">Prev Page</button>
  <button v-if="data.data.last_page > page" @click="nextPage">Next Page</button>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data.data.posts" :key="item.id">
        {{ item.body }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getPostsTest } from "@/API/services/post.service";

const page = ref(1);
// Query
const { isLoading, isError, data, error, isFetching, isPreviousData } =
  useQuery({
    queryKey: ["posts", page.value],
    queryFn: () => getPostsTest(page.value),
    keepPreviousData: true,
    onSuccess: (data) => {
      console.log("🚀 ~ file: testQuery.vue:25 ~ data:", data.data);
    },
  });

const prevPage = () => {
  page.value = Math.max(page.value - 1, 1);
};
const nextPage = () => {
  if (!isPreviousData.value) {
    page.value = page.value + 1;
  }
};
</script>

<style lang="scss" scoped></style>
