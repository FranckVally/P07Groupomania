<template>
  <div id="wall" class="wall">
    <CreatePost />
    <Post v-for="post in allPosts" v-bind:key="post.id" :post="post" @infosPost="setInfos" />
    <modalBoxModerate :post="post" />
  </div>
</template>

<script>
import axios from "axios";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import modalBoxModerate from "../components/ModifPost";


export default {
  name: "Wall",
  components: {
    CreatePost,
    Post,
    modalBoxModerate
  },
  data() {
    return {
      post: {
        id: "",
        content: "",
        image: ""
      },
      allPosts: []

    };
  },
  methods: {
    setInfos(payload) {
      this.post = payload.post;
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/post", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("post", response.data);
        this.allPosts = response.data;
      })
      .catch(error => {
        console.log(error); //affiche pas le message 'normalement' envoyé par le back
      }),
      this.$store.dispatch("getUserInfos");
  }
};
</script>

<style  scope>
.wall {
  width: 90%;
  margin: 5rem auto;
  padding-top: 10%;

}
.block-post {
  background-color: #c9c4c4;
  margin: auto;
  padding: 1%;
  border: black 3px solid !important;
  border-radius: 20px;
  margin-bottom: 1rem;
}


</style>