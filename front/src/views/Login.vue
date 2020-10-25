<template>
  <body class="body-intro">
    <main class="main">
      <form class="cadre w-50 m-auto">
        <div class="container">
          <img
            id="profile-img"
            src="../assets/profilAnonime.png"
            class="profile-img-card"
          />

          <div class="form-group">
            <label for="inputemail ">Votre e-mail</label>
            <input
              type="text"
              class="form-control"
              id="inputemail"
              v-model="dataLogin.email"
            />
          </div>
          <div class="form-group">
            <label for="inputPassword">Votre mot de passe</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              v-model="dataLogin.password"
            />
          </div>
          <small
            ><router-link class="redirection-register" to="/register"
              >Créer un compte</router-link
            ></small
          >
          <br />
          <button
            @click.prevent="logIn"
            type="submit"
            class="btn btn-danger mb-3 mt-3"
          >
            Se connecter
          </button>
        </div>
      </form>
      <modale
        v-bind:revele="revele"
        v-bind:toggleModale="toggleModale"
      ></modale>
    </main>
  </body>
</template>

<script>
//import de la bibliothèque et d'axios pour les requêtes
import axios from 'axios';
import { mapState } from 'vuex';
// import du component Modale pour l'alerte du mot de passe ou email incorrect
import modale from '../components/modale';

export default {
  name: 'SignUp',
  data() {
    return {
      dataLogin: {
        email: null,
        password: null,
      },
      msg: '',
      revele: false,
    };
  },
  components: {
    modale: modale,
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    // fonction modale qui revele ou non la modale si il y a une erreur
    toggleModale: function () {
      this.revele = !this.revele;
    },
    // requête pour connecter l'user déja existant
    logIn() {
      if (this.dataLogin.email !== null || this.dataLogin.password !== null) {
        axios
          .post('http://localhost:3000/api/user/login', this.dataLogin)
          .then((response) => {
            localStorage.setItem('token', response.data.token);
            this.$router.push('/wall');
          })
          .catch((error) => {
            console.log(error);
            this.revele = !this.revele;
          });
      } else {
        console.log('erreur de connexion !');
      }
    },
  },
};
</script>

<style scope>
.cadre {
  padding: 1%;
  border: grey 3px solid !important;
  border-radius: 20px;
  background-color: #f7f7f7;
}

.main {
  margin-top: 16%;
  text-align: center;
}
.redirection-signup {
  color: #fd2d01;
  text-decoration: none;
}
.redirection-signup:hover {
  color: #fd2d01;
}
.body-intro {
  margin-top: 20%;
}
@media screen and (max-width: 900px) {
  .cadre {
    margin-top: 3rem !important;
    width: 90% !important;
  }
  #profile-img {
    width: 50% ;
  }
}
</style>