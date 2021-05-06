import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Upload_Image from '@/components/Upload_Image'
import Defect from '@/components/Defect'
import Error from '@/components/Error'
import Test from '@/components/Test'
import Instructions from '@/components/Instructions'
import RecPrev from '@/components/RecPrev'
import About from '@/components/About'
import Axios from 'axios';


Vue.use(Router)
const axios = require('axios');


export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Upload_Image',
      name:'Upload_Image',
      component: Upload_Image
    },
    {
      path: '/Defect',
      name: 'Defect',
      component: Defect
    },
    {
      path:'/Test',
      name:'Test',
      component: Test
    },
    {
      path:'/Error',
      name:'Error',
      component: Error
    },
    {
      path:'/Instructions',
      name:'Instructions',
      component: Instructions
    },
    {
      path:'/RecourseAndPrevention',
      name:'RecourseAndPrevention',
      component: RecPrev
    },
    {
      path:'/About',
      name:'About',
      component: About
    }
  ]
})
