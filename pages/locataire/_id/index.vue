<template lang="">
<div>

    <div class="card-columns">
        {{number}}
        <div v-for="habitat in habitats" :key="habitat.id" class="card" style="width:300px">
            <img class="card-img-top" src="img_avatar1.png" alt="Card image">
            <div class="card-body">
                <h4 class="card-title">{{habitat.name}}</h4>
                <p class="card-text">{{habitat.description}}</p>
                <a href="#" class="btn btn-yellow" @click="reserver(habitat)">Reserver</a>
            </div>
        </div>
    </div>
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
