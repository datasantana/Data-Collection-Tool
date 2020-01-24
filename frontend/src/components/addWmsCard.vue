<template>
  <v-dialog v-model="wmsDialog" width="300" scrollable persistent>
    <v-card class="mx-auto">
      <v-card-title>
        <h1 class="display-1">Agregar WMS</h1>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="overline">Para agregar capas externas, <br> incluye los siguentes datos</p>
        <v-form>
          <v-text-field
            prepend-icon="mdi-cast-connected"
            label="URL"
            v-model="iUrl"
          ></v-text-field>
          <p class="overline">Enlace http del servicio de mapas web</p>
          <v-text-field
            prepend-icon="mdi-layers"
            label="Capa"
            v-model="iLayer"
          ></v-text-field>
          <p class="overline">Capa específica dentro del servicio de mapas web</p>
          <v-text-field
            prepend-icon="mdi-identifier"
            label="Nombre de la Capa"
            v-model="iName"
          ></v-text-field>
          <p class="overline">Asigna un nombre a la capa</p>
          <v-text-field
            prepend-icon="mdi-source-branch"
            label="Fuente de la Capa"
            v-model="iAttribution"
          ></v-text-field>
          <p class="overline">Proveedor del servicio de mapas web</p>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              class="white--text" 
              color="blue-grey darken-3"
              @click="switchWmsDialogOff"
            >Cancelar</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="white--text" 
              color="grey darken-3"
              @click="switchWmsDialogOff"
              @click.prevent="addWMS"
              to="/"
            >Agregar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
  name: "add-wms-card",
  data() {
    return {
      iUrl: "",
      iLayer: "",
      iName: "",
      iAttribution: ""
    }
  },
  computed: {
    ...mapState(["wmsDialog"])
  },
  methods: {
    ...mapMutations(["switchWmsDialogOff"]),
    addWMS() {
      let url = this.iUrl
      let layer = this.iLayer
      let name = this.iName
      let attr = this.iAttribution
      this.$store
        .dispatch("addWMS", {url, layer, name, attr})
        .catch(err => (err))
    }
  }
}
</script>
