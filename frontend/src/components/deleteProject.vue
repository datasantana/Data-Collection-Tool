<template>
  <v-dialog v-model="deleteDialog" width="300" persistent>
    <v-card class="mx-auto">
        <v-card-title>
          <h1 class="title">Borrar Proyecto</h1>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="overline">¿Esás seguro que quieres borrar este proyecto?</p>
          <p class="subtitle-2">Nombre: {{ toDelete.name }}</p>
          <p class="overline">ID: {{ toDelete.id }}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            class="white--text" 
            color="blue-grey darken-3"
            @click="switchDeleteDialogOff"
          >Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text" 
            color="grey darken-3"
            @click="switchDeleteDialogOff"
            @click.prevent="executeDelete(toDelete.id)"
          >Borrar</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"

export default {
  name: "delete-project",
  computed: {
    ...mapState(["deleteDialog", "toDelete"])
  },
  methods: {
    ...mapMutations(["switchDeleteDialogOff"]),
    ...mapActions(["getProjects"]),
    async executeDelete(idProject) {
      await this.$store
        .dispatch("deleteProject", idProject)
        .catch(err => (err)/*console.log(err)*/)
      await this.getProjects()
    }
  }
}
</script>