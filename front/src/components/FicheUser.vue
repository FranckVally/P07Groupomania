<!-- ATTENTION ICI post definie la fiche de chaque utilisateur j'ai réutiliser la page Post pour crée une fiche utilisateur !-->
<template>
  <div class="card mb-4 w-75 mx-auto">
    <div class="card-header  d-flex justify-content-between">
      <div class="col-6">
        <h3>Utilisateur</h3>
        {{ post.username }}
        <br />
        <h3>Enregistrer</h3>
        {{ post.createdAt | moment('from') }}
        <br />
        
      </div>
      <!-- avatar -->
      <div class="col-6">
        <div class="card-text" v-if="post.content !== 'null'">
          <p class="mb-0">{{ post.content }}</p>
        </div>
        <div class="card-img-top w-50 mx-auto" v-if="post.avatarUrl">
          <img :src="post.avatarUrl" alt="..." class="w-50" />
        </div>
      </div>
    </div>

  <div class="card-header d-flex justify-content-between my-2">
    <!--  Bouton suppression  compte-->
      <div class="col-6">
        <button
          type="button"
          class="btn btn-danger white d-block"
          @click="deleteUser"
        >
          Supprimer le compte
        </button>
      </div>

       <!--  Bouton suppression  Avatar-->
      <div class="col-6">
        <button
          type="button"
          class="btn btn-danger white d-block"
          @click="deleteAvatar"
        >
          Supprimer l'avatar
        </button>
      </div>

    </div>
  </div>
</template>

<script>
// import de la bibliothèque vuex
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'User',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(['user', 'editOption']),
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    //création de fonction pour modifier ou supprimer le post
    emitInfoPost() {
      this.$emit('infosPost', { post: this.post });
    },
    changeEditStyle(value) {
      this.$store.dispatch('changeEditStyle', value);
    },
    //fonction pour supprimer l'utilisateur'
    deleteUser() {
      axios
        .delete('http://localhost:3000/api/user/admin/delete', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            postId: this.post.id,
          },
        })
        .then(() => {
          //  localStorage.clear();
          setTimeout(() => {
            this.$router.push({ path: '#/signup' });
          }, 500);
          window.location.reload();
        })

        .catch((error) => console.log(error));
    },

    // fonctionner supprimer l'avatar deleteAvatar"eAvatar
    deleteAvatar() {
      axios
        .delete('http://localhost:3000/api/user/admin/deleteAvatar', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            postId: this.post.id,
          },
        })
        .then(() => {
          //  localStorage.clear();
          setTimeout(() => {
            this.$router.push({ path: '#/signup' });
          }, 500);
          window.location.reload();
        })

        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
.card {
  padding: 1%;
  border: black 3px solid !important;
  border-radius: 30px;
  background-color: #c9c4c4;
  width: 60%;
  margin: auto;
}
.text {
  color: #fd2d01;
}
.card-header {
  padding: 1%;
  background-color: white;
  border: black 1px solid !important;
  border-radius: 30px;
}
@media screen and (max-width: 900px) {
  .cadre {
    margin-top: 3rem !important;
    width: 90% !important;
  }
}
</style>