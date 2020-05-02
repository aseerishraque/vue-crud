<template>
   <div>
       <h1>Store Information</h1>
    <div class="form-group">
            <label for="Name">Name</label>
            <input v-model="addNew.name" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter name">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Image</label>
            <input @change="getFilePath" type="file" class="form-control">
            
            <div class="progress" v-if="percent !=0 && percent !=100">
            <div class="progress-bar" role="progressbar" :style="'width:'+percent+'%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                {{ percent }}%
            </div>
            </div>
        </div>
        <div class="form-group">
            <label for="Image">Image Preview </label>
             <img width="50%" :src="url">
           
        </div>
        <div class="form-group">
            <label for="Description">Description</label>
            <input v-model="addNew.description" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Description">
            </div>
        <button @click="addNewStudent()" type="submit" class="btn btn-primary">Submit</button>

   </div>
        
            
</template>

<script>
export default {
    name: 'Edit',
    data(){
        return {
            addNew: {
                 name: "",
                 image: "demo.jpg",
                 description: ""
                },
            percent: 0,
            imageDirectory: "http://127.0.0.1:8000/uploads/",
            formSubmit: new FormData(),
            url: null
        }
    },
    updated(){
        this.formSubmit.append("id", this.addNew.id);
        this.formSubmit.append("name", this.addNew.name);
        this.formSubmit.append("description", this.addNew.description);
    },
    mounted(){
        // console.log(this.addNew);
    },
    methods: {
        reInitialize(){
            this.addNew = {
                 name: "",
                 image: "",
                 description: ""
                };
        },
        addNewStudent(){
            var currentApp = this;
        this.$axios.post("http://127.0.0.1:8000/api/v1/students/store", currentApp.formSubmit, {
					onUploadProgress: function(uploadEvent){
						var a = Math.round(uploadEvent.loaded / uploadEvent.total *100);
						currentApp.percent = a;
                    }
        })
        .then(res=>{
          if(res.data.error)
          {
             this.$iziToast.error({
              title: 'Error',
              message: res.data.message,
              });
          }
          else{
              currentApp.reInitialize();
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


        },
       getFilePath(e){
      // var currentApp = this;
      var file = e.target.files || e.dataTransfers.files;
      file = file[0];
      this.url = URL.createObjectURL(file);
        
        this.formSubmit.append("image", file, file.name);

    //   console.log(this.url);
        },
    }
}
</script>