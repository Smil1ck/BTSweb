<template>
  <div
    class="d-flex justify-center"
    style="margin-top: 200px; margin-left: 130px; font-size: 40px"
  >
    <h1 v-if="!isAuth">
      Welcome: {{ user }}<br />Login in your account to continue
    </h1>
    <h1 v-else>Welcome: {{ user }}<br />Have a nice day</h1>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const isAuth = ref(userStore.isLoged);

const user = computed(() => {
  return userStore.getUserName;
});
</script>
