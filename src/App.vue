<template>
  <div id="app">
     <div class="container">
        <h2>
           <router-link to="/add">
              Add New User
           </router-link>
           
        </h2>
           <h2>  <router-link to="/" exact>
              Home
           </router-link>
           </h2> 
       
        <div class="row">
            <div class="col-md-6">
               <router-view/>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


