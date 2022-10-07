import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false
});


// Mutations constantes
const SET_POSTS = 'SET_POSTS'
const SET_POSTS_ACTU = 'SET_POSTS_ACTU'
const SET_ALL_POSTS = 'SET_ALL_POSTS'
const SET_CONTACT = 'SET_CONTACT'
const SET_COMPANY = 'SET_COMPANY'
const SET_RECRUTING = 'SET_RECRUTING'
const SET_SERVICES = 'SET_SERVICES'
const SET_OUR_SERVICES = 'SET_OUR_SERVICES'
const SET_SOLUTIONS_LIST = 'SET_SOLUTIONS_LIST'
const SET_PAGE_HEADER = 'SET_PAGE_HEADER'
const SET_MENTIONS_LEGUALES = 'SET_MENTIONS_LEGUALES'
const SET_PRIVACY = 'SET_PRIVACY'
const SET_COOCKIES_PAGE = 'SET_COOCKIES_PAGE'
const SET_RECENTS_POSTS = 'SET_RECENTS_POSTS'
const SET_CURRENT_POST = 'SET_CURENT_POST'
const SET_PREV_POST = 'SET_PREV_POST'
const SET_NEXT_POST = 'SET_NEXT_POST'
const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_CURRENT_CATEGORIE = 'SET_CURRENT_CATEGORIE'
const SET_NOS_CLIENTS = 'SET_NOS_CLIENTS'
const SET_LOADER = 'SET_LOADER'
const SET_DEMO = 'SET_DEMO'
const SET_POST_BY_CATEGORIE = 'SET_POST_BY_CATEGORIE'





export const state = () => ({
    posts: [],
    allPosts: [],
    postsActu: [],
    recentsPosts: [],
    currentPost: {},
    previousPost: {},
    nextPost: {},
    categories: [],
    currentCategorie: { name: "all" },
    contact: "",
    company: "",
    recruting: "",
    services: "",
    demo: "",
    ourServices: "",
    solutionList: "",
    pageHeader: "",
    mentionsLeguales: "",
    coockies_page: "",
    privacy: "",
    nosClients: "",
    postsByCategorie: {}, 
    isReady: true



})

export const getters = {
    posts: state => state.posts,
    allPosts: state => state.allPosts,
    postsActu: state => state.postsActu,
    recentsPosts: state => state.recentsPosts,
    currentPost: state => state.currentPost,
    nextPost: state => state.nextPost,
    previousPost: state => state.previousPost,
    categories: state => state.categories,
    currentCategorie: state => state.currentCategorie,
    contact: state => state.contact,
    company: state => state.company,
    recruting: state => state.recruting,
    services: state => state.services,
    demo: state => state.demo,
    ourServices: state => state.ourServices,
    solutionList: state => state.solutionList,
    pageHeader: state => state.pageHeader,
    mentionsLeguales: state => state.mentionsLeguales,
    privacy: state => state.privacy,
    coockies_page: state => state.coockies_page,
    nosClients: state => state.nosClients,
    postsByCategorie: state => state.postsByCategorie,
    loading: state => state.loading,
    isReady: state => state.isReady
}

export const actions = {

    async getAllPosts({ commit, state, }) {
        if (state.allPosts.length == 0) {

            const response = await this.$axios.$get("/posts", { httpsAgent: agent });
            if (response) { commit(SET_ALL_POSTS, response); }
            return response;

        }
        else {
            return []
        }


    },

    async getPage({ commit, state }, requestInfo) {
        if (state[requestInfo.state] == "") {

            const response = await this.$axios.$get("/pages/" + requestInfo.page, { httpsAgent: agent });
            if (response) { commit(requestInfo.mutation, response.post_content); }
            return response;

        } else {
            return "";
        }
    }, async setNextPrevPost({ commit, state }) {

        let arr = state.currentCategorie.name == 'all' ? Object.entries(state.allPosts) : Object.entries(state.postsByCategorie[state.currentCategorie.id].posts)
        await Promise.all(arr.map(async (post, index) => {

            if (post && state.currentPost.id == post[1].id) {
                commit(SET_PREV_POST, arr[index - 1] && arr[index - 1][1] ? arr[index - 1][1] : {})
                commit(SET_NEXT_POST, arr[index + 1] && arr[index - 1][1] ? arr[index + 1][1] : {})
            }




        }));
    },

    async getRecentsPosts({ commit, state }) {
        const response = await this.$axios.$get("/recentsPosts", { httpsAgent: agent });
        if (response) { commit(SET_RECENTS_POSTS, response); }

        return response;

    },
    async setCurrentCategorie({ commit, state }, cat) {


        commit(SET_CURRENT_CATEGORIE, cat)

        if (cat.name == 'all') {
            commit(SET_POSTS, state.allPosts)
        } else {
            commit(SET_POSTS, state.postsByCategorie[cat.id])
        }

        return cat;

    }, async setPosts({ commit }, posts) {


        commit(SET_POSTS, posts)
        return posts;

    },
    async setCurrentPost({ commit }, post) {

        commit(SET_CURRENT_POST, post)
        return post;

    },  setLoader({ commit }, load) {

        commit(SET_LOADER, load)

    },

    async getCategories({ commit }) {

        const response = await this.$axios.$get("/categories", { httpsAgent: agent });
        if (response) { commit(SET_CATEGORIES, response); }
        return response;

    },


    async setPostsActu({ commit, state }) {
        if (state.postsActu.length == 0) {

            const response = await this.$axios.$get("/search?category=6", { httpsAgent: agent });
            if (response) { commit(SET_POSTS_ACTU, response); }

            return response;
        } else {
            return []
        }


    },

    async searchPost({ commit, state }, term = "") {   
        const response = await this.$axios.$get("/search?term=" +
            term +
            "&category=" +
            state.currentCategorie.id, { httpsAgent: agent });
        if (response) { commit(SET_POSTS, response); }
        return response;

    },



    async getPostByCategorie({ commit, state }) {


        const a = await Promise.all(state.categories.map(async (cat) => {



            if (cat.slug != 'actualite-accueil' && cat.slug != 'non-classe') {
                const response = await this.$axios.$get("/search?term=" +
                    "&category=" +
                    cat.id, { httpsAgent: agent });
                if (response) commit(SET_POST_BY_CATEGORIE, { id: cat.id, posts: response, catInfos: cat });
                return response
            }




        }));

        if (a) {
            return a

        }

        // state.categories.forEach(async (cat, index) => {

        //     const response = await this.$axios.$get("/search?term=" +
        //         "&category=" +
        //         cat.id);
        //     if (response) commit(SET_POST_BY_CATEGORIE, { id: cat.id, posts: response, catInfos: cat });


        //     console.log(cat, "====>", index, index === state.categories.length - 1)
        //     if (index === state.categories.length - 1) {
        //         console.log(cat, "=>", index, index === state.categories.length - 1)
        //         return "cheikh";
        //     }
        // });






    },

    async getCatBySlug({ commit }, slug) {

        const response = await this.$axios.$get(
            "/categories/" + slug
            , { httpsAgent: agent })

        if (response) { commit(SET_CURRENT_CATEGORIE, response); }
        commit(SET_LOADER, false);

        return response;
    },

    async getPostBySlug({ commit }, slug) {

        const response = await this.$axios.$get(
            "/posts/" + slug
            , { httpsAgent: agent })

        if (response) { commit(SET_CURRENT_POST, response); }

        return response;
    },


}

export const mutations = {
    [SET_POSTS](state, posts) {
        state.posts = posts 


    }, [SET_POSTS_ACTU](state, postsActu) {
        state.postsActu = postsActu

    }, [SET_ALL_POSTS](state, posts) {
        state.allPosts = posts
    }
    , [SET_CURRENT_POST](state, currentPost) {
        state.currentPost = currentPost
    }
    , [SET_PREV_POST](state, prev) {
        state.previousPost = prev
    }, [SET_NEXT_POST](state, next) {
        state.nextPost = next
    }
    , [SET_CURRENT_POST](state, currentPost) {
        state.currentPost = currentPost
    }
    , [SET_CURRENT_CATEGORIE](state, currentCategorie) {
        state.currentCategorie = currentCategorie
    }
    , [SET_RECENTS_POSTS](state, recentsPosts) {
        state.recentsPosts = recentsPosts
    }
    , [SET_CATEGORIES](state, categories) {
        state.categories = categories
    },
    [SET_CONTACT](state, contact) {
        state.contact = contact
    },
    [SET_COMPANY](state, company) {
        state.company = company
    },
    [SET_RECRUTING](state, recruting) {
        state.recruting = recruting
    },
    [SET_SERVICES](state, services) {
        state.services = services
    },
    [SET_SOLUTIONS_LIST](state, solutionList) {
        state.solutionList = solutionList
    }
    , [SET_OUR_SERVICES](state, ourServices) {
        state.ourServices = ourServices
    }, [SET_PAGE_HEADER](state, pageHeader) {
        state.pageHeader = pageHeader
    }
    , [SET_MENTIONS_LEGUALES](state, mentionsLeguales) {
        state.mentionsLeguales = mentionsLeguales
    }
    , [SET_PRIVACY](state, privacy) {
        state.privacy = privacy
    }
    , [SET_COOCKIES_PAGE](state, coockies_page) {
        state.coockies_page = coockies_page
    }, [SET_NOS_CLIENTS](state, nosClients) {
        state.nosClients = nosClients
    },
    [SET_LOADER](state, loader) {
        state.isReady = loader
    }
    ,
    [SET_DEMO](state, demo) {
        state.demo = demo
    }, [SET_POST_BY_CATEGORIE](state, args) {
        state.postsByCategorie[args.id] = {}
        state.postsByCategorie[args.id]['posts'] = args.posts
        state.postsByCategorie[args.id]['catInfos'] = args.catInfos
    }



}
