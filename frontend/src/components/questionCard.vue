<template>
  <v-card width="70%" class="mx-auto mt-5">
    <v-img
      class="white--text align-end"
      height="300px"
      src="../assets/help.jpg">
    </v-img>
    <v-card-subtitle>
      <h1 class="display-1">Preguntas Frecuentes</h1>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Pregunta 1
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>Respuesta 1</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Pregunta 2
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>Respuesta 2</p>
        </v-expansion-panel-content>
      </v-expansion-panel><v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Pregunta 3
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>Respuesta 3</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Pregunta 4
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>Respuesta 4</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Pregunta 5
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>Respuesta 5</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Pregunta 6
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>Respuesta 6</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Pregunta ...n
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>Respuesta ..n</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn to="/" class="white--text" color="grey darken-3">
        Volver
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "question-card",
  data() {
    return {
      e1: 0
    }
  },
}
</script>