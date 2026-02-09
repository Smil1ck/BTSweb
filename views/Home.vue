<template>
  <v-card class="bg-grey-lighten-2 ma-4 pa-3 d-block" rounded>
    <!--карточка пользователя-->
    <v-row justify="start" align="stretch">
      <v-col cols="12" sm="4" md="3" lg="3">
        <user-card
          v-bind="{
            username: user,
            loading: loading,
          }"
        ></user-card>
      </v-col>
      <!--Параметры отображения постов-->
      <v-col cols="12" sm="8" md="9" lg="9">
        <v-card :loading="loadingPage" style="max-height: 400px">
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
              <div class="pt-2 ga-1 d-flex flex-column flex-lg-row flex-md-row">
                <v-select
                  :disabled
                  :min-width="100"
                  v-model="maxPosts"
                  label="Кол-во постов на странице"
                  :items="['10', '20', '50']"
                ></v-select>
                <!--Filters-->
                <div
                  class="d-flex flex-column flex-md-row flex-lg-row align-center mb-4 ga-3"
                >
                  <LikesAndDislikesFilter
                    v-model:dislikes-range="dislikesRange"
                    v-model:likes-range="likesRange"
                    :disabled
                  ></LikesAndDislikesFilter>
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
        <post-cards
          @click="openPostInNewTab(item.id)"
          v-bind="{
            title: item.title,
            userId: item.userId,
            body: item.body,
            likes: item.reactions.likes,
            dislikes: item.reactions.dislikes,
            loading: loadingPage,
          }"
        ></post-cards>
      </v-col>
    </v-row>
    <v-divider class="mt-3" :thickness="3"></v-divider>
    <!--выбор страницы -->
    <v-row justify="start" align="center">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-pagination
          :disabled
          :total-visible="$vuetify.display.mobile ? 3 : 5"
          v-model="page"
          rounded
          :length="pageLenght"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import { initPage, getNewPages } from "/servises/funcHome.js";
import { useRouter } from "vue-router";
import PostCards from "../ViewsComps/Home/postCards.vue";
import LikesAndDislikesFilter from "../ViewsComps/Home/LikesAndDislikesFilter.vue";
import userCard from "../ViewsComps/Home/userCard.vue";
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
</script>
