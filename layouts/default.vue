<template>
<div>

    <div class="mt-3"> </div>

    <div id="navbar" class="d-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-1 border-bottom box-shadow">
        <h5 class="my-0 mr-md-auto font-weight-normal">
            <img style="height: 49px; width: 76px" src="~/assets/images/logo1_V1.png" />
        </h5>

        <h5 class="my-0 mr-md-auto font-weight-normal" id="second_menu" style="display:none">
            <b-button variant="dark" @click="openSearchBox()" class="btn-sm mr-1"> Rechercher <b-icon icon="search" style="width:13px; height:13px; top:50%; position:relative"></b-icon>
            </b-button>
        </h5>

        <nav class="my-2 my-md-0 mr-md-3" v-if="!$warehouse.get('isConnected')">
            <b class="p-2 text-dark ">
                <b-icon icon="person-circle"></b-icon> {{ this.$warehouse.get("session").firstName  }} {{this.$warehouse.get("session").lastName }}
            </b>

        </nav>
        <NuxtLink to="/login" class="btn btn-outline-dark" v-if="!$warehouse.get('isConnected')">Se connecter</NuxtLink>
        <a v-else class="btn btn-outline-dark" @click="logout()"> Se déconnecter</a>
        <b>
        </b>

    </div>

    <div id="cadre" class="d-flex flex-column flex-md-row align-items-center p-2 px-md-3 mb-3 bg-white border-bottom box-shadow">
        <div class="rows">
            <div class="col-12 offset-2">
                <b-form inline>
                    <div class="form-group">
                        <b-form-datepicker v-model="value" :min="min" :max="max" locale="en"></b-form-datepicker>

                    </div>

                    <div class="form-group ml-3 mr-3">
                        <b-form-datepicker v-model="value" :min="min" :max="max" locale="en"></b-form-datepicker>

                    </div>

                    <b-button variant="yellow">Rechercher</b-button>
                </b-form>
            </div>
        </div>
    </div>

    <div class="container">
        <Nuxt />
    </div>

</div>
</template>

<script>
import {
    BIcon,
    BIconArrowUp
} from 'bootstrap-vue'

export default {
    components: {
        BIcon,
        BIconArrowUp
    },
    // middleware: ['authenticated', 'stats'],
    mounted() {
        console.log("ALLLLLLLLLLLLLLLLLLLLLÖ", this.$store.state.session);
        var self = this;

        self.navbar = document.getElementById("navbar");
        self.cadre = document.getElementById("cadre");
        self.second_menu = document.getElementById("second_menu");

    },
    methods: {
        logout() {
            this.$router.push('/login')
            this.$warehouse.set("isConnected", false);
            this.$warehouse.set("session", {});
        },
        openSearchBox() {
                self.second_menu.style.display = "none";

            if (self.cadre) {
                self.cadre.style.top = this.getCurrentHeight(["navbar"]) - 1 + "px";
                self.cadre.classList.add("sticky");
                self.cadre.classList.remove("bg-dark");
                self.cadre.classList.add("bg-white");
                self.cadre.style.zIndex = "1";
                self.cadre.style.display = "block";
                self.second_menu.style.display = "none";    

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
        } 
    }
};
</script>

<style>
html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #f5f5f5;
}
</style>
