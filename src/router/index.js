import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Edit from '@/components/Edit'
import Add from '@/components/Add'
import Delete from '@/components/Delete'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/delete/:id',
      name: 'Delete',
      component: Delete
    }
  ],
  mode: "history"
})
