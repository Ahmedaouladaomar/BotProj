<template>
  <div class="flexible-content">
    <div class="sidebar-fixed position-fixed">
      <img style="width:700px; height: 180px;" alt="" class="img-fluid" src="../assets/logo.png"
      />
      <mdb-list-group class="list-group-flush">
        <router-link to="/dashboard" @click.native="activeItem = 1">
          <mdb-list-group-item
            :action="true"
            :class="activeItem === 1 && 'active'"><mdb-icon
              icon="chart-pie"
              class="mr-3"
            />Home</mdb-list-group-item>
        </router-link>
        <router-link to="/profile" @click.native="activeItem = 2">
          <mdb-list-group-item
            :action="true"
            :class="activeItem === 2 && 'active'" 
   
            ><mdb-icon icon="user" class="mr-3" />Profile</mdb-list-group-item>
        </router-link>
      
        <button class="btn btn-outline-grey" style="margin-top: 4vh;" v-on:click="logout()">
          Logout
        </button>
       
      </mdb-list-group>
    </div>
    <!-- /Sidebar  -->
       <main style=" position: relative; height: 100vh;">
           <div class="mt-0 p-4" style="">
            <router-view name="Dashboard"></router-view>
            <router-view name="Profile"></router-view>
           </div>
       </main> 
       
     </div>

  
</template>



<script>
import {
  mdbIcon,
  mdbListGroupItem,
  waves
} from "mdbvue";

import $ from 'jquery'
import router from '../router'



export default {
  name: "AdminTemplate",
  components: {
    mdbListGroupItem,
    mdbIcon
 
  },
  data() {
    return {
      activeItem: 1,
      showbot: true
    };
  },
 
  mixins: [waves],
  mounted(){
   $(document).ready(function(){
     
      $("#bot").show();
       });

  },
  methods:{
  logout: function(){

    if(confirm("Are you sure you want to logout ?")){ //confirmation window pops up once you click on logout button
    $(document).ready(function(){
     
      $("#bot").hide();
       })
      router.push("/logout") 
      }}
  }
     
     
  
};
</script>



<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #ffffff !important;
  font-weight: bolder;
}
</style>

<style scoped>
main {
  background-color:#f4f7fa;
}

.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 270px;
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color:#ffffff;
  padding: 1.5rem;
  padding-top: 0;
}

.sidebar-fixed .logo-wrapper img {
  width: 100%;
  padding: 2.5rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .flexible-content {
    padding-left: 0;
  }
  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>

 