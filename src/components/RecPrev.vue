<template>
  <div class="defect_main" :key="defectName">
    <div>
      <h1>This is the Recourse and Prevention page for:</h1>
      <h1>{{this.defectName}}</h1>
      <h3>Recourse Text</h3>
      <!-- <h3>{{this.recourseText}}</h3> -->
     <button @click="getRecourseAndPreventionInfo" type="button-basic" name="defectBtn">Recourse Info</button>

    </div>
  </div>

</template>

<script>
// const infoPathBase = "http://178.62.60.223/static/"
const apiUrlBase = "http://127.0.0.1:5000/"
const axios = require('axios')
export default {
  name: 'Defect',
  data () {
    return {
      defectName: this.$route.query.defectName,
      recourseText: null,
      preventionText: null
    }
  },
  methods: {
      getRecourseAndPreventionInfo(){
        axios.get(apiUrlBase + 'recourse/'+this.defectName,{
            onUploadProgress: uploadEvent => {
              this.awaitingResponse = true
              console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
            }
        })
          .then(res =>{
            console.log(res)
            this.recourseText = res["recourse"]
            this.preventionText = res["prevention"]
          })
          .catch((err) => {
            //this seems bad to do!
            this.$router.push({path: "/Error"})
            return new Error(err.message)
          })
      },
  },
  updated(){
    console.log('updated')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
