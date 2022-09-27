<template lang="">
  <div>

      <div class="row">

        <div class="col-12 mt-5">

          <atypik-table :actions = "actions" :data="data" :texts="texts"> </atypik-table>
      </div>

      </div>


  </div>
</template>
<script>
export default {
  data() {
    return {
         params_ids: ["habitats", "hotes", "locataires", "reservations"],
      texts: {
        title: "hote",

      }, 
      data:{},
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
                this.data = await this.$axios.$get("/users/findAllBy/role/hote");
                this.addBntAction(this.data)
                console.log(this.data);
            } catch (error) {
                console.log(error);
            }
        },
      addBntAction(data){
        console.log(data,"Adddddddddddddddddd")
          data.forEach((element,id) =>{
            console.log("ele",element)
          })
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