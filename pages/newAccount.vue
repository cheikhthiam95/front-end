<template lang="">
  <div>
    <new-user :role="role" :state-destination="stateDestination" :text="text" :redirect-to="redirectTo"></new-user>
  </div>
</template>
<script>  

export default {
  layout: "login",
  data() {
    return {
      role:"admin",
      stateDestination:"currentHote",
      redirectTo:"users",
      text:{
        title:"Créer un nouveau compte administrateur"
      }
    };
  }
};
</script>
<style lang="">
</style>
