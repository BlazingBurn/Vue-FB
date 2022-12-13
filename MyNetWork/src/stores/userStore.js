import { defineStore } from "pinia"
import { UserApi } from "../services/user"

export const useUserStore = defineStore("userStore" , {
    state : () => {
        return {
            user : {}
        }
    },
    actions : {
        add : async function(identifiant){
            const userApi = new UserApi();
            
            // vérifier si il y a pas déjà un user qui a déjà utilisé cet email 
            const verif = await userApi.existe(identifiant.email)
            console.log(verif , identifiant.email);
            if(!verif) return {message : "l'email est déjà utilisé"}
            
            // vérifier si il y a pas déjà un user qui a déjà utilisé ce pseudo
            const verifPseudo = await userApi.existePseudo(identifiant.pseudo)
            console.log(verifPseudo , identifiant.pseudo);
            if(!verifPseudo) return {message : "le pseudo est déjà utilisé"}

            // ajouter dans la base de donnée 
            // requete ajax pour ajouter un profil user dans la base de données
            const user = await userApi.create(identifiant)

            // remplir notre state 
            this.user = {
                pseudo : user.pseudo,
                email : user.email ,
                isLogged : true 
            } ; 

            return {message : "ok" } ;
        },
        login : async function(identifiants){

            const userApi = new UserApi();
            
            let verif;
            // vérifier le mail et mdp
            if (await userApi.emailConnect(identifiants.email)) {
                if( await userApi.passwordConnect(identifiants.email, identifiants.password)) {
                    verif = true;
                } else {
                    verif = false;
                }
            } else {
                verif = false;
            }
            
            console.log(verif, identifiants);

            if(!verif) return {message : "l'email ou le mot de passe est incorrect"};

            const user = await userApi.getOneByEmail(identifiants.email);

            this.user = {
                pseudo : user.pseudo,
                email : user.email,
                isLogged : true 
            }; 

            return {message : "ok" };
        },
        logout : async function(){
            this.user = {}

            return {message : "ok"};
        }
    }

})