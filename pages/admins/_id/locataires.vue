<template lang="">
  <div>

      <div class="row">

        <div class="col-12 mt-5">

          <atypik-table :actions = "actions" :items="data" :fields ="fields" :texts="texts"> </atypik-table>
      </div>

      </div>


  </div>
</template>
<script>
export default {layout:'admin-layout',
  data() { 
  

    return {
      params_ids: ["habitats", "hotes", "locataires", "reservations"],
      texts: {
        title: "locataire",

      }, 
      data:{},
      fields:[
       { key: 'firstName', label: 'Prénom' },
       { key: 'lastName', label: 'Nom' },
       { key: 'email', label: 'Adresse e-mail' },
       { key: 'telephone', label: 'Numéro de téléphone' },

       { key: 'adresse', label: 'adresse' },
       { key: 'city', label: 'Ville' },


       { key: 'country', label: 'Pays' },


       { key: 'action', label: '' }



      ], 

      actions:[{name:'' , icon: 'trash' ,class :"btn btn-danger btn-sm" }, {name:'' , icon: 'pencil' ,class :"btn btn-primary btn-sm" }]
    };
  },
  methods: {
    goTo(args) {
      console.log(this.$route);
    },
      checkingAccessRight() {        
      return ((this.$route.params.id == this.$warehouse.get("session").userId) && (this.$warehouse.get("session").role == "admin"))
    },

      async getHotes() {
            try {
                this.data = await this.$axios.$get("/users/findAllBy/role/locataire");
                console.log(this.data);
                this.addBntAction(this.data)
            } catch (error) {
                console.log(error);
            }
        },
          addBntAction(data){ 

          data.forEach((element,id) =>{
            console.log("ele", element)

            element.action = [{name:'' , icon: 'trash' ,class :"btn btn-danger btn-sm" }, {name:'' , icon: 'pencil' ,class :"btn btn-primary btn-sm" },{name:'' , icon: 'arrows-angle-expand' ,class :"btn btn-success btn-sm" }]
          })


          console.log("data after",this.data)
      }
  },
  mounted() {
    
    if (!this.checkingAccessRight()) {
      this.$router.back();
    }
    this.getHotes();
  },
};
 
 
 
</script>
<style lang="">
</style>