import { createRouter , createWebHistory } from "vue-router"
import Home from "./components/front/Home.vue";
// import Single from "./components/front/Single.vue";
// import Panier from "./components/front/Panier.vue";
import Identification from "./components/front/Identification.vue";
import createAccount from "./components/front/CreateAccount.vue";
import Disconnect from "./components/front/Disconnect.vue";
import NotFound from "./components/front/NotFound.vue";
// import Checkout from "./components/front/Checkout.vue";

export const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path : "/" , name : "home" , component: Home},
        // {path : "/produit/:id" , name : "produit" , component: Single},
        // {path : "/panier" , name : "panier" , component: Panier},
        {path : "/identification" , name : "connect" , component: Identification},
        // {path : "/checkout" , name : "checkout" , component: Checkout},
        {path : "/disconnect" , name : "disconnect" , component: Disconnect},
        {path : "/createAccount" , name : "createAccount" , component: createAccount},
        {path : "/:pathMatch(.*)*" , name : "NotFound" , component : NotFound },
    ]
})