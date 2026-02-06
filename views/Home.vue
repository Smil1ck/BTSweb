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
                :disabled
                v-model="searchForm"
                prepend-icon="mdi-magnify"
                variant="outlined"
                clearable
              ></v-text-field>
              <v-divider :thickness="3"></v-divider>
              <!--Параметры страницы и фильтры-->
              <div class="d-flex">
                <v-select
                  :disabled
                  v-model="maxPosts"
                  class="v-col-6"
                  label="Кол-во постов на странице"
                  :items="['10', '20', '50']"
                ></v-select>
                <!--Filters-->
                <div class="d-flex v-col-6 align-center mb-4 ga-3">
                  <!--Likes-->
                  <v-menu open-on-hover :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        :disabled
                        color="primary"
                        rounded="xl"
                        v-bind="props"
                      >
                        Likes Filter
                      </v-btn>
                    </template>
                    <v-sheet
                      class="d-inline-flex pa-3 align-center ga-2 justify-center"
                    >
                      <v-text-field
                        :width="200"
                        label="от"
                        v-model="likesRange[0]"
                        variant="outlined"
                        placeholder="от"
                        rounded="xl"
                        type="number"
                        :min="0"
                        :max="likesRange[1]"
                      ></v-text-field>
                      <v-text-field
                        label="до"
                        v-model="likesRange[1]"
                        variant="outlined"
                        placeholder="до"
                        rounded="xl"
                        type="number"
                        :min="likesRange[0]"
                      ></v-text-field>
                    </v-sheet>
                  </v-menu>
                  <!--DisLikes-->
                  <v-menu open-on-hover :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        :disabled
                        color="primary"
                        rounded="xl"
                        v-bind="props"
                      >
                        DisLikes Filter
                      </v-btn>
                    </template>
                    <v-sheet
                      class="d-inline-flex pa-3 align-center ga-2 justify-center"
                    >
                      <v-text-field
                        label="от"
                        :width="200"
                        v-model="dislikesRange[0]"
                        variant="outlined"
                        placeholder="от"
                        rounded="xl"
                        type="number"
                        :min="0"
                        :max="dislikesRange[1]"
                      ></v-text-field>
                      <v-text-field
                        label="до"
                        v-model="dislikesRange[1]"
                        variant="outlined"
                        placeholder="до"
                        rounded="xl"
                        type="number"
                        :min="dislikesRange[0]"
                      ></v-text-field>
                    </v-sheet>
                  </v-menu>
                  <!--Button Clear Filters-->
                  <v-btn
                    :disabled
                    rounded="xl"
                    color="red"
                    @click="clearFilters"
                  >
                    Clear Filters
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="mt-3" :thickness="3"></v-divider>
    <!--карточки  постов -->
    <v-row justify="start" align="stretch">
      <v-col v-for="item in filteredPosts" cols="12" sm="6" md="6" lg="6">
        <v-card
          @click="openPostInNewTab(item.id)"
          :loading="loadingPage"
          class="pa-2"
        >
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
import { ref, computed, onMounted, watch, onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import { initPage, getNewPages } from "/servises/funcHome.js";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();

//Open card in a new Tab
const openPostInNewTab = (postId) => {
  const route = router.resolve({
    name: "postDetails",
    params: { id: postId },
  });
  window.open(route.href, "_blank");
};
//variables and funcs for filters------------------------------------

const likesRange = ref([0, 0]);
const dislikesRange = ref([0, 0]);

function clearFilters() {
  likesRange.value = [0, 0];
  dislikesRange.value = [0, 0];
}

function activeFilter(num) {
  return !num || num === "0" ? false : true;
}
//variables------------------------------------------------------------------------
const loading = computed(() => {
  return userStore.isLoading;
});

//Обновление имени пользователя------------------------------------------------------------------------
const user = computed(() => {
  return userStore.getUserName;
});
//funcs------------------------------------------------------------------------
const logout = () => {
  userStore.logout();
};

//Работа с постами------------------------------------------------------------------------
const page = ref(1);
const maxPosts = ref(10);
const posts = ref(JSON.parse(localStorage.getItem("postsData")));
const loadingPage = ref(false);
const disabled = ref(false);
const pageLenght = ref(4);
//для поиска------------------------------------------------------------------------
const searchForm = ref("");
const debouncedSearch = ref("");
let timeoutId = null;
const filteredPosts = computed(() => {
  //Часть с поиском
  if (
    !debouncedSearch.value &&
    !activeFilter(likesRange.value[1]) &&
    !activeFilter(dislikesRange.value[1])
  ) {
    return posts.value.posts;
  }

  const check = debouncedSearch.value.toLowerCase().trim();
  let result = posts.value.posts.filter((post) => {
    return (
      post.title?.toLowerCase().includes(check) ||
      post.body?.toLowerCase().includes(check) ||
      String(post.userId).includes(check)
    );
  });
  //Часть с фильтрами
  //likes
  if (activeFilter(likesRange.value[1])) {
    result = result.filter((post) => {
      return (
        post.reactions.likes >= likesRange.value[0] &&
        post.reactions.likes <= likesRange.value[1]
      );
    });
  }
  //dislikes
  if (activeFilter(dislikesRange.value[1])) {
    result = result.filter((post) => {
      return (
        post.reactions.dislikes >= dislikesRange.value[0] &&
        post.reactions.dislikes <= dislikesRange.value[1]
      );
    });
  }
  return result;
});
//Начальная загрузка------------------------------------------------------------------------
onBeforeMount(async () => {
  loadingPage.value = true;
  await initPage(page.value, maxPosts.value);
  posts.value = JSON.parse(localStorage.getItem("postsData"));
  pageLenght.value = Math.ceil(posts.value.total / maxPosts.value);
  console.log(posts.value);
  setTimeout((loadingPage.value = false), 1500);
});

//при любом изменении поля страницы или кол-во постов обновление локал стораджа и самих постов + пагинация------------------------------------
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
//debounce для поиска------------------------------------------------------------------------
watch(searchForm, (newValue) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    debouncedSearch.value = newValue;
  }, 300);
});

//вспомогательные функции------------------------------------------------------------------------
const fixedString = (str) => {
  return str?.length > 100 ? str.slice(0, 100) + "..." : str;
};
</script>
