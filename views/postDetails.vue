<template>
  <!--PostDetails-->
  <v-sheet class="d-block ma-3 pa-3">
    <!--info about post-->
    <v-card class="pa-2 mb-4 d-block v-col-7">
      <span class="">Заголовок</span>
      <v-textarea class="mt-3">body</v-textarea>
      <v-divider class="mb-3" :opacity="75"></v-divider>
      <v-chip color="green"> Chip </v-chip>
    </v-card>
    <!--Author informmation-->
    <v-card class="pa-2 mb-4 d-block v-col-3">
      <span>Об Авторе :</span>
      <v-divider class="mb-3" :opacity="75"></v-divider>
      <div class="mt-1 mb-1">
        <span>ФИО :</span>
        <br />
        <span>Должность :</span>
        <br />
        <span>Отдел :</span>
      </div>
    </v-card>
    <!--Comments-->
    <v-expansion-panels class="v-col-3 mb-4">
      <v-expansion-panel>
        <v-expansion-panel-title>Комментарии</v-expansion-panel-title>
        <v-expansion-panel-text class="pa-3 d-block">
          <!--Commms cards-->
          <v-card class="pa-3">
            <span>Имя полььзователя</span>
            <v-divider class="mb-3" :opacity="75"></v-divider>
            <span>body</span>
            <v-divider class="mb-3 mt-3" :opacity="75"></v-divider>
            <span>
              <v-icon
                color="blue-lighten-2"
                icon="mdi-thumb-up"
                variant="text"
              ></v-icon>
              :Numm
            </span>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-btn> <- Назад к списку </v-btn>
  </v-sheet>
</template>
