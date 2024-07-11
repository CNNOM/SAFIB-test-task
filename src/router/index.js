import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import LoginView from "@/views/LoginView.vue";
import TheSection from "@/components/TheSection.vue";
import TheSubSection from "@/components/TheSubSection.vue";
import ContentCreation from "@/components/admin/ContentCreation.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {breadcrumb: 'Главная'}

        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView,
            meta: {requiresAuth: true}

        },
        {
            path: '/content',
            name: 'content',
            component: ContentCreation,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },

        {
            path: '/section/:index',
            name: 'section',
            component: TheSection,
            meta: {
                breadcrumb: (route, menuItems) => {
                    const index = route.params.index;
                    const section = menuItems[index];
                    return section ? section.name : 'Неизвестный раздел';
                }
            }
        },
        {
            path: '/section/:index/:subIndex',
            name: 'subIndex',
            component: TheSubSection,
            meta: {
                breadcrumb: (route, menuItems) => {
                    const index = route.params.index;
                    const subIndex = route.params.subIndex;
                    const section = menuItems[index];
                    if (section && section.subsections && section.subsections[subIndex]) {
                        return section.subsections[subIndex].name;
                    }
                    return 'Неизвестный подраздел';
                }
            }

        }
    ]
})

router.beforeEach((to, from, next) => {
    const authenticated = localStorage.getItem('authenticated');
    if (to.matched.some(record => record.meta.requiresAuth) && !authenticated) {
        next('/login');
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    const breadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs')) || [];
    const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    const newBreadcrumb = {
        name: typeof to.meta.breadcrumb === 'function' ? to.meta.breadcrumb(to, menuItems) : to.meta.breadcrumb || to.name,
        path: to.path
    };

    if (to.path === '/') {
        localStorage.setItem('breadcrumbs', JSON.stringify([newBreadcrumb]));
    } else {
        const index = breadcrumbs.findIndex(crumb => crumb.path === to.path);
        if (index !== -1) {
            breadcrumbs.splice(index + 1);
        } else {
            breadcrumbs.push(newBreadcrumb);
        }
        localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
    }

    next();
});

export default router
