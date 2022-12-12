<template>
    
    <div class="DisconnectCustom m-2">

        <div class="d-flex m-3">
            <div class="align-self-center">
                <h2 class="m-auto">Voulez vous vraiment vous déconnecter ?</h2>
            </div>
            <div class="align-self-center">
                <img class="disconnectIMG" src="../../assets/disconnect-50.png" alt=""/>
            </div>
        </div>

        <div class="m-3 d-flex justify-content-around">
            <div class="mb-4">
                <button type="submit" class="ButtonDecoYes" @click.prevent="DecoYes">
                    OUI
                </button>
            </div>
            <div class="mb-4">
                <button type="submit" class="ButtonDecoNo" @click.prevent="DecoNo">
                    NON
                </button>           
            </div>
        </div>

    </div>

</template>

<script setup>
    import {useUserStore} from "../../stores/userStore"
    import {useRouter} from "vue-router"

    let router = useRouter()
    let userStore = useUserStore()

    async function DecoYes() {
        // déconnexion
        const reponse = await userStore.logout()
        if(reponse.message && reponse.message === "ok"){
            router.push("/")
        }
        console.log(reponse);
    }

    async function DecoNo() {
        // déconnexion
        router.push("/")
    }

</script>

<style>

.DisconnectCustom {
    border: 3px solid rgb(169, 169, 169);
    border-radius: 4px;
    background-color: rgb(244, 244, 244);
}

.ButtonDecoYes {
    background-color: green;
    color: white;
    border-radius: 5px;
    border: none;
    padding: 8px;
}
.ButtonDecoNo {
    background-color: red;
    color: white;
    border-radius: 5px;
    border: none;
    padding: 8px;
}

</style>