<template>
  <div class="row navbar navbar-expand-lg navbar-dark fixed-bottom  bg-secondary text-white center">
    <p  class="text-uppercase mx-auto"  v-if="user.token !== null">Notre entreprise GROUPOMANIA compte sur vous {{ user.username }}</p>
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



@media screen and (max-width: 900px) {
 
 .text-uppercase {
   visibility: hidden;
   
  }
} 

</style>