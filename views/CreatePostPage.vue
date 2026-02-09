<template>
  <!--snackBars-->
  <v-sheet class="d-flex ma-3 pa-3 v-col-12 align-center justify-center">
    <!--snackBars-->
    <v-card class="pa-2 v-col-6 bg-black">
      <snack-bars
        v-model:snackbar-success="success"
        v-model:snackbar-failue="failue"
      ></snack-bars>

      <v-form v-model="formValid" @submit.prevent="submitForm">
        <!--Header-->
        <new-form
          v-model:body="body"
          v-model:tag-list="tagList"
          v-model:title="title"
        ></new-form>

        <!--Tags addition area-->
        <chip-add-area
          v-model:tagsfield="tagsfield"
          v-model:tag-list="tagList"
        ></chip-add-area>

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
import { ref } from "vue";
import { addPost } from "/servises/funcsNewPost";
import snackBars from "../ViewsComps/postDetails/snackBars.vue";
import newForm from "../ViewsComps/CreatePostPage/newForm.vue";
import chipAddArea from "../ViewsComps/CreatePostPage/chipAddArea.vue";
//main variables---------------------------------------
const loading = ref(false);
const title = ref("");
const body = ref("");
const tagList = ref([]);
const tagsfield = ref("");
const formValid = ref(false);
//----------------------------------------------------
const success = ref(false);
const failue = ref(false);

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
  tagsfield.value = "";
}

//--------------------------------------------------------------------------------------
</script>
