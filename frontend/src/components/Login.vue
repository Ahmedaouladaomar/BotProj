<template>
  <div class="container" style="width: 1150px;">
    <b-card
      bg-variant="dark"
      header="Vue_JWT_APP"
      text-variant="white"
      class="text-center"
    >
      
      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
          <form 
            class="text-center  p-5" id="ombres_multiples_diffuses"
            style="margin-top:70px;height:auto;padding-top: !important;background-color: white;"
            @submit="checklogin"
          >
          <img style="width:400px; height: 200px; position: relative;" alt="" class="img-fluid" src="../assets/logo.png"/>
            <!-- Message for wrong credentials -->
            <div v-if="error" class="alert alert-danger" role="alert">
              You entered wrong login credentails <button v-on:click="(e) => { e.preventDefault();this.error = false }" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="grey-text">
              <table>
                <tr><td>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
               <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
              </svg></td>
              <td style="margin:; padding-bottom: 10px; width: 100%;"><mdb-input v-model="login.username" label="Your username" type="text"/></td></tr>
              <tr>
              <td><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                   <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg></td>
              <td style="padding-bottom: 10px;"><mdb-input v-model="login.password" label="Your password" type="password"/></td></tr></table>
            </div>
           <div class="text-center">
            <mdb-btn type="submit">Login</mdb-btn>
           </div>
         
          </form>
        </div>
      </div>
    </b-card>
     <div class="text-center p-4">
    © 2021 Copyright
    <a class="text-reset fw-bold"><strong>PlatBot</strong></a>
  </div>
  </div>
</template>
<script>
import '../router/index.js'
import dataservice from '../services/dataservice';
import { mdbInput, mdbBtn } from 'mdbvue';

export default {
  name: 'Basic',
    components: {
      mdbInput,
      mdbBtn},
  data() {
    return {
      login: {
        username: "",
        password: ""
      },
      error: false
    };
  },
  methods: {
   /* async loginUser() {
     
        let response = await this.$http.post("/auth/login", this.login);
        let token = response.data.token;
        localStorage.setItem("user", token);
        // navigate to a protected resource 
        this.$router.push("/me");
      
    },*/

 
   

    async checklogin(e){
     
     e.preventDefault()

      var cred = {
       username: this.login.username,
       password: this.login.password 
     };
       const tk =  await dataservice.login(cred)
       if(tk == false) {
          this.login = {
           username: "",
           password: ""
         }
         this.error = true
       }
     
    }
  }
}


    
  
</script>

<style lang="css" scoped>
#ombres_multiples_diffuses {
  box-shadow: 0 0 2em rgb(0, 0, 0);
  width: 100%;

  /* deux ombres dans la liste et des rayons de flou pour chacune */
}
</style>