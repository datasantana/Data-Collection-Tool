<template>
  <v-dialog v-model="downloadDialod" width="300" persistent>
    <v-card class="mx-auto">
      <v-card-title>
          <h1 class="display-1">Descargar <br> Datos</h1>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="overline">Selecciona el proyecto que quieres descargar</p>
        <v-form>
          <v-select
            prepend-icon="mdi-database-export"
            v-model="toDownload"
            :items="selectedLayers"
            item-text="name"
            item-value="tableName"
            label="Layers"
            return-Object
          ></v-select>
        </v-form>
        <p class="overline">Descargarás un archivo GeoJson, el cual podrás usar fácilmente en <strong>QGIS</strong> y transformarlo a tu formato de preferencia (.SHP, GeoPackage o .csv)</p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          class="white--text" 
          color="blue-grey darken-3"
          @click="switchDownloadDialogOff"
        >Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="white--text" 
          color="grey darken-3"
          @click="switchDownloadDialogOff"
          @click.prevent="download"
        >Descargar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
    name: "download-data",
    data() {
      return {
        toDownload: {}
      }
    },
    computed: {
      ...mapState(["downloadDialod", "selectedLayers"])
    },
    methods: {
      ...mapMutations(["switchDownloadDialogOff"]),
      download() {
        let pkg = this.selectedLayers.find(object => {
          return object.tableName == this.toDownload
        })
        let features = {...pkg.features}
        //console.log(features)
        const url = window.URL.createObjectURL(new Blob([JSON.stringify(features)]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "file.geojson")
        document.body.appendChild(link)
        link.click()
      }
    }
}
</script>