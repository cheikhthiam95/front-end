export const state = () => ({
  session: {},
  isLogged : false,
  currentHote:{},
  currentHabitat:{},
  categories:[],


});
export const mutations = {
  setSession(state, session) {
    state.session = session;
  },
  setCurrentHote(state, hote) {
    state.currentHote = hote;
  },
  setCurrentHabitat(state, habitat) {
    state.currentHabitat = habitat;
  },
  logged(state, isLogged) {
    state.isLogged = isLogged;
  },
  SetCategories(state, categories) {
    state.categories = categories;
  }
};
