<template>
  <v-dialog v-model="dialog" width="300" scrollable persistent>
    <v-card class="mx-auto" height="350">
      <v-card-title>
        <v-select
          v-model="editableProject"
          :items="selectedLayers"
          item-text="name"
          item-value="id"
          label="Selecciona Proyecto"
          prepend-icon="mdi-book"
          @change="layerFields(editableProject), clearFormBody()"
        >
        </v-select>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="overline">Diligencia el formulario seleccionado</p>
        <v-form>
          <v-text-field
            v-model="formBody[field.columnName]"
            v-for="field in formFeatures.fields"
            :key="field.id"
            :label="field.label"
            :rules="[rules.required]"
          ></v-text-field>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn 
              class="white--text" 
              color="blue-grey darken-3" 
              @click="switchDialogOff"
            >Cancelar</v-btn>
            <v-spacer></v-spacer>
            <v-btn 
              class="white--text" 
              color="grey darken-3"
              @click="insertFeature(), switchDialogOff()"
            >Guardar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"

export default {
  name: "add-feature-card",
  data() {
    return {
      rules: {
        required: value => !!value || "Campo requerido",
      },
      editableProject: 0,
      formBody: {}
    };
  },
  computed: {
    ...mapState(["dialog", "selectedLayers", "fields", "formFeatures", "formObject"])
  },
  methods: {
    ...mapMutations(["switchDialogOff", "layerFields"]),
    ...mapActions(["loadLayer"]),
    getForm() {
      const selectedProject = this.selectedLayers.find(
        thisProject => thisProject.name === this.selectedLayers.name
      );
      this.form = selectedProject
    },
    clearFormBody() {
      this.formBody = {}
    },
    async insertFeature() {
      let tableName = this.formFeatures.tableName
      let point = this.formObject.map(geom=> {
        return {geometry: geom.coordinates.toString()}
      }).reduce((obj) => {
        return {
          ...obj
        }
      })
      let fullForm = this.formBody
      //let bodyFeature = {tableName: tableName, ...fullForm, ...point}
      //console.log(bodyFeature)
      await this.$store
        .dispatch("insertFeature", {tableName: tableName, ...fullForm, ...point})
      await this.$store
        .dispatch("loadLayer", { tableName: tableName })
        .catch(err => err);
    }
  }
};
</script>