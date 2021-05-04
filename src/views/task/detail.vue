<template>
  <div class="task-detail">
    This is detail
  </div>
</template>

<script>
export default {
  name: 'detail',
  beforeMount() {
    console.log(this.$route)
  }
}
</script>

<style scoped>

</style>
