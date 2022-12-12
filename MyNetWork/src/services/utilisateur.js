export default class UtilisateurApi{

    url = "http://localhost:3400/utilisateurs"

    static _instance ;

    static getInstance(){
        if(_instance === null){
            UtilisateurApi._instance = new getUtilisateurApi()
        }
        return UtilisateurApi._instance ; 
    }

    async getAll(){
        try{
            const reponse = await fetch(this.url);
            const data = await reponse.json()
            return data
        }catch(ex){
            console.log(ex)
        }
    }

}