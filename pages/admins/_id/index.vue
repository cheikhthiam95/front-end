<template lang="">
  <div>
        <div class="row">
        <div class=" text-dark  col-4">

          Administrateur
          </div>
      </div>
      <div class="row">
        <div class="col-4 mt-5">
        <b-card
            title="Hotes"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
            <!-- <b-card-text>
            Administre les .
            </b-card-text> -->

            <b-button href="#" @click="goTo('hotes')" variant="primary">Voire les hotes</b-button>
        </b-card>
        </div>
    <div class="col-4 mt-5">
        <b-card
            title="Locataire"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
            <!-- <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text> -->

            <b-button href="#" @click="goTo('locataires')" variant="primary">Voire les locataires</b-button>
        </b-card>

  </div>
        <div class="col-4 mt-5">
        <b-card
            title="Habitat"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
            <!-- <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text> -->

            <b-button href="#"  @click="goTo('habitats')"  variant="primary">Voire les habitats</b-button>
        </b-card>

</div>
    <div class="col-4 mt-5">
        <b-card
            title="Reservation"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
            <!-- <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text> -->

            <b-button href="#" @click="goTo('reservations')" variant="primary">Voire les réservations</b-button>
        </b-card>

  </div>
      </div>

  </div>
</template>
<script>
export default {
    layout:'admin-layout',

  data() {
    return {
     
    };
  },
  mounted(){
      if (!this.checkingAccessRight()) {
      this.$router.push('/')  
    }
  },
  methods: {
    goTo(args) {
      this.$router.push(this.$route.path + "/" + args);
    },
       checkingAccessRight() {     

              return ((this.$route.params.id == this.$warehouse.get("session").userId) && (this.$warehouse.get("session").role == "admin"))
    },

  },
};
</script>
<style lang="">
</style>