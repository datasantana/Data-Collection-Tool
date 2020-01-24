<template>
  <div class="about">
    <register-card />
    <alert />
  </div>
</template>

<script>
// @ is an alias to /src
import registerCard from "@/components/registerCard.vue";
import alert from "@/components/alert.vue";

export default {
  name: "register",
  components: {
    registerCard,
    alert
  }
};
</script>