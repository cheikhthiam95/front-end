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
      role:"hote",
      stateDestination:"currentHote",
      redirectTo:"hotes",
      text:{
        title:"Devenir un partenaire"
      }
    };
  }
};
</script>
<style lang="">
</style>
