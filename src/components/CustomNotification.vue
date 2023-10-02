<template>
  <div v-if="show" class="custom-notification">
    {{ message }}
  </div>
</template>

<script lang="ts">
export default {
  props: {
    show: Boolean,
    message: String
  }
}
</script>

<style scoped>
.custom-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
