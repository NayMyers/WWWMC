<template>
  <div class="defect_main">
    <div>
      <h1>This is the Defect page for {{ this.defectName }}</h1>
    </div>
    <div>
    <img :src="defectImage">
    </div>
  </div>
</template>

<script>
require.context('../assets/images/Trimmed_Crop_Images', true, /\.jpg$/)
export default {
  name: 'Defect',
  data () {
    return {
      defectName: this.$route.query.defectName,
    }
  },
  methods: {

  },
  computed:{
    defectImage(){
      const defectNo = '2'
      const defecto = this.defectName
      return require(`@/assets/images/Trimmed_Crop_Images/${this.defectName}/${defectNo}.jpg`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
