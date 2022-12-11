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
                <li class="nav-item border">
                    <RouterLink :to="{name:'profil'}" class="nav-link text-dark">
                        <img class="userIMG" src="../assets/user-50.png" alt=""/> Créer un profil
                    </RouterLink>
                </li>
                <li class="nav-item border">
                    <RouterLink :to="{name:'profil'}" class="nav-link text-dark">
                        <img class="connectIMG" src="../assets/connect-64.png" alt=""/> Se connecter
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
    import { RouterLink } from "vue-router"
    import {computed} from "vue"
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

.connectIMG {
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