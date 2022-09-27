 
  
 

export default function (context) {
    console.log(context,'ALLLLLLLLLLLLLLLLLLLLÖOÖÖÖÖÖÖÖOÖO============================== >>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>')
    
    
        context.$axios.$get("/categories/").then((response)=>{

            context.store.commit('SetCategories',response);

            console.log(context.store.state.categories,'Hellô form loadAcions');
        })
     
    

}