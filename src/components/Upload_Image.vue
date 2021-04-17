<template>
  <div>

     <div id="upload" v-if="uploadMode">
       <h2> Choose File And Upload </h2>
        <input type="file" ref="fileChoose" name="fileInput" value="Select File" @change="onFileSelected" style="display: none">
        <button @click="$refs.fileChoose.click()"> Choose File </button>
        <div>
          <button @click="onUpload" type="button-basic" name="button">Upload</button>
          <button @click="testAPIRes" type="button" name="button">Test API res</button>
        </div>
        <div v-if="showImagePrev" id="preview">
          <h1> Image Preview </h1>
          <img v-if="imageUrl" :src="imageUrl">
        </div>
      </div>

     <div id="results" v-if="showResults">
       <button @click="goToUploadMode" type="button-basic" name="goToUpload">Upload Different Image</button>
       <h3> We think the plant and defect is: </h3>
       <h3> {{this.defectName}} </h3>
       <button @click="goToDefect" type="button-basic" name="defectBtn">Defect Images</button>
       <div id="resImagePreview">
         <!-- <img src="0a5e9323-dbad-432d-ac58-d291718345d9___FREC_Scab 3417_1.JPG"> -->
         <!-- <img :src="getResImgUrl()"> -->

         <!-- <img v-if="resImgPath" :src="require('@/assets/images/Trimmed_Crop_Images/' + this.resImgPath + '.jpg')"> -->
         <!-- <img v-if="resImgPath" :src="require('@/assets/images/(6)' + '.jpg')"> -->

       </div>
     </div>

  </div>
</template>

<style>
  body {
  background-color: var(--cl_background);
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
  	padding:13px 32px;
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
  const axios = require('axios')
  export default {
    name: 'firstroute',
    data () {
      return {
      apiUrlBase: 'http://127.0.0.1:5000/',
      selectedFile: null,
      imageUrl: null,
      uploadMode: true,
      showImagePrev: false,
      showResults: false,
      defectName : "Unknown",
      resImgPath : null
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
    goToDefect(){
      this.$router.push({path: "/Defect", query: {defectName: this.defectName}})
    },
    onUpload(){
      const fd = new FormData();
      fd.append('imageName', this.selectedFile.name)
      fd.append('image', this.selectedFile)
      console.log("THIS SELECTED FILE = ")
      console.log(this.selectedFile)
      console.log(fd)
      axios.put('http://127.0.0.1:5000/upload_image', fd,{
          onUploadProgress: uploadEvent => {
            console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
          }
      })
        .then(res =>{
          console.log(res)
          this.showImagePrev = false
          this.uploadMode = false
          this.showResults = true
          this.defectName = res["data"]["className"]
          this.resImgPath = this.defectName + "/(6)"
        })
        .catch((err) => {
          this.$router.push({path: "/Error"})
          return new Error(err.message)


        })
    },
    goToUploadMode(){
      this.uploadMode=true
      this.showResults=false
    },
    testAPIRes(){
      axios.post('http://127.0.0.1:5000/hello_world/helloworld')
          .then(res =>{
            console.log(res)

        })
    }
  }
}
</script>
