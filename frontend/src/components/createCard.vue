<template>
  <v-dialog
    v-model="dialog" width="80%"
    persistent
    >
    <template v-slot:activator="{ on }">   
      <v-card width="80%" class="mx-auto mt-5 mb-5">
        <v-card-title>
          <h1 class="display-1">Crear Proyecto</h1>
        </v-card-title>
        <v-divider></v-divider>
        <!--createProject-->
        <v-card-text>
          <p class="overline">Asigna un nombre y una descripción al nuevo proyecto</p>
          <v-form v-model="validForm">
            <v-text-field
              v-model="name"
              label="Nombre"
              :rules="[v=> !!v || 'Máximo 10 caractéres']"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="description"
              label="Descripción"
              :rules="[v => !!v || 'Descripción es Requerida']"
              required
            >
            </v-text-field>
          </v-form>
          <!--submit de formulario-->
          <v-card-actions>
            <v-btn
              class="white--text"
              color="blue-grey darken-3"
              to="/"
              >Regresar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="white--text"
              color="grey darken-3"
              :disabled="!validForm"
              @click="createProject"
              @click.prevent="clearFieldList"
              v-on="on"
              >Crear Proyecto
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </template>
    <v-card class="mx-auto" >
      <v-card-title>
        <h1 class="display-1">Crear Formulario</h1>
      </v-card-title>
      <v-divider></v-divider>
      <!--creacion campos formulario-->
      <v-card-text>
        <p class="overline">Agrega campos al formulario de tu nuevo proyecto. Define nombre y tipo de dato</p>
        <v-form v-model="validField">
          <v-row>
            <v-col cols="9" sm="3">
              <v-text-field
                v-model="label"
                label="Nombre Campo"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="9" sm="3">
              <v-select
                v-model="dataType"
                :items="fieldTypes"
                item-text="label"
                item-value="id"
                label="Tipo de Dato"
                return-object
                required
              ></v-select>
            </v-col>
            <v-col cols="9" sm="3">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    fab
                    x-small
                    dark
                    v-on="on"
                    :disabled="!validField"
                    @click.prevent="addField"
                    @click="resetForm"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Agregar campo</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-form>
        <!--tabla de formulario-->
        <v-divider></v-divider>
        <v-data-table
          v-slot:item.action="{ item }"
          :headers="headers"
          :items="fields"
          class="elevation-1"
          dense>
          <v-icon @click="removeField(item.id)" small >mdi-delete</v-icon>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn 
          class="white--text"
          color="blue-grey darken-3"
          to="/"
        >Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="white--text"
          color="grey darken-3"
          @click="createProject"
          :disabled="!validField"
          to="/"
        >Guardar</v-btn>
      </v-card-actions>
    </v-card>
 </v-dialog>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"
  export default {
    name: "create-card",
    data() {
      return {
        validForm: true,
        validField: true,
        dialog: false,
        name: "",
        tableName: "",
        description: "",
        label: "",
        columnName: "",
        dataType: {},
        headers: [
          {
            text: "Nombre de Campo",
            value: "label"
          },
          {
            text: "Tipo de Dato",
            value: "datatypeId"
          },
          {
            text: "Actions",
            value: "action",
            sortable: false
          }
        ]
      }
    },
    computed: {
      ...mapState(["fieldTypes", "body", "fields"]),
    },
    methods: {
      ...mapActions(["getFieldTypes", "getFields"]),
      ...mapMutations(["clearFieldList"]),
      createProject() {
        let name = this.name;
        let tableName = this.name.replace(/\s/g,'').toLowerCase();
        let description = this.description;
        this.$store
          .dispatch("createProject", {name, tableName, description})
          .catch(err => (err) /*console.log(err)*/)
      },
      async addField() {
        let label = this.label;
        let columnName = this.label.replace(/\s/g,'').toLowerCase();
        let datatypeId = this.dataType.id;
        //console.log('this.body es:');
        //console.log(this.body);
        const formId = this.body.id;
        //let fieldBody = { label, columnName, datatypeId, formId }
        //console.log(fieldBody)
        await this.$store
          .dispatch("addField", { label, columnName, datatypeId, formId })
          .catch(err => (err)/*console.log(err)*/)
        await this.$store
          .dispatch("getFields", this.body.id)
          .catch(err => (err)/*console.log(err)*/)
          
      },
      async removeField(item) {
        await this.$store
          .dispatch("deleteField", item)
          .catch(err => (err)/*console.log(err)*/)
        await this.$store
          .dispatch("getFields", this.body.id)
          .catch(err => (err)/*console.log(err)*/)
      },
       resetForm: function(e) {
            e.preventDefault()
            this.label = ""
            this.dataType = ""
        }
    },
    created() {
      this.getFieldTypes();
    },
  }
</script>