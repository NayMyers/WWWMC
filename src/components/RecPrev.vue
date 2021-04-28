<template>
  <div class="defect_main" :key="defectName">
    <div>
      <div class="headingMessage">
        <h1>This is the Recourse and Prevention page for:</h1>
        <h1>{{this.defectName}}</h1>
      </div>


      <div class="row">
        <div key="recourseText" class="column" left>
          <h3>Recourse Information</h3>
          <h4>{{this.recourseText}}</h4>
        </div>

        <div key="preventionText" class="column">
          <h3>Prvention Information</h3>
          <h4>{{this.preventionText}}</h4>
        </div>
      </div>
    </div>

    <div class="cropClasses">
      <li v-for="number, cropName in classes">{{cropName}}</li>

    </div>
  </div>

</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row {
  display: flex;
  }

  .column {
  flex: 30%;
}
</style>

<script>
// const infoPathBase = "http://178.62.60.223/static/"
const apiUrlBase = "http://104.236.43.188/"
const axios = require('axios')
export default {
  name: 'Defect',
  data () {
    return {
      defectName: this.$route.query.defectName,
      recourseText: null,
      preventionText: null,
    }
  },
  methods: {
      getRecourseAndPreventionInfo(){
        axios.get(apiUrlBase + 'recourse/'+this.defectName,{
            onUploadProgress: uploadEvent => {
              console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
            }
        })
          .then(res =>{
            console.log(res)
            this.recourseText = res["data"]["recourse"]
            this.preventionText = res["data"]["prevention"]
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
  },
  beforeMount(){
    this.getRecourseAndPreventionInfo()
  }
}
</script>
