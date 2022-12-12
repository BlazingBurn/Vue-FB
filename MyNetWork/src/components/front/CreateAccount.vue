<template>
    
    <div class="CreateAccountCustom m-2">

        <div class="d-flex m-3">
            <div class="align-self-center">
                <h2 class="m-auto">Créer un nouveau profil</h2>
            </div>
            <div class="align-self-center">
                <img class="userIMG" src="../../assets/user-50.png" alt=""/>
            </div>
        </div>

        <form @submit.prevent="submit" class="m-3">
            <div class="mb-4">
                <input type="text" required @focus="show = false" class="form-control" id="pseudo" v-model="pseudo" placeholder="pseudo">
            </div>

            <div class="mb-4">
                <input type="email" required @focus="show = false" class="form-control" id="email" v-model="email" placeholder="votre@email.fr" autocomplete="pseudo">
            </div>
            
            <div class="mb-4">
                <input type="password" required @focus="show = false" class="form-control" id="password" v-model="password" placeholder="password" autocomplete="new-password">
            </div>
            <div class="mb-4">
                <input type="password" required @focus="show = false" class="form-control" id="confirmerPassword" v-model="confirmerPassword" placeholder="confirmer password" autocomplete="new-password">
            </div>

            <div class="mb-4">
                <input type="text" required @focus="show = false" class="form-control" id="urlImg" v-model="urlImg" placeholder="URL de votre image - taille conseillé 1000x200px">
            </div>

            <div class="mb-4">
                <input type="submit" class="ButtonSubmitCreateAccount" value="Créer un nouveau profil">
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
    
    const pseudo = ref("")
    const email = ref("")
    const password = ref("")
    const confirmerPassword = ref("")
    const urlImg = ref("")
    
    let show = ref(false)
    let messages = ref({})
    let router = useRouter()

    async function submit (){
        // réaliser verifications sur les informations saisies dans le formulaire 
        // 8 if // 8 vérifications 
        const validationIdentifiant = Joi.object({
            email : Joi.string().email({ tlds: { allow: false } }).required(),
            password : Joi.string().trim().min(5).max(255).required(),
            confirmerPassword : Joi.any().equal(Joi.ref('password')).required()
                                        .label('Confirm password')
                                        .messages({ 'any.only': '{{#label}} does not match' })
        })

        const identifiants = {
            pseudo : pseudo.value,
            email : email.value,
            password : password.value,
            confirmerPassword : confirmerPassword.value,
            urlImg : urlImg.value
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
        const identifiant = {
            pseudo : pseudo.value,
            email : email.value,
            password : password.value,
            urlImg : urlImg.value
        }
        // créer un compte
        const reponse = await userStore.add(identifiant)
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

.ButtonSubmitCreateAccount {
    background-color: green;
    color: white;
    border-radius: 5px;
    border: none;
    padding: 8px;
}

</style>