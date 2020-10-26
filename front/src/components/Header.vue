<template>
  <nav class="row navbar navbar-expand-lg navbar-dark  bg-secondary fixed-top px-5">
    <button class="navbar-toggler" type="button"  data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span></button>
  
 
  <div class="collapse navbar-collapse justify-content navbar-dark  bg-secondary" id="navbarToggle">
     <router-link class="navbar-link" to="/wall"><img class="imglogo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania" /></router-link>
      <ul class="navbar-nav">
        <li class="nav-item mx-1" v-if="user.isAdmin == true ">
          <router-link  to="/WallAdmin">
            <button type="button" class="btn btn-primary">
          
              Administration
            </button>
          </router-link>
        </li>

      
   
        <li class="nav-item mx-1" v-if="user.token !== null">
          <router-link  to="/wall">
            <button type="button" class="btn btn-secondary">
          
              Message
            </button>
          </router-link>
        </li>
        <li class="nav-item mx-1" v-if="user.token == null">
          <router-link   to="/signup">
            <button type="button" class="btn btn-secondary">
          
              Créer un compte
            </button>
          </router-link>
        </li>
        <li class="nav-item mx-1" v-if="user.token == null">
          <router-link   to="/login">
            <button type="button" class="btn btn-danger">
         
              Se connecter
            </button>
          </router-link>
        </li>
        <li class="nav-item mx-1" v-if="user.token !== null">
          <router-link  to="/user">
            <button type="button" class="btn btn-secondary">
          
             {{ user.username }}
            </button>
          </router-link>
         
        </li>
        <li class="nav-item mx-1" v-if="user.token !== null">

          <button  type="button" class="btn btn-danger" @click="disconnect">
        
            Déconnexion
          </button>

        </li>
   
      </ul>
      
  </div>
</nav>

</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"])
  },
  methods: {
    disconnect() {
      // Pour se déconnecter, On vide le localStorage, on actualise la page et on redirige vers la page login
      localStorage.clear();
      this.$router.push({ path: '/login' })
      setTimeout(() => {
       window.location.reload();
         }, 500);
           
          }
    }
};
</script>

<style>
nav {
  position: fixed;
  top: 0;

}
.imglogo{
  width: 40%;

}
.btn{
  color: white;
}
.btn:hover{
  color: white;
}
.navbar-toggler{
margin-left: 90%;
}
.navbar-link{
  width: 80% ;
}

@media screen and (max-width: 992px) {
  .cadre {
    margin-top: 3rem !important;
    width: 90% !important;
  }
 .imglogo {
   visibility: hidden;
  } 
}  
</style>