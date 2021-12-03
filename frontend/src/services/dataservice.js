import http from "../http-common";
import store from "../store"
import router from "../router/index";

class dataservcie {
  // get all users
  getAll() {
    return http.get("/Listing");
  }


  // Login function based on passed credentials
    async login(cred) {

      let loggedIn = false

    http.post("/user/login", cred).then(function(response){

    console.log(response.data.user)
    console.log(response.data.token)

    const usr = response.data.user
    const user = {
      username: usr.username,
      password: usr.password
    }
    
    console.log(user)

    if(!user){
      store.commit('setUser', null);
      store.commit('setToken', null);
      store.state.connected_users.push(user)
      console.log(store.state.connected_users)
    }
    else{
     store.commit('setUser', user);
     store.commit('setToken', response.data.token);
     loggedIn = true;
      router.push("/Home").catch(err => {err});
    }
    });
    return loggedIn
  }

  async stillLoggedIn(){
    let stillLoggedIn = false

    http.post("/users/stillLoggedIn").then(function(res){
      if(res.data.isLoggedIn == true){
        stillLoggedIn = true
        console.log("still logged")
      }
      else{
        console.log("not logged anymore")
      }
    })
    return stillLoggedIn
  }

}

export default new dataservcie();