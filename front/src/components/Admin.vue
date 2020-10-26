<template>
  
        <div class="card mb-4 mx-auto">
        
        <h1>Bonjour {{ user.username }} l'Administrateur</h1>
        <div class="row">
          <div class="col-sm">
            <h2>Email :</h2>
            <p>{{ user.email }}</p>
            <h2>Role :</h2>
            <p v-if="user.isAdmin !== false">Administrateur</p>
            <p v-if="user.isAdmin == false">Utilisateur</p>

            
            
          </div>
          <div class="col-6">
            <!--  avatar present-->
            <div class="card-img-top  mx-auto" v-if="user.avatarUrl">
              <div v-if="!contentPost.imageData.length > 0">
                <p>Avatar actuel</p>
                <img :src="user.avatarUrl" alt="..." class="w-75 center" />
              </div>
            </div>
            <!-- fin present avatar-->

            <!-- ajout avatar-->
            <form enctype="multipart/form-data" action="/create" method="post">
              <div
                class="image-preview"
                v-if="contentPost.imageData.length > 0"
              >
                <img
                  class="w-75 center"
                  :src="contentPost.imageData"
                  
                />
                <p>valider votre avatar</p>
              </div>

              <div>
                <div class="inputFile">
                  <input
                    name="inputFile"
                    placeholder="Choisir un fichier"
                    id="inputFile"
                    type="file"
                    class="inputFile"
                    @change="onFileChange"
                    accept="image/*"
                  />
                </div>
              </div>
              <button
                type="submit"
                @click.prevent="createPost"
                class="btn btn-secondary btn-poster mb-3 mt-3"
              >
                Poster
              </button>
              <span
                id="msgReturnAPI"
                class="mx-3 text-danger"
                v-if="user.token == null"
                >Veuillez vous connecter</span
              >
              <span id="msgReturnAPI" class="mx-3" v-else>{{ msgError }}</span>
            </form>
            <!-- fin ajout avatar-->
          </div>
        </div>
        <!--Box changePassword-->
        <div id="changePassword" class="collapse">
          <div class="modal-content">
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="InputNewPassword">Mon nouveau mot de passe</label>
                  <input
                    type="password"
                    class="form-control"
                    id="InputNewPassword"
                    v-model="changePwd.newPassword"
                  />
                  <small id="emailHelp" class="form-text text-muted"
                    >Au minimum 6 caractères dont une majuscule, un minuscule et
                    un chiffre</small
                  >
                </div>
                <div class="form-group">
                  <label for="RepeatInputNewPassword"
                    >Je confirme mon nouveau mot de passe</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="RepeatInputNewPassword"
                    v-model="changePwd.RepeatNewPassword"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success"
                @click="changePassword"
              >
                Sauvergarder les modifications
              </button>
            </div>
            <p id="retour-api" class="text-center">{{ retourAPI }}</p>
          </div>
        </div>
        <!--fin changePassword-->
      </div>    
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'Admin',
  data() {
    return {
      retourAPI: '',
      changePwd: {
        newPassword: null,
        RepeatNewPassword: null,
      },
      contentPost: {
        content: null,
        postImage: null,
        imageData: '',
      },
      msgError: '',
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    // Fonction pour créer un image
    createPost() {
      const fd = new FormData();
      //on déclare une constante FormData pour stocker les infos du Post
      fd.append('inputFile', this.contentPost.postImage); // L'image postée

      if (fd.get('inputFile') == 'null') {
        // si il n'y à rien a publier on affiche un texte d'erreur
        let msgReturn = document.getElementById('msgReturnAPI');
        msgReturn.classList.add('text-danger');
        this.msgError = 'Vous devez au moins dommer une photo !!';
      } else {
        axios // On effectue la requête grâce à axios et grâce au Token d'identification de l'User
          .put('http://localhost:3000/api/user/avatar', fd, {
            headers: {
              Authorization: 'Bearer ' + window.localStorage.getItem('token'),
            },
          })
          .then((response) => {
            // Si la requête fonctionne, on recharge la page pour afficher le dernier post dans le Wall
            if (response) {
              window.location.reload();
            }
          }) // Sinon, on affiche une erreur de requête
          .catch((error) => (this.msgError = error));
      }
    },
    //fonction pour télécharger et faire apparaitre l'image téléchargé dans la création de post
    onFileChange(e) {
      console.log(e);
      this.contentPost.postImage = e.target.files[0] || e.dataTransfer.files;
      console.log(this.contentPost.postImage);

      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.contentPost.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    //fonction pour supprimer le compte
    deleteAccount() {
      axios
        .delete('http://localhost:3000/api/user/delete', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then(() => {
          localStorage.clear();
          setTimeout(() => {
            this.$router.push({ path: '#/signup' });
          }, 500);
          window.location.reload();
        })

        .catch((error) => console.log(error));
    },

    // fonction pour changer le mot de passe
    changePassword() {
      //Controle de la saisie du nouveau password
      //Controle de repeat et non null
      if (
        this.changePwd.newPassword == this.changePwd.RepeatNewPassword &&
        this.changePwd.newPassword != '' &&
        this.changePwd.RepeatNewPassword != ''
      ) {
        axios
          .put(
            'http://localhost:3000/api/user/update',
            {
              newPassword: this.changePwd.newPassword,
            },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            }
          )
          .then((response) => {
            console.log('pwd change', response);
            document.getElementById('retour-api').classList.add('text-success');
            this.retourAPI = response.data.confirmation;
            setTimeout(() => {
              this.retourAPI = '';
              window.location.reload();
            }, 2000);
          })
          .catch((err) => {
            console.log('admin', err);
            this.retourAPI = 'Une erreur est survenue, vérifier vos saisies';
          });
      } else {
        document.getElementById('retour-api').classList.add('text-danger');
        this.retourAPI =
          'Les mots de passe ne sont pas identiques ou ne respectent pas les conditions requises';
      }
    },
    // fonction pour tester les saisies de l'user dasn les inputs
    testInputs() {
      //6 caractères dont au minimum une majuscule, une minuscule et un chiffre
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
      let inputNewPwd = document.getElementById('InputNewPassword');
      let inputRepeatNewPwd = document.getElementById('RepeatInputNewPassword');
      inputNewPwd.addEventListener('input', function (e) {
        let value = e.target.value;
        let testValue = regexPassword.test(value);
        if (testValue) {
          inputNewPwd.style.backgroundColor = '#4CAF50';
        } else {
          inputNewPwd.style.backgroundColor = '#f44336';
        }
      });
      inputRepeatNewPwd.addEventListener('input', function () {
        if (
          inputRepeatNewPwd.value == inputNewPwd.value &&
          regexPassword.test(inputRepeatNewPwd.value)
        ) {
          inputRepeatNewPwd.style.backgroundColor = '#4CAF50';
        } else {
          inputRepeatNewPwd.style.backgroundColor = '#f44336';
        }
      });
    },
  },
  // modifications seront effectuées lorsque la requête sera faite
  mounted() {
    this.$store.dispatch('getUserInfos');
  },
};
</script>

<style scope>
.cadre {
  padding: 1%;
  border: black 3px solid !important;
  border-radius: 20px;
  background-color: #c9c4c4;
  width: 80%;
   margin: 2rem auto;
}
h1 {
  margin-top: 5%;
  text-align: center;
  font-size: 1.5rem;
}
h2{
  font-size: 1.2rem;
}

.main {
  margin-top: 16%;
  text-align: center;
}
.body-intro {
  margin-top: 15%;
}


@media screen and (max-width: 992px) {
  .cadre {
    width: 90%;

  }
}
</style>