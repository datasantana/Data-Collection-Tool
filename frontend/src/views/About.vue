<template>
  <div class="about">
    <about-card />
  </div>
</template>

<script>
// @ is an alias to /src
import aboutCard from "@/components/aboutCard.vue";

export default {
  name: "about",
  components: {
    aboutCard
  }
};
</script>
