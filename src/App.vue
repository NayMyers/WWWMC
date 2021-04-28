<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">

        <b-navbar-brand href="#">What's Wrong With My Crop</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="rt_UploadImage">Upload Image</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav>
            <b-nav-item @click="rt_Instructions">Instructions</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav left>
            <b-nav-item-dropdown text="Defect Gallery" left>
              <b-dropdown-item v-for="(cls,defect) in classes" @click="rt_Defect(defect)" left>
                <router-link to="`/Defect/defect`">{{defect}}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav left>
            <b-nav-item-dropdown text="Recourse And Prevention" left>
              <b-dropdown-item v-for="(cls,defect) in classes" @click="rt_RecourseAndPrevention(defect)" left>
                <router-link to="`/RecourseAndPrevention/defect`">{{defect}}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>

    <router-view/>
  </div>
</template>

<script>
const axios = require('axios')
// Production API 104.236.43.188
const apiUrlBase= "http://127.0.0.1:5000/"
export default {
  name: 'App',
  data () {
    return{
      classes: null
    }
  },
  methods: {
    rt_UploadImage(){
      this.$router.push({path: "/Upload_Image"})
    },
    rt_Defect(_defectName){
      this.$router.push({path: "/Defect", query: {defectName: _defectName}})
    },
    rt_RecourseAndPrevention(_defectName){
      this.$router.push({path: "/RecourseAndPrevention", query: {defectName: _defectName}})
    },
    rt_Instructions(){
      this.$router.push({path: "/Instructions"})
    },
    getCropClasses(){
        axios.get(apiUrlBase + 'model_info',{
            onUploadProgress: uploadEvent => {
              this.awaitingResponse = true
              console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
            }
        })
          .then(res =>{
            console.log(res)
            this.classes = JSON.parse(res["data"])
          })
          .catch((err) => {
            //bad practice
            this.$router.push({path: "/Error"})
            return new Error(err.message)
        })
      },
  },
  beforeMount(){
    this.getCropClasses()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
