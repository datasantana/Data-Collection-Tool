<template>
  <v-container fluid id="v-step-0">
    <v-navigation-drawer width="300px" v-model="drawer" app>
      <v-list>
        <!--ficha de usuario logueado-->
        <v-list-item link>
          <v-list-item-action> </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <p class="title">Bienvenido</p>
              <p class="overline">
                {{ user.email.substring(0, user.email.indexOf("@")) }}
              </p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!--opciones de proyecto-->
        <projects-menu />
      </v-list>
    </v-navigation-drawer>
    <!--encabezado del aplicativo-->
    <v-app-bar app color="#3e4e59" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <h4 class="subtitle-2">Captura de datos del mercado inmobiliario</h4>
      <v-spacer></v-spacer>
      <v-menu left>
        <template v-slot:activator="{ on }">
          <v-btn id="v-step-6" class="overline" icon v-on="on"
            >Ayuda<v-icon size="14">mdi-help-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/about">
            <v-list-item-title class="overline"
              >Guía de usuario</v-list-item-title
            >
          </v-list-item>
          <v-list-item to="/question">
            <v-list-item-title class="overline"
              >Preguntas Frecuentes</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="$tours['vueTour'].start()">
            <v-list-item-title class="overline">Navegación</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title class="overline"
              >Cerrar Sesión</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!--Componente vuetour-->
    <vue-tour />
    <!--contenedor del aplicativo-->
    <v-content>
      <map-card />
      <table-card />
      <add-feature-card />
      <add-wms-card />
      <download-data />
      <delete-project />
      <alert />
    </v-content>
    <!--pie de pagina del aplicativo-->
    <v-footer color="#3e4e59" app>
      <img src="../assets/Logo_y_Eslogan.png" alt="" />
    </v-footer>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import mapCard from "@/components/mapCard.vue";
import tableCard from "@/components/tableCard.vue";
import projectsMenu from "@/components/projectsMenu.vue";
import addFeatureCard from "@/components/addFeatureCard.vue";
import addWmsCard from "@/components/addWmsCard.vue";
import downloadData from "@/components/downloadData.vue";
import deleteProject from "@/components/deleteProject.vue";
import alert from "@/components/alert.vue";
import vueTour from "@/components/vueTour.vue";

export default {
  name: "home",
  components: {
    vueTour,
    mapCard,
    tableCard,
    projectsMenu,
    addFeatureCard,
    addWmsCard,
    downloadData,
    deleteProject,
    alert,
  },
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    ...mapState(["user"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

