<template>
     <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>description</th>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
            
                    <tbody>


                        <tr v-for="student in students">
                            <td>{{ student.id }}</td>
                            <td> {{ student.name }} </td>
                            <td>
                                <img width="50%" :src="imageDirectory+student.image">
                            </td>
                            <td> {{ student.description }} </td>
                            <td>
                                <router-link class="btn btn-primary" :to="'/edit/'+student.id" >Edit</router-link>
                            </td>
                            <td>
                                <router-link class="btn btn-primary" :to="'/delete/'+student.id" >Delete</router-link>
                            </td>
                        </tr>


                       
                      
            
                    </tbody>
            
                    
            
                 
                </table>
</template>

<script>
export default {
    name: "Home",
    data(){
        return {
            students: [
                {id: 0, name: "", image: "", description: ""}
            ],
            imageDirectory: "http://127.0.0.1:8000/uploads/"
        }
    },
    mounted(){
        this.init();
    },
    methods: {
       init(){

           this.$axios.get("http://127.0.0.1:8000/api/v1/students")
        .then(res=>{
          // this.$eventBus.$emit("loadingStatus", false);
          this.loadingCatgegory = false;
          if(res.data.error)
          {
             
          }
          else{
             this.students = res.data.students;
          }
           
        }).catch(error => {
         if(error.response){
           // error msg here...
         }
        });
       }       
    }
}
</script>