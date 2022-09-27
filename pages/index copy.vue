<template lang="">
<div class="bg-img" style=" background-image: url('_nuxt/assets/images/carousel.png')">

    <div class="card-columns" id="porte">
        <div v-for="categorie in categories" :key="categorie.id" class="card" style="width:300px">

            <img class="card-img-top" src="https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=480" alt="Card image">
            <div class="card-body">
                <h4 class="card-title">{{categorie.name}}</h4>
                <p class="card-text">

                    <NuxtLink :to="'/categories/'+categorie.id ">{{categorie.description}} </NuxtLink>
                </p>

            </div>

        </div>

    </div>
    
</div>
</template>

<script>
export default {
    layout: "index_layout",
    data() {
        return {
            habitats: {},
            categories: {},

            number: 0,
        };
    },

    mounted() {

        var self = this;

        self.navbar = document.getElementById("navbar");
        self.cadre = document.getElementById("cadre");
        self.second_menu =  document.getElementById("second_menu");

        this.sticky = self.navbar.offsetTop;

        window.onscroll = function () {
            self.documentIsCrolled();
        };

        // this.getCategories();
        // this.gethabitatsReserved();

    },
    methods: {

        documentIsCrolled() {
            console.log("Akkkkkkkkkkkkk", window.pageYOffset, self.navbar.offsetTop)

            if (window.pageYOffset >= this.sticky) {
                if (self.navbar) {
                    self.navbar.style.paddingTop = ".20cm";
                    self.navbar.classList.add("sticky");
                    self.navbar.classList.add("bg-white");
                    self.navbar.style.zIndex = "1";

                }
                if (self.cadre) {
                    self.cadre.style.top = this.getCurrentHeight(["navbar"]) - 1 + "px";
                    // self.cadre.classList.add("sticky");
                    // self.cadre.classList.remove("bg-dark");
                    // self.cadre.classList.add("bg-white");
                    // self.cadre.style.zIndex = "1";
                    self.cadre.style.display = "none";
                   if(!this.hasClass(self.cadre,'sticky')){
                        self.second_menu.style.display = "block";
                   }else{
                    // self.cadre.classList.remove("sticky");

                   }


                }

            } else {
                if (self.navbar) {
                    self.navbar.classList.remove("sticky");
                    self.navbar.classList.remove("bg-white");
                    self.navbar.style.paddingTop = "unset"; 
                }
                if (self.cadre) {
                    self.cadre.classList.remove("sticky");
                    self.cadre.style.paddingTop = "0";
                    self.cadre.style.zIndex = "0"; 
                    self.cadre.style.display = "block";
                    self.second_menu.style.display = "none";
                }

            }
        },
        async getHabitatsByCategories(catId) {
            try {
                this.categories = await this.$axios.$get("/categories/", catId);
                console.log(this.categories);
            } catch (error) {
                console.log(error);
            }
        },
        async getCategories() {
            try {
                this.categories = await this.$axios.$get("/categories/");
                console.log(this.categories);
            } catch (error) {
                console.log(error);
            }
        },
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
        getCurrentHeight(ids) {
            let height = 0;
            for (var i = 0; i < ids.length; i++) {
                if (document.getElementById(ids[i])) {
                    height = height + document.getElementById(ids[i]).offsetHeight;
                }
            }
            console.log('Houyaaa', height)
            return height;
        },

        hasClass(element, className) {
            return (
                (" " + element.className + " ").indexOf(" " + className + " ") > -1
            );
        }
    },
};
</script> 

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family:
        'Quicksand',
        'Source Sans Pro',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}

.sticky {
    position: fixed;
    top: 0;
    width: 100%;
}
</style>
