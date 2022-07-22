import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { locals } from "backend/app"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: null,
        isLogin: false
    },
    mutations: {
        loginSuccess(state, payload) {
            state.isLogin = true
            state.userInfo = payload
        },
        logout(state) {
            state.isLogin = false
            state.userInfo = null
            localStorage.removeItem("access_token")
        }
    },
    actions: {
        getAccountInfo({ commit }) {
            let token = locals.getItem("access_token")
            axios.get("/userinfo", {
                headers: {
                    "X-AUTH-TOKEN": token
                }
            })
            .then((res) => {
                commit("loginSuccess", res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    modules: {}
})