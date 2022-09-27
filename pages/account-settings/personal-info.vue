<template lang="">
  <div>
    <h6 class=" mebu-line text-dark">
      <nuxt-link to="/account-settings">Compte</nuxt-link><span> > </span
      ><nuxt-link to="">Informations personelles</nuxt-link>
    </h6>
    <h3 class="text-dark text- mt-3">Informations personelles</h3>

    <div class="row">
      <div class="col-11">
        <div>Nome légal {{this.$store.state.session.role}}</div>
        <div v-if="!edit_legal_name">Cheikh THIAM</div>
        <div v-else class="row">
            <div class="col-6"> <b-form-group id="fieldset-1" label="Prénom" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="edit_legal_name"
              :state="error"
              trim
            ></b-form-input>
          </b-form-group></div>
          <div class="col-6"> <b-form-group id="fieldset-2" label="Nom" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="edit_legal_name"
              :state="error"
              trim
            ></b-form-input>
          </b-form-group>
          </div>

          <div class="col-6">
                <b-button variant="primary" @click="save(userInfo)">Enrégistrer</b-button>

          </div>
        </div>
        
        <hr />
      </div>
      <div class="col-1" @click="edit_legal_name = !edit_legal_name">
        {{ !edit_legal_name ? "Modifier" : "Annuler" }}
      </div>
    </div>
     <div class="row">
      <div class="col-11">
        <div>Nome légal</div>
        <div v-if="!edit_legal_name">{{userInfo.firstName}} {{userInfo.lastName}}</div>
        <div v-else class="row">
            <div class="col-6"> <b-form-group id="fieldset-1" label="Prénom" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="edit_legal_name"
              :state="error"
              trim
            ></b-form-input>
          </b-form-group></div>
          <div class="col-6"> <b-form-group id="fieldset-2" label="Nom" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="edit_legal_name"
              :state="error"
              trim
            ></b-form-input>
          </b-form-group></div>
        </div>
        
        <hr />
      </div>
      <div class="col-1" @click="edit_legal_name = !edit_legal_name">
        {{ !edit_legal_name ? "Modifier" : "Annuler" }}
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  layout:'user-layout',
  data() {
    return {
      edit_legal_name: false,
      userInfo:{}
    };
  },
  mounted() {
    this.userInfo = this.getUserInfo(this.$store.state.session.userId)
  },
  methods:{
    async getUserInfo(userId){
      try {
        const response = await this.$axios.$get('/users/'+userInfo)
        console.log('Le user Info est là',response);
        return response
      } catch (error) {
        
      }
    },
    async save(){
      try {
     const response =  await this.$axios.$post('/users/'+userInfo.userId+'/update')
     console.log('La réponse de update',response);
        
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
