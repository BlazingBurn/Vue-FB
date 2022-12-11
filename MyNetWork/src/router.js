import { createRouter , createWebHistory } from "vue-router"
import Home from "./components/front/Home.vue";
// import Single from "./components/front/Single.vue";
// import Panier from "./components/front/Panier.vue";
// import Identification from "./components/front/Identification.vue";
import Profil from "./components/front/Profil.vue";
import NotFound from "./components/front/NotFound.vue";
// import Checkout from "./components/front/Checkout.vue";

export const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path : "/" , name : "home" , component: Home},
        // {path : "/produit/:id" , name : "produit" , component: Single},
        // {path : "/panier" , name : "panier" , component: Panier},
        // {path : "/identification" , name : "identification" , component: Identification},
        // {path : "/checkout" , name : "checkout" , component: Checkout},
        {path : "/profil" , name : "profil" , component: Profil},
        {path : "/:pathMatch(.*)*" , name : "NotFound" , component : NotFound },
    ]
})