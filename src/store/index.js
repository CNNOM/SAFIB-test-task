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
            const items = [...state.menuItems, { ...item, children: [] }];
            commit('setMenuItems', items);
        },
        addSubSection({ commit, state }, { sectionIndex, subsection, parentIndex }) {
            const items = [...state.menuItems];
            const section = items[sectionIndex];
            if (!section.children) {
                section.children = [];
            }
            if (parentIndex !== undefined) {
                const parent = findItem(section.children, parentIndex);
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(subsection);
            } else {
                section.children.push(subsection);
            }
            commit('setMenuItems', items);
        }
    }
});

function findItem(items, index) {
    for (let i = 0; i < items.length; i++) {
        if (i === index) {
            return items[i];
        }
        if (items[i].children) {
            const found = findItem(items[i].children, index);
            if (found) {
                return found;
            }
        }
    }
    return null;
}