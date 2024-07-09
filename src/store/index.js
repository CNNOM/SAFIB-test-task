import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        authenticated: localStorage.getItem('authenticated') || false,
        menuItems: JSON.parse(localStorage.getItem('menuItems')) || []
    },
    mutations: {
        setAuthenticated(state, status) {
            state.authenticated = status;
            localStorage.setItem('authenticated', status);
        },
        setMenuItems(state, items) {
            state.menuItems = items;
            localStorage.setItem('menuItems', JSON.stringify(items));
        }
    },
    actions: {
        login({ commit }, { username, password }) {
            if (username === 'admin' && password === 'password') {
                commit('setAuthenticated', true);
                return true;
            }
            return false;
        },
        addMenuItem({ commit, state }, item) {
            const items = [...state.menuItems, item];
            commit('setMenuItems', items);
        }
    }
});