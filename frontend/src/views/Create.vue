<template>
  <div class="about">
    <create-card />
    <alert />
  </div>
</template>

<script>
// @ is an alias to /src
import createCard from "@/components/createCard.vue";
import alert from "@/components/alert.vue";

export default {
  name: "create",
  components: {
    createCard,
    alert
  }
};
</script>
