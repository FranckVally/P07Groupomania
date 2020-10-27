<!-- ATTENTION ICI post definie la fiche de chaque utilisateur  !-->
<template>
  <div class="card mb-4  mx-auto">
    <div class="card-header  d-flex justify-content-between mx-2 my-2">
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
        <div class="card-img-top mx-auto" v-if="post.avatarUrl">
          <img :src="post.avatarUrl" alt="..." class="w-100" />
        </div>
      </div>
    </div>

  <div class="card d-flex justify-content-between mx-auto my-2 ">
    <!--  Bouton suppression  compte-->
      <div class="px-1">
        <button
          type="button"
          class="btn btn-danger white d-block my-2  mx-auto"
          @click="deleteUser"
        >
          Supprimer compte
        </button>
      </div>

       <!--  Bouton suppression  Avatar-->
      <div class=" px-1">
        <button
          type="button"
          class="btn btn-danger white d-block my-2 mx-auto"
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
  width: 80%;
  margin: auto;
}
.text {
  color: #fd2d01;
}
h1 {
  margin-top: 5%;
  text-align: center;
  font-size: 1.5rem;
}
h2{
  font-size: 1.2rem;
}
h3{
  font-size: 1rem;
}
.card-header {
  padding: 1%;
  background-color: white;
  border: black 1px solid !important;
  border-radius: 30px;
}
@media screen and (max-width: 992px) {
  .cadre {
   
    margin-top: 3rem !important;
    width: 90% !important;
  }
  
}
</style>