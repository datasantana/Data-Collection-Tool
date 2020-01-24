<template>
  <v-container>
    <login-card />
    <alert />
  </v-container>
</template>

<script>
// @ is an alias to /src
import loginCard from "@/components/loginCard.vue";
import alert from "@/components/alert.vue";


export default {
  name: "login",
  components: {
    loginCard, 
    alert
  }
};
</script>
