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
              role: "locataire",
              stateDestination: "currentLocatare",
              redirectTo: "locataires",
              monmotif: "Amitié",
              text: {
                  title: "Devenir un Locataire"
              }
          };
      }
  };
</script>

<style lang="">
</style>
