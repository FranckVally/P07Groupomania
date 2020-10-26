<template>
  <div>
    <div class="card mb-4 w-75 mx-auto">
      <div class="mt-5">
        <h3 class="mt-2">Qu'avez vous à montrer ?</h3>
        <form enctype="multipart/form-data" action="/create" method="post">
          <div class="input-group">
            <label for="input_text">Ce que vous dite</label>
            <br />
            <textarea
              v-model="contentPost.content"
              class="input-text"
              rows="3"
              id="input_text"
              type="text"
            />
          </div>

          <div>
            <div class="inputFile px-2">
              Télécharger une image
     <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-camera" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M15 12V6a1 1 0 0 0-1-1h-1.172a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 9.173 3H6.828a1 1 0 0 0-.707.293l-.828.828A3 3 0 0 1 3.172 5H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
  <path fill-rule="evenodd" d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
  <path d="M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/></svg>

<div class="input-group mb-3">
  <div class="input-group-prepend">
    
  </div>
  <div class="custom-file">
    <input 
      type="file" 
      class="custom-file-input" 
      id="inputFile"
      @change="onFileChange"
      accept="image/*"
      >
    <label class="custom-file-label" for="inputGroupFile01">Choisir</label>
  </div>
</div>  

              <div
                class="image-preview"
                v-if="contentPost.imageData.length > 0"
              >
                <img
                  class="preview"
                  :src="contentPost.imageData"
                  height="100px"
                />
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
                >Connecter vous</span
              >
              <span id="msgReturnAPI" class="mx-3" v-else>{{ msgError }}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import d'axios pour les requêtes et de la bibliothèque vuex
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'CreatePost',
  data() {
    return {
      contentPost: {
        content: null,
        postImage: null,
        imageData: '',
      },
      msgError: '',
    };
  },
  computed: {
    ...mapState(['user', 'editOption']),
  },
  methods: {
    // Fonction pour créer un post
    createPost() {
      const fd = new FormData();
      //on déclare une constante FormData pour stocker les infos du Post
      fd.append('inputFile', this.contentPost.postImage); // L'image postée
      fd.append('content', this.contentPost.content); // Le texte posté

      if (fd.get('inputFile') == 'null' && fd.get('content') == 'null') {
        // si il n'y à rien a publier on affiche un texte d'erreur
        let msgReturn = document.getElementById('msgReturnAPI');
        msgReturn.classList.add('text-danger');
        this.msgError = "Il n'y a rien !";
      } else {
        axios // On effectue la requête grâce à axios et grâce au Token d'identification de l'User
          .post('http://localhost:3000/api/post/create', fd, {
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
  },
};
</script>

<style>
.input-text {
  width: 100%;
  background-color: white;
  margin: auto;
}
.input-group {
  padding: 2%;
}
h3 {
  text-align: center;
}


img.preview {
  border: 1px solid rgb(20, 20, 20);
  padding: 0.2rem;
  width: 100%;
  height: 100%;
  margin: auto;
}


.cadre {
  width: 75%;
  margin: auto;
  padding: 1%;
  border: black 3px solid !important;
  border-radius: 20px;
  background-color: #c9c4c4;
  margin: 3rem auto;
}
@media screen and (max-width: 992px) {
  .cadre {
    width: 90%;
  }
}
</style>