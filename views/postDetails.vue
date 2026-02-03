<template>
  <!--PostDetails-->
  <v-sheet class="d-block ma-3 pa-3">
    <!--info about post-->
    <v-card :loading="loading" class="pa-2 mb-4 d-block v-col-7">
      <span class="">{{ currentPost.title }}</span>
      <v-textarea
        class="mt-3"
        :readonly="true"
        v-model="currentPost.body"
      ></v-textarea>
      <v-divider class="mb-3" :opacity="75"></v-divider>
      <div>
        <v-chip color="green" v-for="item in currentPost.tags">
          {{ item }}
        </v-chip>
      </div>
    </v-card>
    <!--Author informmation-->
    <v-card :loading="loading" class="pa-2 mb-4 d-block v-col-3">
      <span>Об Авторе :</span>
      <v-divider class="mb-3" :opacity="75"></v-divider>
      <div class="mt-1 mb-1">
        <span>ФИО : {{ author?.firstName }} {{ author?.lastName }}</span>
        <br />
        <span>Должность : {{ author?.company.title }}</span>
        <br />
        <span>Отдел : {{ author?.company.department }}</span>
      </div>
    </v-card>
    <!--Comments-->
    <v-expansion-panels class="v-col-3 mb-4">
      <v-expansion-panel>
        <v-expansion-panel-title>Комментарии</v-expansion-panel-title>
        <v-expansion-panel-text class="pa-3 d-block">
          <!--Commms cards-->
          <v-card
            v-for="item in comms.comments"
            :loading="loading"
            class="pa-3 mt-3 bg-black"
          >
            <span>{{ item.user.username }}</span>
            <v-divider class="mb-3" :opacity="75"></v-divider>
            <span>{{ item.body }}</span>
            <v-divider class="mb-3 mt-3" :opacity="75"></v-divider>
            <span>
              <v-icon
                color="blue-lighten-2"
                icon="mdi-thumb-up"
                variant="text"
              ></v-icon>
              :{{ item.likes }}
            </span>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-btn @click="goBack"> <- Назад к списку </v-btn>
  </v-sheet>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPost, getComments, getUser } from "/servises/FuncsPostDetails.js";
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const author = ref(null);
const comms = ref(null);
const allPosts = ref(JSON.parse(localStorage.getItem("postsData")) || null);
const currentPost = ref(null);
//функция проверки локал стораджа
function checkStorage(arr) {
  if (!arr) {
    return false;
  }
  let currArr = null;
  arr.forEach((el) => {
    if (el.id == route.params.id) {
      currArr = el;
    }
  });

  return currArr ? [currArr, true] : false;
}

//При инициализации странички, подтягиваем всю необходимую информацию для отображения(в зависимости от того что в лежит в локал сторадже)
onBeforeMount(async () => {
  loading.value = true;
  //Проверка локал стораджа
  console.log(route.params.id);
  let check = checkStorage(allPosts.value.posts);
  //Подтягиваем [пост?] коменты и информацию об авторе
  if (check === false) {
    currentPost.value = await getPost(route.params.id);
  } else {
    currentPost.value = check[0];
  }
  //обновляем переменные
  author.value = await getUser(currentPost.value.userId);
  comms.value = await getComments(route.params.id);
  //обновляем переменные
  console.log(author.value.firstName);
  setTimeout((loading.value = false), 1500);
});

const goBack = () => {
  if (window.opener) {
    window.close();
  } else if (history.length <= 2) {
    router.replace({ name: "Home" });
  } else {
    router.go(-1);
  }
};
</script>
