<template>
  <div
    class="row navbar navbar-expand-lg navbar-dark fixed-bottom bg-secondary text-white center footer"
  >
    <p class="text-uppercase mx-auto" v-if="user.token !== null">
      Notre entreprise GROUPOMANIA compte sur vous {{ user.username }}
    </p>
    <router-link to="/wall"
      ><img
        class="logobaspage"
        src="../assets/icon-bas-page.png"
        alt="Logo Groupomania"
    /></router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
  methods: {},
};
</script>

<style scope>
.logobaspage {
  height: 2rem;
}

@media screen and (max-width: 992px) {
  .logobaspage {
    padding-bottom: 1rem;
  }
  .footer {
    height: 2rem;
  }

  .text-uppercase {
    visibility: hidden;
  }
}
</style>