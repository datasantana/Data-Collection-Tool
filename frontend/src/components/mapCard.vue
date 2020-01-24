<template>
  <v-card width="99%" class="mx-auto mt-2">
    <!--cargar mapa-->
    <vl-map 
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 500px"
    >
      <vl-view
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation="rotation"
      >
      </vl-view>
      <!--agregar punto boton-->
      <v-fab-transition>
        <v-btn
          v-if="editMode == 0"
          color="blue darken-3"
          fab
          dark
          x-small
          absolute
          bottom
          left
          @click="editMode = 1"
        >
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon id="v-step-3" v-on="on">mdi-map-marker</v-icon>
          </template>
          <span>Agregar Punto</span>
        </v-tooltip>
        </v-btn>
        <v-btn
          v-else
          color="red darken-5"
          fab
          dark
          small
          absolute
          bottom
          left
          @click="editMode = 0"
        >
          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </v-fab-transition>
      <!--popup-->
      <vl-interaction-select :features.sync="selectedFeatures" v-if="drawType == null">
        <template>
          <vl-overlay
            class="feature-popup"
            v-for="(f, index) in selectedFeatures"
            :key="index"
            :id="f.id"
            :position="pointOnSurface(f.geometry)"
            :auto-pan="true"
            :auto-pan-animation="{ duration: 300 }"
          >
            <template slot-scope="popup">
              <v-card width="250" max-height="300">
                <v-card-title class="p-0">
                  <h1 class="overline"><strong>Punto: </strong>{{ f.id }}</h1>
                  <h1 class="overline"><strong>Coordenadas: </strong>{{ popup.position.toString() }}</h1>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text v-scroll:#scroll-target="onScroll">
                  <v-container
                    v-if="f.properties != null"
                    id="scroll-target"
                    style="max-height: 100px"
                    class="overflow-y-auto"
                  >
                    <p 
                      v-for="(prop, index) in f.properties" 
                      :key="index"
                      class="overline p-0"
                    ><strong>{{index}}: </strong> {{ prop }}</p>
                  </v-container>
                  <v-container v-else>
                    <p
                      class="overline"
                    ><strong>Este es un punto nuevo!</strong> <br> Agrega propiedades con el botón +</p>
                  </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="p-0">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon  
                        fab large dark color="blue-grey darken-3"
                        v-on="on"
                        @click="switchDialogOn(selectedFeatures)"
                      >
                      mdi-plus-circle</v-icon>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            </template>
          </vl-overlay>
        </template>
      </vl-interaction-select>
      <!--obtener geolocalizacion de usuario-->
      <vl-geoloc>
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
            <vl-style-box>
              <vl-style-circle :radius="8">
                <vl-style-fill color="blue"></vl-style-fill>
                <vl-style-stroke color="white"></vl-style-stroke>
              </vl-style-circle>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>
      <!--capas base-->
      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
      <!--capa wms-->
      <vl-layer-tile id="wms" v-if="wmsVisible == true">
        <vl-source-wms
          :attributions="wmsAttributions"
          :url="wmsUrl"
          :layers="wmsLayer"
          :layer-name="wmsName"
          :matrix="matrixSet"
          :fromat="format"
          :style-name="styleName"
        ></vl-source-wms>
      </vl-layer-tile>
      <!--capas de usuario-->
      <vl-layer-vector v-for="(layer, index) in selectedLayers" :key="index">
        <vl-source-vector :features.sync="layer.features"></vl-source-vector>
        <vl-style-box>
          <vl-style-circle :radius="3">
            <vl-style-fill color="#FF5733"></vl-style-fill>
            <vl-style-stroke color="#8D1F07"></vl-style-stroke>
          </vl-style-circle>
        </vl-style-box>
      </vl-layer-vector>
      <!--dibujar puntos-->
      <vl-layer-vector id="draw-pane">
        <vl-source-vector
          ident="draw-target"
          :features.sync="drawnFeatures"
        ></vl-source-vector>
      </vl-layer-vector>
      <vl-interaction-draw 
        v-if="editMode == 1" 
        source="draw-target" 
        type="point"
      ></vl-interaction-draw>
    </vl-map>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import { findPointOnSurface } from "vuelayers/lib/ol-ext"

export default {
  name: "map-card",
  data () {
    return {
      zoom: 12,
      center: [-74.10211342434744, 4.639915543569856],
      rotation: 0,
      geolocPosition: undefined,
      offsetTop: 0,
      selectedFeatures: [],
      drawType: undefined,
      editMode: 0,
      drawnFeatures: [],
      url: this.wmsUrl,
      layer: this.wmsLayer,
      name: this.wmsName,
      attribution: this.wmsAttribution,
      matrixSet: "EPSG:4326",
      format: "image/png",
      styleName: "default"
    }
  },
  methods: {
    pointOnSurface: findPointOnSurface, onUpdatePosition (coordinate) {
      this.deviceCoordinate = coordinate
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    captFeature(f) {
      this.$emit('insert:feature', f)
    },
    ...mapMutations(["switchDialogOn"])
  },
  computed: {
    ...mapState(["selectedLayers", "editableLayer", "formObject", "wmsVisible", "wmsUrl", "wmsLayer", "wmsName", "wmsAttributions"])
  },
  mounted() {
    this.wmsUrl
  }
}
</script>

<style>
  #create .v-btn--floating {
    position: relative;
  }
</style>