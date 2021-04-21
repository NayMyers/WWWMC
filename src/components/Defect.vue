<template>
  <div class="defect_main" :key="defectName">
    <router-view :key="$route.fullPath"></router-view>
    <div>
      <h1>This is the Defect page for {{ this.defectName }}</h1>
      <h3>Below are some example images of the defect</h3>

    </div :key="$route.fullPath">
    <div v-for="i in 5" >
    <h4>{{i}}</h4>
    <img :src="defectImage(i)">
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
      defectImage(imageNo){
        var defectNo = null
        if(typeof(imageNo) == "number"){
          defectNo = imageNo.toString()
        }else{
          defectNo = this.defectNo
        }
        return require(`@/assets/images/Trimmed_Crop_Images/${this.defectName}/${defectNo}.jpg`)
      }

  },
  watch:{
  },
  computed:{

  },
  updated(){
    console.log('updated')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
