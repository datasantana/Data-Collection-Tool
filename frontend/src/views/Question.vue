<template>
  <div class="question">
    <question-card />
  </div>
</template>

<script>
// @ is an alias to /src
import questionCard from "@/components/questionCard.vue";

export default {
  name: "question",
  components: {
    questionCard
  }
};
</script>