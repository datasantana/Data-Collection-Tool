<template>
  <v-list>
    <!--menu de proyectos-->
    <v-list-group class="v-step-1" prepend-icon="mdi-folder" value="true">
      <template  v-slot:activator>
          <v-list-item-title >
          <strong>Proyectos</strong>
        </v-list-item-title>
      </template>
      <!--lista de proyectos-->
      <v-list-group  sub-group value="true" dense>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-subtitle >Proyectos Existentes</v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <v-list-item v-for="(p, index) in projects" :key="index" link dense>
          <v-list-item-content>
            <v-list-item-title class="overline">{{p.name}} </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-icon @click="switchDeleteDialogOn({name: p.name, id: p.id})" v-on="on">mdi-delete</v-icon>
              </template>
              <span>Borrar Proyecto</span>
            </v-tooltip>
          </v-list-item-action>
          <v-list-item-action>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-icon v-on:click="()=>loadProject(p.tableName)" v-on="on">mdi-layers</v-icon>
              </template>
              <span >Cargar Proyecto al Mapa </span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
      <!--creacion de proyectos-->
      <v-list-item id="v-step-2" link>
        <v-list-item-content >
          <v-list-item-title >
            <strong>Crear Proyecto</strong>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn fab x-small dark color="primary" to="/create">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" >mdi-plus </v-icon>
              </template>
              <span>Crear Nuevo Proyecto</span>
            </v-tooltip>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list-group>
    <v-divider></v-divider>
    <!--capas de mapa-->
    <v-list-group prepend-icon="mdi-map" value="true" dense>
      <template v-slot:activator>
        <v-list-item-title>
          <strong>Mapa</strong>
        </v-list-item-title>
      </template>
      <!--lista de capas-->
      <v-list-group no-action sub-group value="true" dense>
        <template v-slot:activator>
          <v-list-item-content >
            <v-list-item-subtitle>Capas</v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <v-list-item v-for="(layer, index) in selectedLayers" :key="index" link dense>
          <v-list-item-content>
            <v-list-item-title class="overline">{{layer.name}}</v-list-item-title>
          </v-list-item-content>
          <!--controles de capa-->
          <v-list-item-action>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-icon @click="removeProject(layer.tableName)" v-on="on">mdi-minus-circle</v-icon>
              </template>
              <span>Remover Capa</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
      <!--lista de capas externas-->
      <v-list-group no-action sub-group value="true" dense v-show="wmsName.length > 1">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-subtitle>Capa WMS</v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <v-list-item link dense>
          <v-list-item-content>
            <v-list-item-title class="overline">{{wmsName}}</v-list-item-title>
          </v-list-item-content>
          <!--controles de capa-->
          <v-list-item-action >
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-icon v-if="wmsVisible == false" v-on="on" @click.prevent="wmsSwhitchOn">mdi-eye-off</v-icon>
                <v-icon  v-else v-on="on" @click.prevent="wmsSwhitchOff">mdi-eye</v-icon>
              </template>
              <span>Mostrar/Ocultar</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
      <!--descarga de datos-->
      <template>
      <v-list-item id="v-step-4" link>
        <v-list-item-content >
          <v-list-item-title>
            <strong >Descargar Datos</strong>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action @click="switchDownloadDialogOn">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-arrow-down-circle</v-icon>
              </template>
              <span >Descargar Datos </span>
            </v-tooltip>
          </v-list-item-action>
      </v-list-item>
      <v-list-item id="v-step-5" link>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Agregar WMS</strong>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action
          @click="switchWmsDialogOn"
        >
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-earth</v-icon>
          </template>
          <span >Agregar WMS </span>
        </v-tooltip>
        </v-list-item-action>
      </v-list-item>
      </template>
    </v-list-group>
    
    <v-divider></v-divider>
  </v-list>
      
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "projects-menu",
  data(){
    return {
    }
  },
  computed: {
    ...mapState(["projects", "selectedLayers", "wmsName", "wmsVisible"])
  },
  methods: {
    ...mapMutations(["switchWmsDialogOn", "switchDownloadDialogOn", "switchDeleteDialogOn", "wmsSwhitchOn", "wmsSwhitchOff"]),
    ...mapActions(["getProjects"]),
    loadProject(tableName) {
      this.$store.dispatch("loadLayer", { tableName: tableName })
    },
    removeProject(tableName) {
      this.$store.commit("removeLayer", tableName)
    }
  },
  created() {
    this.getProjects();
  }
};
</script>
