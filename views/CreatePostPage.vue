<template>
  <!--snackBars-->
  <v-sheet class="d-block ma-3 pa-3 v-col-12">
    <!--snackBars-->
    <v-snackbar
      :timeout="3000"
      class="elevation-24"
      location="top"
      color="green"
    >
      Успешно сохранено.
    </v-snackbar>
    <v-snackbar :timeout="3000" class="elevation-24" location="top" color="red">
      Ошибка сохранения.
    </v-snackbar>
    <!--Header-->
    <v-card class="pa-2 mb-3 v-col-12">
      <h1 class="text-h2">Создание нового поста</h1>
    </v-card>
    <!--info about post-->
    <v-card class="pa-2 mb-4 d-block">
      <v-text-field variant="outlined"> </v-text-field>
      <v-divider class="mb-3" :opacity="75"></v-divider>
      <v-textarea class="mt-3"> ></v-textarea>
      <v-divider class="mb-3" :opacity="75"></v-divider>
      <div>
        <v-chip v-if="false" close-icon="mdi-delete" color="green"> </v-chip>
      </div>
    </v-card>
    <!--Tags addition area-->
    <v-card class="pa-2 d-block mb-3">
      <h1 class="text-h5">Хештеги</h1>
      <v-textarea class="mt-3"></v-textarea>
      <!--submit-->
      <div class="d-flex justify-end">
        <v-btn
          class="text-none pa-1 text-subtitle-1 v-col-1"
          color="green"
          size="small"
          variant="flat"
          rounded="xl"
        >
          Добавить
        </v-btn>
        <v-btn
          rounded="xl"
          class="text-none pa-1 text-subtitle-1 v-col-1"
          color="red"
          size="small"
          variant="flat"
        >
          Отмена
        </v-btn>
      </div>
    </v-card>
    <!--Submit buttons-->
    <div class="d-flex ga-3">
      <v-btn
        class="text-none pa-1 text-subtitle-1 v-col-1"
        color="green"
        size="small"
        variant="flat"
        rounded="xl"
      >
        Сохранить
      </v-btn>
      <v-btn
        rounded="xl"
        class="text-none pa-1 text-subtitle-1 v-col-1"
        color="red"
        size="small"
        variant="flat"
      >
        Отмена
      </v-btn>
    </div>
  </v-sheet>
</template>
