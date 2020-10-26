<template>
  <div id="app" class="container-fluid">
    <Header />
      <router-view /> 
      <footer>
  <Footer />
  </footer>  
  </div>
 
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";


export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style >


</style>