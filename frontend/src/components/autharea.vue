<template>
    <div id="app" v-if="test">
        Welcome to secured area 
    </div>
</template>


<script>
import store from "../store"
export default {
    computed: {
        test() {
            console.log("========"+store.getters.isLoggedIn)
            return store.getters.isLoggedIn;
        }
    }
}
</script>

<style>
#app{

    height: 100%;
}
</style>