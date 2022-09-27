<template lang="">
<div>
    <h6 class=" mebu-line text-dark" style="font-weight:bold; font-size:30px"> Cheikh THIAM
    </h6>

    <b-card>

        <div class="card-body">

            <div class="text-md-lef mb-3">
                <nuxt-link to="/account-settings/personal-info">Informations personelles</nuxt-link>

            </div>

            <div class="text-md-lef  mb-3">

                <nuxt-link to="/hotes/id_hotes/publications">Mes publicaions</nuxt-link>

            </div>

        </div>
    </b-card>

</div>
</template>

<script>
export default {
    layout: 'user-layout',
    data() {
        return {
            edit_legal_name: false,
            userInfo: {}
        };
    },
    mounted() {
        this.userInfo = this.getUserInfo(this.$store.state.session.userId)
    },
    methods: {
        async getUserInfo(userId) {
            try {
                const response = await this.$axios.$get('/users/' + userInfo)
                console.log('Le user Info est là', response);
                return response
            } catch (error) {

            }
        },
        async save() {
            try {
                const response = await this.$axios.$post('/users/' + userInfo.userId + '/update')
                console.log('La réponse de update', response);

            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>

<style lang="css">
.menu-line a {
    text-decoration: none;
}
</style>
