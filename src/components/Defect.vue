<template>
  <div class="defect_main">
    <h1>This is the Defect page for {{this.defectName}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Defect',
  data () {
    return {
      defectName: this.$route.query.defectName
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
