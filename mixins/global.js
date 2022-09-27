import { BIconArrowDownLeftCircleFill } from "bootstrap-vue";

export default{
   async callServer (fctArgs,action){
        console.log('Dans le callServer');
        const response = await this.$axios[action]( fctArgs)
    }

}