<template lang="">
<div>
    <div class="col-4 offset-4 mt-5">
        <div v-if="alert.type == 0" class="alert alert-success" role="alert">
            {{alert.message}}
        </div>
        <div v-if="alert.type == 1" class="alert alert-danger" role="alert">
            {{alert.message}}
        </div>
    </div>
    <div class="col-4 offset-4 mt-5 card ">
        <form @submit.prevent="login(user)">
            <h2 class="text-center mb-3 mt-4 text-dark">Mot de passe oublié </h2>
            <div class="form-group">
            
                <input type="text" v-model="user.username" class="form-control" placeholder="Email" required="required">
            </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block"> Envoyer</button>
            </div>
        </form>

   

    </div>
</div>
</template>

<script>
import axios from "axios";

// Then, on the setup method

export default {
    layout: 'login',
    data() {
        return {
            user: {},
            alert: {
                type: null,
                message: ""
            }
        };
    },
    mounted() {

        if (this.$store.state.session == {})
            this.$toast.error("Allô")
        // Get current user value
        this.$warehouse.get('user')
        // this.$axios.onError(e => Promise.reject(e.response.data))
    },

    methods: {
       
        async sendEmail(user) {
            console.log(user, 'voici les données reçu du formulaire');

            // try {
            //     const response = await this.$axios.$post(
            //         "/users/login",
            //         user
            //     );
            //     console.log(response)
            //     this.$store.commit('setSession', response)
            //     this.$store.commit('logged', true)
            //     this.$warehouse.set('session', response, 10000)
            //     this.$warehouse.set('isConnected', true, 10000)
            //     console.log(this.$store.state.session, 'le session en cours ');
            //     if (response && response.userId) {
            //         this.$router.push('/' + response.role + 's/' + response.userId)
            //     }

            // } catch (error) {
            //     console.log('ici', error)
            // }

             
        },
    },
};
</script>

<style lang=""> 
</style>
