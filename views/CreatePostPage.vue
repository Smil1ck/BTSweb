<template>
  <!--snackBars-->
  <v-sheet class="d-flex ma-3 pa-3 v-col-12 align-center justify-center">
    <!--snackBars-->
    <v-card class="pa-2 v-col-6 bg-black">
      <v-snackbar
        :timeout="3000"
        class="elevation-24"
        location="top"
        color="green"
        v-model="success"
      >
        Успешно сохранено.
      </v-snackbar>
      <v-snackbar
        :timeout="3000"
        class="elevation-24"
        location="top"
        color="red"
        v-model="failue"
      >
        Ошибка сохранения.
      </v-snackbar>
      <v-form v-model="formValid" @submit.prevent="submitForm">
        <!--Header-->
        <v-card class="pa-2 mb-3 v-col-12">
          <h1 class="text-h2">Создание нового поста</h1>
        </v-card>
        <!--info about post-->
        <v-card class="pa-2 mb-4 d-block">
          <v-text-field
            variant="outlined"
            placeholder="title"
            v-model="title"
            :rules="textRulesTitle"
          >
          </v-text-field>
          <v-divider class="mb-3" :opacity="75"></v-divider>
          <v-textarea
            class="mt-3"
            placeholder="body"
            v-model="body"
            :rules="textRulesBody"
          ></v-textarea>
          <v-divider class="mb-3" :opacity="75"></v-divider>
          <div>
            <v-chip
              close-icon="mdi-delete"
              color="green"
              :closable="true"
              @click:close="removeTag(item)"
              v-for="item in tagList"
            >
              {{ item }}
            </v-chip>
          </div>
        </v-card>
        <!--Tags addition area-->
        <v-card class="pa-2 d-block mb-3">
          <h1 class="text-h5">Добавление хештегов</h1>
          <v-textarea
            class="mt-3"
            placeholder="#hashtag"
            v-model="tagsfield"
          ></v-textarea>
          <!--submit-->
          <div class="d-flex justify-end ga-2">
            <v-btn
              class="text-none pa-1 text-subtitle-1 v-col-2"
              color="green"
              size="small"
              variant="flat"
              rounded="xl"
              @click="addTags"
            >
              Добавить
            </v-btn>
            <v-btn
              rounded="xl"
              class="text-none pa-1 text-subtitle-1 v-col-2"
              color="red"
              size="small"
              variant="flat"
              @click="cancelTags"
            >
              Отмена
            </v-btn>
          </div>
        </v-card>
        <!--Submit buttons-->
        <div class="d-flex ga-3 justify-center">
          <v-btn
            :loading="loading"
            :disabled="!formValid"
            class="text-none pa-1 text-subtitle-1 v-col-5"
            color="green"
            size="small"
            variant="flat"
            rounded="xl"
            @click="submitForm"
          >
            Создать пост
          </v-btn>
          <v-btn
            :loading="loading"
            rounded="xl"
            class="text-none pa-1 text-subtitle-1 v-col-5"
            color="red"
            size="small"
            variant="flat"
            @click="canselEdits"
          >
            Отменить изменения
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>
<script setup>
import { ref, computed } from "vue";
import { addPost } from "/servises/funcsNewPost";
//main variables---------------------------------------
const loading = ref(false);
const title = ref("");
const body = ref("");
const tagList = ref(null);
const tagsfield = ref("");
const formValid = ref(false);
//----------------------------------------------------
const success = ref(false);
const failue = ref(false);

//правила для полей------------------------------------
const textRulesTitle = [
  required,
  (v) =>
    (v.length >= 5 && v.length <= 80) ||
    "Название должно быть в диапазоне 5-80 символов",
];
const textRulesBody = [required];
function required(v) {
  return !!v || "Field is required";
}
//------------------------------------------------------
//addPost canselEditions
const submitForm = async () => {
  if (!formValid) {
    return;
  }
  loading.value = true;
  let data = {};
  if (tagList.value) {
    data.title = title.value;
    data.body = body.value;
    data.tags = tagList.value;
    //если бы мы хранили юзер айди
    data.userId = 5;
  } else {
    data.title = title.value;
    data.body = body.value;
    data.userId = 5;
  }
  let response = await addPost(data);
  if (response[0] === true) {
    setTimeout(() => {
      canselEdits();
      success.value = true;
      loading.value = false;
    }, 500);
  } else {
    setTimeout(() => {
      failue.value = true;
      loading.value = false;
    }, 500);
  }
};
function canselEdits() {
  title.value = "";
  tagList.value = [];
  body.value = "";
}
// Обработка поля для тегов-----------------------------------------------------------
function addTags() {
  if (!tagList.value || tagList.value.length === 0) {
    tagList.value = tagsfield.value.split("#").filter((item) => item !== "");
    tagsfield.value = "";
  } else {
    let bufList = tagsfield.value.split("#").filter((item) => item !== "");
    tagList.value = [...new Set([...tagList.value, ...bufList])];
    tagsfield.value = "";
  }
}
function cancelTags() {
  tagsfield.value = "";
}
function removeTag(item) {
  tagList.value = tagList.value.filter((tag) => tag !== item);
}
//--------------------------------------------------------------------------------------
</script>
