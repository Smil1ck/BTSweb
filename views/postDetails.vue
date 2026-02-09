<template>
  <!--PostDetails-->
  <!--snackBars-->
  <v-sheet class="d-block ma-3 pa-3">
    <snack-bars
      v-model:snackbar-failue="snackbarFailue"
      v-model:snackbar-success="snackbarSuccess"
    ></snack-bars>
    <!--info about post-->
    <v-row justify="start" align="stretch">
      <v-col cols="12">
        <about-post
          v-model:body="currentPost.body"
          v-model:title="currentPost.title"
          v-model:tags="currentPost.tags"
          v-bind="{
            EditorMode: EditorMode,
            loading: loading,
          }"
        ></about-post>
      </v-col>
    </v-row>
    <!--Author informmation-->
    <v-row justify="start" align="stretch">
      <v-col cols="12">
        <div class="d-flex flex-column flex-lg-row flex-md-row">
          <v-col cols="12" sm="12" md="6" lg="6">
            <about-author
              v-bind="{
                loading: loading,
                firstName: author?.firstName,
                lastName: author?.lastName,
                job: author?.company.title,
                department: author?.company.department,
              }"
            ></about-author>
          </v-col>
          <v-col cols="12" sm="12" md="8" lg="8">
            <!--EditorMode buttons-->
            <div class="ml-1">
              <v-btn
                :width="300"
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
                  :width="150"
                  :loading="loading"
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
                  :width="150"
                  :loading="loading"
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
          </v-col>
        </div>
      </v-col>
    </v-row>
    <!--Comments-->
    <v-row justify="start" align="stretch">
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-expansion-panels class="mb-4">
          <comments-panel
            v-bind="{
              comments: comms?.comments,
              loading: loading,
            }"
          ></comments-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row justify="start" align="stretch">
      <v-col cols="12">
        <v-btn @click="goBack"> <- Назад к списку </v-btn>
      </v-col>
    </v-row>
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
import snackBars from "../ViewsComps/postDetails/snackBars.vue";
import aboutPost from "../ViewsComps/postDetails/aboutPost.vue";
import aboutAuthor from "../ViewsComps/postDetails/aboutAuthor.vue";
import commentsPanel from "../ViewsComps/postDetails/commentsPanel.vue";

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
    }, 500);
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
function enableEdit() {
  EditorMode.value = true;
}
function cancelEdit() {
  currentPost.value = JSON.parse(JSON.stringify(currentPostCopy.value));
  EditorMode.value = false;
}
const snackbarSuccess = ref(false);
const snackbarFailue = ref(false);
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
    setTimeout(() => {
      currentPostCopy.value = JSON.parse(JSON.stringify(currentPost.value));
      saveToStorage(currentPostCopy.value);
      EditorMode.value = false;
      snackbarSuccess.value = true;
      loading.value = false;
    }, 400);
  } else {
    setTimeout(() => {
      snackbarFailue.value = true;
      EditorMode.value = true;
      loading.value = false;
    }, 400);
  }
};
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
function saveToStorage(post) {
  allPosts.value.posts.map((el) => {
    if (post.id === el.id) {
      el = post;
    }
  });
  localStorage.setItem("postsData", JSON.stringify(allPosts.value));
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
