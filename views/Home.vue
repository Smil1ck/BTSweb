<template>
  <v-card class="bg-grey-lighten-2 ma-7 pa-3 d-block" rounded>
    <!--карточка пользователя-->
    <v-row justify="start" align="stretch">
      <v-col cols="12" sm="4" md="3" lg="3">
        <v-card
          :loading="loading"
          class="pa-6 fill-height"
          style="max-height: 200px; overflow-y: auto"
        >
          <!-- Информация о пользователе -->
          <div class="mb-8">
            <!-- User -->
            <div class="d-flex align-center mb-4">
              <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
                :title="user"
              ></v-list-item>
            </div>
          </div>

          <!-- Кнопка выхода -->
          <v-btn
            @click="logout"
            :loading="loading"
            color="error"
            variant="tonal"
            prepend-icon="mdi-logout"
            block
          >
            Logout
          </v-btn>
        </v-card>
      </v-col>
      <!--Параметры отображения постов-->
      <v-col cols="12" sm="8" md="9" lg="9">
        <v-card :loading="loadingPage" style="max-height: 200px">
          <div class="pt-3">
            <!-- Params -->
            <div class="d-block align-center ma-2 fill-height">
              <v-text-field
                v-model="searchForm"
                label=""
                prepend-icon="mdi-magnify"
                variant="outlined"
              ></v-text-field>
              <v-divider :thickness="3"></v-divider>
              <v-select
                :disabled
                v-model="maxPosts"
                class="v-col-6"
                label="Кол-во постов на странице"
                :items="['10', '20', '50']"
              ></v-select>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="mt-3" :thickness="3"></v-divider>
    <!--карточки  постов -->
    <v-row justify="start" align="stretch">
      <v-col v-for="item in posts.posts" cols="12" sm="6" md="6" lg="6">
        <v-card :loading="loadingPage" class="pa-2">
          <!--хедер для карточки-->
          <div class="d-flex">
            <span>{{ item.title }}</span>
            <v-spacer></v-spacer>
            <span>userID: {{ item.userId }}</span>
          </div>
          <v-divider :thickness="3"></v-divider>
          <!--Тело карточки-->
          <div class="mt-2 mb-2">
            <span>{{ fixedString(item.body) }}</span>
          </div>
          <v-divider :thickness="3"></v-divider>
          <!--Футер карточки-->
          <div class="d-flex ga-10 mt-1">
            <span>
              <v-icon
                color="blue-lighten-2"
                icon="mdi-thumb-up"
                variant="text"
              ></v-icon>
              : {{ item.reactions.likes }}
            </span>
            <span>
              <v-icon color="red" icon="mdi-thumb-down" variant="text"></v-icon>
              : {{ item.reactions.dislikes }}
            </span>
            <v-spacer></v-spacer>
            <span>
              <v-icon color="yellow" icon="mdi-star" variant="text"></v-icon>
              : {{ item.reactions.likes - item.reactions.dislikes }}
            </span>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mt-3" :thickness="3"></v-divider>
    <!--выбор страницы -->
    <v-row justify="start" align="center">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-pagination
          :disabled
          :total-visible="5"
          v-model="page"
          rounded
          :length="pageLenght"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { initPage, getNewPages } from "/servises/funcHome.js";
const userStore = useUserStore();

//variables
const loading = computed(() => {
  return userStore.isLoading;
});

//Обновление имени пользователя
const user = computed(() => {
  return userStore.getUserName;
});
//funcs
const logout = () => {
  userStore.logout();
};

//Работа с постами
const page = ref(1);
const maxPosts = ref(10);
const posts = ref(JSON.parse(localStorage.getItem("postsData")));
const searchForm = ref("");
const loadingPage = ref(false);
const disabled = ref(false);
const pageLenght = ref(4);

//Начальная загрузка
onMounted(async () => {
  loadingPage.value = true;
  await initPage(page.value, maxPosts.value);
  posts.value = JSON.parse(localStorage.getItem("postsData"));
  pageLenght.value = Math.ceil(posts.value.total / maxPosts.value);
  console.log(posts.value);
  setTimeout((loadingPage.value = false), 1500);
});

//при любом изменении поля страницы или кол-во постов обновление локал стораджа и самих постов
watch([page, maxPosts], async () => {
  loadingPage.value = true;
  disabled.value = true;
  await getNewPages(page.value, maxPosts.value);
  posts.value = JSON.parse(localStorage.getItem("postsData"));
  pageLenght.value = Math.ceil(posts.value.total / maxPosts.value);
  setTimeout(() => {
    loadingPage.value = false;
    disabled.value = false;
  }, 1500);
});
//вспомогательные функции
const fixedString = (str) => {
  return str?.length > 100 ? str.slice(0, 100) + "..." : str;
};
</script>
