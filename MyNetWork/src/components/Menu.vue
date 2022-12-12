<template>
    <div class="">
        <nav class="navbar navbar-expand navbar-dark container d-flex flex-column">
            <RouterLink :to="{name : 'home'}" class="navbar-brand text-dark routerSizeCustom">
                MyNetWork <img class="fbIMG" src="../assets/fb-50.png" alt=""/>
            </RouterLink>
            <ul class="navbar-nav d-flex flex-column routerSizeCustom">
                <li class="nav-item border">
                    <RouterLink :to="{name:'home'}" class="nav-link text-dark">
                        <img class="homeIMG" src="../assets/home-30.png" alt=""/> Fils d'actualités
                    </RouterLink>
                </li>

                <div v-if="!isConnected">
                    <li class="nav-item border">
                        <RouterLink :to="{name:'createAccount'}" class="nav-link text-dark">
                            <img class="userIMG" src="../assets/user-50.png" alt=""/> Créer un profil
                        </RouterLink>
                    </li>
                    <li class="nav-item border">
                        <RouterLink :to="{name:'connect'}" class="nav-link text-dark">
                            <img class="connectIMG" src="../assets/connect-64.png" alt=""/> Se connecter
                        </RouterLink>
                    </li>
                </div>
                <div v-else>
                    <RouterLink :to="{name:'disconnect'}" class="nav-link text-dark">
                            <img class="disconnectIMG" src="../assets/disconnect-50.png" alt=""/> Déconnexion
                    </RouterLink>
                </div>

            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        onMounted() {
            show = false;
        }
    }
</script>

<script setup>
    import { RouterLink } from "vue-router"
    import {computed} from "vue"

    import {useUserStore} from "../stores/userStore"
    import { onMounted , ref } from "vue"

    const userStore = useUserStore();
    const isConnected = computed(() => {
        return userStore.user.isLogged ? true : false
    })

    // let show = ref(true)
    // const userStore = useUserStore();
    // onMounted( () => {
    //     if(userStore.user && userStore.user.isLogged){
    //         show.value = false
    //     }
    // })

</script>

<style scoped>

.fbIMG {
    width: 30px;
    height: 30px;
}
.homeIMG {
    width: 20px;
    height: 20px;
}

.userIMG {
    width: 20px;
    height: 20px;
}

.disconnectIMG {
    width: 20px;
    height: 20px;
}

.routerSizeCustom {
    width: 90%;
    text-align: center;
}

</style>