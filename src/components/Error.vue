<template>
  <div>
    <h1>Sorry, we're experiencing some technical issues at the moment.</h1>
    <h1>Please try again in a minuite</h1>
  </div>
</template>


<script>
export default {
  name: 'Defect',
  data () {
    return {
      errorMessage: this.$route.query.errorMessage,
    }
  },
  methods: {
    logError(){
      console.log(errorMessage)
    }

  },
  beforeMount(){
    logError()
  }
}
</script>
