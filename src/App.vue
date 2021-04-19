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

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">


            <b-nav-item-dropdown text="Defect Gallery" left>
              <b-dropdown-item v-for="(cls,defect) in classes" @click="rt_Defect(defect)" left>{{defect}}</b-dropdown-item>
              <!-- <b-dropdown-item @click="rt_Defect('Defect2')">Defect2</b-dropdown-item> -->
              <!-- <b-dropdown-item v-for="n in 10" @click="rt_Defect(n)">Defect{{n}}</b-dropdown-item> -->
              <b-dropdown-item v-for="(cls,defect) in classes" left><a href="'http://localhost:8080/#/Defect?defect' + defect">{{defect}}</a></b-dropdown-item>


            </b-nav-item-dropdown>
            <!-- <h5 v-for="_class in classes">{{_class}}</h5> -->

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view/>
  </div>
</template>

<script>
import cropClasses from '@/assets/cropClasses.json'
export default {
  name: 'App',
  data () {
    return{
      classes: cropClasses
    }

  },
  methods: {
    rt_UploadImage(){
      this.$router.push({path: "/Upload_Image"})
    },
    rt_Defect(defect_name){
      this.$router.push({path: "/Defect", query: {defectName: defect_name}})
    },
  },
  computed:{

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
