<template>
  <v-card width="70%" class="mx-auto mt-5">
    <v-img
      class="white--text align-end"
      height="300px"
      src="../assets/abstract.jpg"
    >
    </v-img>
    <v-card-subtitle>
      <h1 class="display-1">Guía de usuario</h1>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Creación de proyectos
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1"
                >Paso 1</v-stepper-step
              >
              <v-divider></v-divider>
              <v-stepper-step :editable="editable" :complete="e1 > 2" step="2"
                >Paso 2</v-stepper-step
              >
              <v-divider></v-divider>
              <v-stepper-step :editable="editable" step="3"
                >Paso 3</v-stepper-step
              >
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <p class="subtitle-2">Crear proyecto</p>
                <p class="overline">
                  Se requiere un proyecto para la gestión de formularios y
                  captura de datos.
                </p>
                <v-card color="grey lighten-1" class="mb-12" width="300">
                  <v-img src="../assets/create.gif" width="300"></v-img>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="2">
                <p class="subtitle-2">Asignar nombre y descripción</p>
                <p class="overline">
                  El nombre y la descripción permitiran identificar los
                  proyectos de captura.
                </p>

                <v-card color="grey lighten-1" class="mb-12" width="300">
                  <v-img src="../assets/namedesc.gif" width="300"></v-img>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="3">
                <p class="subtitle-2">Crear Formulario</p>
                <p class="overline">
                  Los formularios permiten la captura personalizada de datos en
                  campo. Es posible agregar tantos campos y definir el tipo de
                  dato, cómo sea requerido
                </p>
                <v-card color="grey lighten-1" class="mb-12" width="300">
                  <v-img src="../assets/forma.gif" width="300"></v-img>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Cargar proyecto a mapa
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
          <v-stepper>
            <v-stepper-items>
              <v-stepper-content step="1">
                <p class="subtitle-2">Cargar capa</p>
                <p class="overline">
                  Para iniciar el proceso de captura y navegación de los datos,
                  es necesario cargar el(los) proyecto(s) a la lista de capas
                </p>
                <v-card color="grey lighten-1" class="mb-12" width="300">
                  <v-img src="../assets/load.gif" width="300"></v-img>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Agregar puntos a proyecto
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :editable="editable" :complete="e1 > 1" step="1"
                >Paso 1</v-stepper-step
              >
              <v-divider></v-divider>
              <v-stepper-step :editable="editable" :complete="e1 > 2" step="2"
                >Paso 2</v-stepper-step
              >
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <p class="subtitle-2">Habilitar edición</p>
                <p class="overline">
                  Para iniciar la captura de datos, es necesario activar el
                  boton de nuevo punto.
                </p>
                <v-card color="grey lighten-1" class="mb-12" width="300">
                  <v-img src="../assets/addp.gif" width="300"></v-img>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="2">
                <p class="subtitle-2">Diligencia formulario correspondiente</p>
                <p class="overline">
                  Selcciona el formulario del proyecto a capturar y diligencia
                  los campos correspondientes. Este paso se repite por cada
                  punto nuevo en el mapa.
                </p>

                <v-card color="grey lighten-1" class="mb-12" width="300">
                  <v-img src="../assets/fillin.gif" width="300"></v-img>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Cargar capas WMS
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
          <v-stepper v-model="e1">
            <v-stepper-items>
              <v-stepper-content step="1">
                <p class="subtitle-2">Insertar ruta WMS</p>
                <p class="overline">
                  Diligencia los campos correspondientes apuntando al servidor
                  de mapas web (Geoserver)
                </p>
                <v-card color="grey lighten-1" class="mb-12" width="300">
                  <v-img src="../assets/addwms.gif" width="300"></v-img>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          Descargar Datos
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
          <v-stepper v-model="e1">
            <v-stepper-items>
              <v-stepper-content step="1">
                <p class="subtitle-2">Descarga de datos</p>
                <p class="overline">
                  Selecciona una capa previamete cargada y descárgala en formato
                  GeoJSON
                </p>
                <v-card color="grey lighten-1" class="mb-12" width="300">
                  <v-img src="../assets/download.gif" width="300"></v-img>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn to="/" class="white--text" color="#3e4e59"> Volver </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "about-card",
  data() {
    return {
      e1: 0,
      editable: true,
    };
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
    vertical() {
      this.e1 = 2;
      requestAnimationFrame(() => (this.e1 = 1)); // Workarounds
    },
  },
  methods: {
    onInput(val) {
      this.steps = parseInt(val);
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
  },
};
</script>

<style lang="scss">
</style>