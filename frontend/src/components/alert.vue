<template>
  <v-snackbar bottom="" 
    v-model="snackbar.visible" 
    :timeout="snackbar.timeout" 
    :multi-line="snackbar.multiline === true" 
    :color="snackbar.color"
    background-opacity="0.5"
    class="overline text-center">
    {{ snackbar.text }}
  </v-snackbar>
</template>
<script>
export default {
  name: "alert",
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    }
  }
};
</script>