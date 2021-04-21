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

          <b-navbar-nav left>
            <b-nav-item-dropdown text="Defect Gallery" left>
              <!-- <b-dropdown-item v-for="(cls,defect) in classes" @click="rt_Defect(defect)" left> -->
              <b-dropdown-item v-for="(cls,defect) in classes" @click="rt_Defect(defect)" left>

                <router-link to="`/Defect/defect`">{{defect}}</router-link>
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
