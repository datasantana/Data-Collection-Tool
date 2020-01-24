<template>
  <v-card width="99%" class="mx-auto mt-5">
    <v-divider></v-divider>
    <v-tabs  v-model="tab">
      <v-tab v-for="(layer, index) in selectedLayers" :key="index" >{{layer.name}}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(layer, index) in selectedLayers" :key="index">
        <v-data-table
          :headers="layer.fields.map(field => {return {text: field.label, value: field.columnName}})"
          :items="layer.features.map(features => {return features.properties})"
          :items-per-page="5"
          class="elevation-1"
          dense
        >
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "table-card",
  data () {
    return {
      tab: null,
    }
  },
  computed: {
    ...mapState(["selectedLayers"])
  }
}
</script>