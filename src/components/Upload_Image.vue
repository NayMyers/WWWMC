<template>
  <div>

     <div id="upload" v-if="uploadMode">
       <h2> Choose Image And Upload </h2>
       <h4>Please note. Only .png and .jpg files are supported (see instructions for more info)</h4>
        <input type="file" ref="fileChoose" name="fileInput" value="Select File" @change="onFileSelected" style="display: none">
        <button @click="$refs.fileChoose.click()"> Choose Image </button>
        <div>
          <button @click="onUpload" type="button-basic" name="button">Upload</button>
          <!-- <button @click="testAPIRes" type="button" name="button">Test API res</button> -->
          <div v-if="awaitingResponse">
            <h3> Please Wait </h3>
            <h3> Your image is being analysed </h3>
          </div>
        </div>

        <div v-if="showImagePrev">
          <h1> Image Preview </h1>
        </div>

        <div v-if="showImagePrev" id="preview">
          <div>
            <img v-if="imageUrl" :src="imageUrl">
          </div>
        </div>
      </div>

     <div id="results" v-if="showResults" class="results">
       <button @click="goToUploadMode" type="button-basic" name="goToUpload">Upload Different Image</button>
      <div class="topDefect">

       <h3> We think the plant and defect is: </h3>
       <h4> {{this.defectName}} </h4>

       <h4> With {{this.classPercent}}% certainty</h4>


          <div class="centreInline">
              <button oninvalid=""@click="goToDefect(defectName)" type="button-basic" name="defectBtn">Images</button>
          </div>

          <div class="centreInline">
              <button oninvalid=""@click="goToRecourse(defectName)" type="button-basic" name="defectBtn">Recourse</button>
          </div>

       </div>

       <div class='otherMostLikeley' key="topClassBarTopNames">
         <h3>Other Most Likeley Defects:</h3>
          <div v-for="classNo in noOfClasses-1">
            <h4>{{topClassBarTopNames[classNo-1]}}</h4>
            <h4> With {{classesPercentBarTop[classNo-1]}}% certainty</h4>
            <div class="centreInline">
              <button oninvalid=""@click="goToDefect(className)" type="button-basic" name="defectBtn">Images</button>
            </div>
            <div class="centreInline">
                <button oninvalid=""@click="goToRecourse(className)" type="button-basic" name="defectBtn">Recourse</button>
            </div>
          </div>
        </div>

      </div>

  </div>
</template>

<style>
  .centreInline{
    display:inline-block;
  }
  body {
  background-color: var(--cl_background);
  }
  .smallButton{
    font-size: 10px;
  }
  .otherMostLikeley{
    margin-top: 25px;
  }
  .topDefect{
    margin-top: 25px;
  }

  .results{
    margin-top: 25px;
  }

  button{
  	background:linear-gradient(to bottom, var(--cl_secondary) 5%, #408c99 100%);
  	background-color:#599bb3;
  	border-radius:8px;
  	display:inline-block;
  	cursor:pointer;
  	color:#ffffff;
  	font-family:Arial;
  	font-size:20px;
  	font-weight:bold;
  	padding:6px 20px;
  	text-decoration:none;
  	text-shadow:0px 1px 0px #3d768a;
  }

#app {
  padding: 20px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>

<script>
// Production API 104.236.43.188
const apiUrlBase= "http://104.236.43.188/"
// const apiUrlBase = "http://127.0.0.1:5000/"

  const axios = require('axios')
  export default {
    name: 'firstroute',
    data () {
      return {
      selectedFile: null,
      imageUrl: null,
      uploadMode: true,
      showImagePrev: false,
      awaitingResponse: false,
      showResults: false,
      defectName : "Unknown",
      topClasses : null,
      topClassNames: null,
      topClassBarTopNames: null,
      classesPercent: null,
      topClassPercent: null,
      noOfClasses: null,

    }
  },
  methods: {
    onFileSelected(event){
      const reader = new FileReader()
      console.log(event)
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
      // for the image preview.
      this.imageUrl = URL.createObjectURL(this.selectedFile)
      this.showImagePrev = true
      this.showResults = false
    },
    goToDefect(_defectName){
      this.$router.push({path: "/Defect", query: {defectName: _defectName}})
    },
    goToRecourse(_defectName){
      this.$router.push({path: "/RecourseAndPrevention", query: {defectName: _defectName}})
    },
    onUpload(){
      const fd = new FormData();
      fd.append('imageName', this.selectedFile.name)
      fd.append('image', this.selectedFile)
      console.log("THIS SELECTED FILE = ")
      console.log(this.selectedFile)
      console.log(fd)
      axios.put(apiUrlBase + 'upload_image', fd,{
          onUploadProgress: uploadEvent => {
            this.awaitingResponse = true
            console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
          }
      })
        .then(res =>{
          console.log(res)
          this.awaitingResponse = false
          this.showImagePrev = false
          this.uploadMode = false
          this.showResults = true
          this.classesPercent = res["data"]["topClassesPercent"]
          this.classPercent = this.classesPercent[0]
          this.noOfClasses = this.classesPercent.length
          this.defectName = res["data"]["className"]
          this.topClassNames = res["data"]["topClassNames"]
          this.topClassBarTopNames = this.topClassNames
          this.topClassBarTopNames.shift()
          this.classesPercentBarTop = this.classesPercent
          this.classesPercentBarTop.shift()

        })
        .catch((err) => {
          return new Error(err.message)
          // this.$router.push({path: "/Error", query: {errorMessage: err.message}})
        })
    },
    goToUploadMode(){
      this.uploadMode=true
      this.showResults=false
    },
    testAPIRes(){
      axios.post(apiUrlBase + 'hello_world/helloworld')
          .then(res =>{
            console.log(res)

        })
    }
  }
}
</script>
