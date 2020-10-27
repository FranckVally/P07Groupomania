<template>
  <div class="card mb-4 mx-auto">
    <div class="card-header d-flex justify-content-between mx-2 my-2">
      <div>
        contributeur :<strong class="text"> {{ post.User.username }}</strong> le
        <strong class="text">{{ post.createdAt | moment('from') }}</strong>
      </div>
      <div
        class="dropdown mx-1"
        v-if="user.isAdmin == true || user.username == post.User.username"
      >
        <svg
          class="bi bi-three-dots dropdown-toggle"
          id="dropdownMenuPost"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 15 15"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
          />
        </svg>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuPost">
          <button
            class="dropdown-item modifPost"
            data-toggle="modal"
            data-target="#modalEditPost"
            type="button"
            @click="
              emitInfoPost();
              changeEditStyle('modify');
            "
          >
            Modifier
          </button>
          <button
            class="dropdown-item deletePost"
            data-toggle="modal"
            data-target="#modalEditPost"
            type="button"
            @click="
              emitInfoPost();
              changeEditStyle('delete');
            "
          >
            Supprimer le post
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="card-img-top w-75 mx-auto" v-if="post.attachement">
        <img :src="post.attachement" alt="..." class="w-100" />
      </div>

      <div
        class="card-text bg-light d-flex justify-content-between mx-2 my-2"
        v-if="post.content !== 'null'"
      >
        <p class="mb-0">{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import de la bibliothèque vuex
import { mapState } from 'vuex';
//pour le formatage des dates

export default {
  name: 'Post',
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
  },
};
</script>

<style>
.card {
  padding: 1%;
  border: black 3px solid !important;
  border-radius: 30px;
  background-color: #c9c4c4;
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