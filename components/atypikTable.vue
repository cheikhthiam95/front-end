<template lang="">
<div>
    <div class="row">
        <div class="row">
            <NuxtLink :to="'/admins/'+this.$route.params.id ">Admin</NuxtLink> > {{ this.texts.title }}s

            <br> <br> <br> <br> <br>

            <b-table striped hover :fields="fields" :items="items" responsive="sm">

                <template #cell()="data">
                    <i>{{ data.value }}</i>
                </template>

                <template #cell(action)="data">

                    <div style="margin-right:2px" v-for="(action,index) in data.item.action" :key="index" :class="action.class" @click="deleteELement(data.item._id)">
                        
                            <¯b-icon :icon="action.icon"> </b-icon>
                        
                    </div>
                </template>

            </b-table>

           
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    props: {
        texts: {
            default: function () {
                return {
                    title: "DEFAULT_TITLE"
                };
            },
            type: Object
        },
        titles: {
            type: Object,
            default: function () {
                return {};
            }
        },
        items: {
            type: Array,
            default: function () {
                return [];
            }
        },
        fields: {
            type: Array,
            default: function () {
                return [{

                }]

            }
        }

    },
    methods: {

        async deleteELement(id) {
            try {
                const res = await this.$axios.$delete("/users/" + id);
                console.log(res);
                this.getHotes();
            } catch (error) {
                console.log(error);
            }
        },

        async getHotes() {
            try {
                this.items = await this.$axios.$get("/users/findAllBy/" + this.texts.title);
                console.log(this.items);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style lang=""></style>
