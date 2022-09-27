<template lang="">
<div>

    <div class="col-lg-4 offset-lg-4 col-sm-8 offset-sm-2  col-md-6 offset-md-3   mt-5 card">
        <form @submit.prevent="register(newUser)">
            <h2 class="text-center mb-3 mt-4 text-dark">{{text.title}}</h2>
            <div class="form-group">
                <input type="text" v-model="newUser.firstName" class="form-control" placeholder="Prénom" required="required">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" v-model="newUser.lastName" placeholder="Nom" required="required">
            </div>
            <div class="form-group">
                <input type="email" class="form-control" v-model="newUser.email" placeholder="Adresse e-mail" required="required">
            </div>
            <div class="form-group">
                <input type="telephone" class="form-control" v-model="newUser.telephone" placeholder="Télépnoe" required="required">
            </div>
            <div class="form-group">
                <!-- input type="text" class="form-control" v-model="newUser.addresse" placeholder="Adresse" required="required" !-->

                <vue-google-autocomplete ref="address_ATYPIK" id="map" classname="form-control" placeholder="Please type your address" v-on:placechanged="getAddressData" country="fr" openNow=true>
                </vue-google-autocomplete>
            </div>

            <div class="form-group">
                <b-form-file v-model="newUser.avatar" :state="Boolean(file1)" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" v-model="newUser.password" placeholder="Mot de passe" required="required">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" v-model="newUser.password_confirm" placeholder="Confirmation du mot de passe" required="required">
            </div>

            <div class="form-group col-6  offset-3  mt-1">
                <button type="submit" class="btn btn-primary btn-block">Enrégistrer</button>
            </div>

            <div class="form-group  mt-1">
                <nuxt-link to="/login">
                    <p class="text-md-left">Vous avez déjà un compte ? </p>
                </nuxt-link>
            </div>

        </form>
    </div>
</div>
</template>

<script>
import axios from "axios";
import VueGoogleAutocomplete from 'vue-google-autocomplete'
// Then, on the setup method

export default {
    components: {
        VueGoogleAutocomplete
    },
    layout: "login",
    props: {
        redirectTo: {
            type: String,
            default: "users",
        },
        role: {
            type: String,
            default: "",
            required: true,
        },
        stateDestination: {
            type: String,
            default: "",
            required: true,
        },
        text: {
            type: Object,
            default: {
                title: "DEFAULT_TITLE"
            },
            required: true,
        },
    },
    data() {
        return {
            newUser: {},
            password: "",
            username: "",
            addresse: ''
        };
    },
    mounted() {
        // if (this.$store.state.session == {}) this.$toast.error("Allô");
        // Get current newUser value
        // this.$warehouse.get("newUser");
        // this.$axios.onError(e => Promise.reject(e.response.data))
    },

    methods: {
        async register(newUser) {
            (this.password = newUser.password), (this.username = newUser.email);
  
                 newUser.avatar.path = newUser.avatar.$path;
          delete (newUser.avatar.$path)          
          console.log(newUser, "voici les données reçu du formulaire");
            try {
                const response = await this.$axios.$post("/users/newUser", {
                    ...newUser,
                    role: this.role,
                    username: newUser.email,
                });
                console.log(response);
                if (response && response.id) {
                    // this.$store.commit("setCurrentHote", response);
                    console.log(
                        "Voici le current hote",
                        this.$store.state[this.stateDestination]
                    );
                    this.login(response);
                    this.$router.push(this.redirectTo + "/" + response.id);
                }
            } catch (error) {
                console.log("ici", error);
            }

            // const response = await axios.post(
            //   "http://localhost:5000/api/locataire/login", newUser

            // );
            // this.alert = response.data
            // if(response && response.data.message && response.data.message.type == 0)
            // {
            //   this.$store.commit("setSession",response.data.session)
            // }
            // console.log(response, 'Et le alert est', this.$store.state.session);
            // this.$router.push("/locataire")
        },
        async login() {
            console.log("Login depuis newUSer");

            try {
                const password = this.password;
                const username = this.username;
                const response = await this.$axios.$post("/users/login", {
                    ...{},
                    username,
                    password,
                });
                console.log(response);
                this.$store.commit("setSession", response);
                this.$warehouse.set("session", response, 1000);
                console.log(this.$store.state.session, "le session en cours session");
                if (response && response.id) {
                    switch (response.role) {
                        case "admin":
                            this.$router.push("/users");
                            break;
                        case "hote":
                            this.$router.push("/hote");
                            break;

                        case "locataire":
                            this.$router.push("/locataire");
                            break;

                        default:
                            this.$router.push("/users");
                    }
                }
            } catch (error) {
                console.log("ici", error);
            }
        },
        /**
         * When the location found
         * @param {Object} addressData Data of the found location
         * @param {Object} placeResultData PlaceResult object
         * @param {String} id Input container ID
         */
        getAddressData: function (addressData, placeResultData, id) {
            this.newUser.addresse = {
                fullAddesse: addressData,
                formatted_address: placeResultData.formatted_address
            }

            console.log(" addressData, placeResultData, id ===>", addressData, placeResultData, id)
        }
    },
};
</script>

<style lang="">
</style>
