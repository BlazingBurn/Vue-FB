<template>
    <div class="CreateAccountCustom m-2">

        <div class="d-flex m-3">
            <div class="align-self-center">
                <h2 class="m-auto">Se Connecter</h2>
            </div>
            <div class="align-self-center">
                <img class="connectIMG" src="../../assets/connect-64.png" alt=""/>
            </div>
        </div>

        <form @submit.prevent="submit" class="m-3">

            <div class="mb-4">
                <input type="email" required @focus="show = false" class="form-control" id="email" v-model="email" placeholder="votre@email.fr" autocomplete="pseudo">
            </div>
            
            <div class="mb-4">
                <input type="password" required @focus="show = false" class="form-control" id="password" v-model="password" placeholder="password" autocomplete="new-password">
            </div>

            <div class="mb-4">
                <input type="submit" class="ButtonSubmitConnect" value="Connexion">
            </div>
            <div class="alert alert-danger" v-if="show">
                <div v-for="message, index in messages" :key="index">{{ message }}</div>
            </div>
        </form>

    </div>
</template>

<script setup>
    import {ref} from "vue";
    import {useUserStore} from "../../stores/userStore"
    import Joi from "joi";
    import {useRouter} from "vue-router"
    
    const email = ref("")
    const password = ref("")
    
    let show = ref(false)
    let messages = ref({})
    let router = useRouter()

    async function submit (){
        // réaliser verifications sur les informations saisies dans le formulaire 
        // 8 if // 8 vérifications 
        const validationIdentifiant = Joi.object({
            email : Joi.string().email({ tlds: { allow: false } }).required(),
            password : Joi.string().trim().min(5).max(255).required()
        })

        const identifiants = {
            email : email.value,
            password : password.value
        }
        
        const { error } = validationIdentifiant.validate(identifiants , {abortEarly : false})
        if(error) {
            show.value = true ;
            const details = []
            for(let er of error.details){
                details.push(er.message)
            }
            messages.value = details;
            return ;
        }

        let userStore = useUserStore()
        // se connecter
        const reponse = await userStore.login(identifiants)
        if(reponse.message && reponse.message === "ok"){
            router.push("/")
        }
        console.log(reponse);

    }
</script>

<style>

.CreateAccountCustom {
    border: 3px solid rgb(169, 169, 169);
    border-radius: 4px;
    background-color: rgb(244, 244, 244);
}

.connectIMG {
    width: 35px;
    height: 35px;
}

.ButtonSubmitConnect {
    background-color: green;
    color: white;
    border-radius: 5px;
    border: none;
    padding: 8px;
}

</style>