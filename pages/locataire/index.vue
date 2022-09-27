<template lang="">
  <div>

 <div class="col-6 offset-3 mt-5">
    <form @submit.prevent="register(locataire)">
        <h2 class="text-center">Crééer un compte</h2>       
        <div class="form-group">
            <input type="text" v-model="locataire.firstName" class="form-control" placeholder="fistName" required="required">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" v-model="locataire.lastName" placeholder="lastName" required="required">
        </div>
         <div class="form-group">
            <input type="email" class="form-control" v-model="locataire.email" placeholder="email" required="required">
        </div>
         <div class="form-group">
            <input type="telephone" class="form-control" v-model="locataire.telephone" placeholder="telephone" required="required">
        </div>
           <div class="form-group">
            <input type="text" class="form-control" v-model="locataire.adresse" placeholder="adresse" required="required">
        </div>
            <div class="form-group">
            <input type="text" class="form-control" v-model="locataire.city" placeholder="ville" required="required">
        </div>
            <div class="form-group">
            <input type="text" class="form-control" v-model="locataire.country" placeholder="country" required="required">
        </div>
            <div class="form-group">
            <input type="password" class="form-control" v-model="locataire.password" placeholder="password" required="required">
        </div>
           <div class="form-group">
            <input type="password" class="form-control" v-model="locataire.password_confirm" placeholder="password_confirm" required="required">
        </div>
        
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Register</button>
        </div>

    </form> 
</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            habitats: {},
            number: 0,
        };
    },

    mounted() {
        this.gethabitats();
        this.gethabitatsReserved();
    },
    methods: {
        async gethabitatsReserved() {
            try {
                this.number = await this.$axios.$get("/reservations/count");
                console.log(this.number);
            } catch (error) {
                console.log(error);
            }
        },
        async gethabitats() {
            try {
                this.habitats = await this.$axios.$get("/habitats/");
                console.log(this.habitats);
            } catch (error) {
                console.log(error);
            }
        },
        async reserver(habitat) {
            console.log("Réservercalled", habitat);
            const args = {
                id_locataire: "9999999999999999999",
                id_habitat: habitat.id,
                periode: "du  12 au 20",
            };

            const response = await this.$axios.$post(
                "/reservations/newReservation/",
                args
            );
            console.log(response);
            console.log("La réponse de addReservation est : ", response);
            this.gethabitatsReserved();
            if (response && response.id) {
                // this.$router.push('/habitats/'+response.id)
                console.log("La réponse de addReservation est : ", response);
            }
        },
    },
};
</script>

<style lang="">
</style>