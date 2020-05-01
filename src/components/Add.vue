<template>
   <div>
    <div class="form-group">
            <label for="Name">Name</label>
            <input v-model="addNew.name" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter name">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Image</label>
            <input @change="onFileChange" type="file" class="form-control">
            <div class="progress" v-if="percent !=0 && percent !=100">
            <div class="progress-bar" role="progressbar" :style="'width:'+percent+'%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <div class="form-group">
            <label for="Image">Image Preview </label>
            <img width="50%" :src="imageDirectory+addNew.image" >
           
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
            imageDirectory: "http://127.0.0.1:8000/uploads/"
        }
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
            console.log(currentApp.addNew);
        this.$axios.post("http://127.0.0.1:8000/api/v1/students/store", currentApp.addNew)
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

        onFileChange(e){
        var currentApp = this;
        var files = e.target.files || e.dataTransfers.files;
        var file = files[0];
        var fd = new FormData();
        fd.append("image", file, file.name);
        // console.log(this.user);
        this.$axios.post("http://127.0.0.1:8000/api/v1/upload-image", fd, {
					onUploadProgress: function(uploadEvent){
						var a = Math.round(uploadEvent.loaded / uploadEvent.total *100);
						currentApp.percent = a;
					}
				})
        .then(res=>{
            this.addNew.image = res.data.data;
            this.$iziToast.success({
              title: 'Success',
              message: res.data.message,
              });
        });
    },
    }
}
</script>