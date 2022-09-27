<template lang="">
    <div>
        <b class="text-yellow">Le bolde  {{users}} le motif est : {{motif}}</b>
          <h2>Example heading <b-badge>New</b-badge></h2>
    </div>
</template>
<script>
export default {
data() {
    return {
       username:"Mohamed",
       users :" Les users sont "
    }
}, 

methods: {
    concat(){
       return this.username + " et Cheikh"
    },
    async getUser(){
        try {
            const response = await this.$axios.$get('/users/60336e720e2aed2e037961b7')   
            console.log("La réponse de la fct est :" ,response);
            if(response && response.firstName){
                this.username = response.firstName
            }
        } catch (error) {
            
        }
    }
},
created(){
    this.getUser()
},
mounted() {
    setTimeout(() => {
        console.log(this.motif,'Le motif');
        this.users = this.concat()
    }, 5000);
},
props:{
    motif:{
        type:String,
        default:"Mariage"
    }
},
}
</script>
<style lang="">
    
</style>