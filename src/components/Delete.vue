<template>
<div>
    <h2>
        Are you Sure?
    </h2>
    <button @click="deleteStudent()" class="btn btn-danger">Delete</button>
    <router-link class="btn btn-primary" to="/" exact>Cancel</router-link>
</div>
</template>

<script>
export default {
    name: "Delete",
    data(){
        return {
            studentId: null
        }
    },
    mounted(){
  this.studentId = this.$route.params.id;
    },
    methods: {
        deleteStudent(){
            var currentApp = this;
         this.$axios.post("http://127.0.0.1:8000/api/v1/students/delete"+"/"+currentApp.studentId)
        .then(res=>{
          if(res.data.error)
          {
             this.$iziToast.error({
              title: 'Error',
              message: res.data.message,
              });
          }
          else{
              this.$iziToast.success({
              title: 'Success',
              message: res.data.message,
              });
              this.$router.push({name: "Home"});
          }
           
        }).catch(error => {
         if(error.response){
           // error msg here...
           console.log(error.message);
         }
        });
        }
    }
}
</script>