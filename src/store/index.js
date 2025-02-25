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
        },
        toggleSubsections(state, index) {
            state.menuItems[index].showSubsections = !state.menuItems[index].showSubsections;
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
            const items = [...state.menuItems, { ...item, subsections: [] }];
            commit('setMenuItems', items);
        },
        addSubSection({ commit, state }, { sectionIndex, subsection }) {
            const items = [...state.menuItems];
            const section = items[sectionIndex];
            if (!section.subsections) {
                section.subsections = [];
            }
            section.subsections.push(subsection);
            commit('setMenuItems', items);
        },
    }
});