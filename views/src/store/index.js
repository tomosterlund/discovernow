import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {},
        courseCreatorPage: 0,
        currentCourse: '',
        currentCourseObject: {},
        currentVideo: '',
        currentVideoObject: {},
        currentWatchedCourse: {},
        lastSearchResults: {},
        lastSearchInput: '',
        loadingDone: true
    },
    getters: {
        lastSearchResults: state => {
            return state.lastSearchResults;
        },
        lastSearchInput: state => {
            return state.lastSearchInput;
        }
    },
    mutations: {
        lastSearchResults: (state, param) => {
            state.lastSearchResults = param;
        },
        lastSearchInput: (state, param) => {
            state.lastSearchInput = param;
        },
        loadingDone: state => {
            state.loadingDone = !state.loadingDone;
        }
    },
    actions: {
        lastSearchResults: (context, param) => {
            context.commit('lastSearchResults', param);
        }
    }
})
