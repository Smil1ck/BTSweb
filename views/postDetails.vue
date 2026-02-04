<template>
  <!--PostDetails-->
  <v-sheet class="d-block ma-3 pa-3">
    <!--info about post-->
    <v-card
      :class="{ 'bg-indigo-darken-1': EditorMode }"
      :loading="loading"
      class="pa-2 mb-4 d-block v-col-7"
    >
      <v-text-field
        :rules="textRules"
        variant="plain"
        :readonly="!EditorMode"
        v-model="currentPost.title"
      >
      </v-text-field>
      <v-divider class="mb-3" :opacity="75"></v-divider>
      <v-textarea
        :rules="textRules"
        class="mt-3"
        :readonly="!EditorMode"
        v-model="currentPost.body"
      >
        ></v-textarea
      >
      <v-divider class="mb-3" :opacity="75"></v-divider>
      <div>
        <v-chip
          :closable="EditorMode"
          close-icon="mdi-delete"
          color="green"
          @click:close="removeTag(item)"
          v-for="item in currentPost.tags"
        >
          {{ item }}
        </v-chip>
      </div>
    </v-card>
    <!--Author informmation-->
    <div class="d-flex">
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
      <!--EditorMode buttons-->
      <div class="ml-3">
        <v-btn
          v-if="!EditorMode"
          class="text-none text-subtitle-1"
          color="#5865f2"
          size="small"
          variant="flat"
          @click="enableEdit"
        >
          Режим редактирования
        </v-btn>
        <div v-else class="d-flex ga-3">
          <v-btn
            class="text-none text-subtitle-1"
            color="green"
            size="small"
            variant="flat"
            :disabled="!canBeSaved"
            @click="saveChanges"
          >
            Сохранить
          </v-btn>
          <v-btn
            class="text-none text-subtitle-1"
            color="red"
            size="small"
            variant="flat"
            @click="cancelEdit"
          >
            Отмена
          </v-btn>
        </div>
      </div>
    </div>
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
import { ref, computed, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getPost,
  getComments,
  getUser,
  updatePost,
} from "/servises/FuncsPostDetails.js";
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const author = ref(null);
const comms = ref(null);
const allPosts = ref(JSON.parse(localStorage.getItem("postsData")) || null);
const currentPost = ref(null);

//для редактирования---------------------------------------------------------------------

const currentPostCopy = ref(null);
const EditorMode = ref(false);

let timeoutId = null;
const changedFields = ref(null);
const canBeSaved = computed(() => {
  if (
    changedFields.value.title ||
    changedFields.value.body ||
    changedFields.value.tags
  ) {
    return true;
  } else {
    return false;
  }
});
//вотчер для дебаунса проверок на изменение полей, чтобы не начинать проверку  при любом изменении
watch(
  currentPost,
  (newValue) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      changedFields.value = isAnyDifference(newValue);
    }, 300);
  },
  { deep: true },
);

function isAnyDifference(post) {
  let check = {
    title: false,
    body: false,
    tags: false,
  };

  if (post.body !== currentPostCopy.value.body) {
    check.body = true;
  }
  if (post.title !== currentPostCopy.value.title) {
    check.title = true;
  }
  if (
    JSON.stringify(post.tags) !== JSON.stringify(currentPostCopy.value.tags)
  ) {
    check.tags = true;
  }
  console.log(check);
  return check;
}
//---------------------------------------------------------------------------------------------
function removeTag(item) {
  currentPost.value.tags = currentPost.value.tags.filter((tag) => tag !== item);
}
function enableEdit() {
  EditorMode.value = true;
}
function cancelEdit() {
  EditorMode.value = false;
}
const saveChanges = async () => {
  //сохрфнение измений, при успехе вывод сообщения и выход из режима редактирования с обновлением локал стораджа
  //в случае неудачи - уведомление об ошибке и продолженеие работы в режиме редактирования
  loading.value = true;
  let changes = {};
  if (changedFields.value.title) {
    changes.title = currentPost.value.title;
  }
  if (changedFields.value.body) {
    changes.body = currentPost.value.body;
  }
  if (changedFields.value.tags) {
    changes.tags = currentPost.value.tags;
  }
  console.log(changes);
  changes = JSON.stringify(changes);
  let response = await updatePost(changes, route.params.id);
  console.log(response[0]);
  if (response[0] === true) {
    EditorMode.value = false;
  } else {
    EditorMode.value = true;
  }
  loading.value = false;
};
//правила для полей
const textRules = [required, (v) => v.length >= 5 || "Минимум 5 символов"];
function required(v) {
  return !!v || "Field is required";
}
//для редактирования---------------------------------------------------------------------
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
  //глубокое копирование(будет использоваться в режиме редактирования )
  currentPostCopy.value = JSON.parse(JSON.stringify(currentPost.value));
  //обновляем переменные
  author.value = await getUser(currentPost.value.userId);
  comms.value = await getComments(route.params.id);
  //обновляем переменные
  console.log(currentPostCopy.value);
  setTimeout((loading.value = false), 1500);
});

//Кнопка возврата
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
