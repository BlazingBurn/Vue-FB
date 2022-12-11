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

    async getOneById(id){
        try{
            const reponse = await fetch(`${this.url}/${id}`);
            const data = await reponse.json()
            return data
        }catch(ex){
            console.log(ex)
        }
    }

    async getOneByPseudo(pseudo){
        try{
            const reponse = await fetch(`${this.url}/${pseudo}`);
            const data = await reponse.json()
            return data
        }catch(ex){
            console.log(ex)
        }
    }

    async create(identifiants){
        try{
            const options = {
                method : "POST",
                body : JSON.stringify({...identifiants, role: "client"}),
                headers : {
                    "content-type" : "application/json"
                }
            }
            const reponse = await fetch(this.url, options)
           const data = await reponse.json();
           return data ;
        }catch(ex){
            console.log(ex)
        }
    }

    async existe(email){
        try{
            const reponse = await fetch(`http://localhost:3400/utilisateurs?email=${email}`)

            const data = await reponse.json();
            // si existe [{}]
            // si email non pris existe []
            return data.length === 0 ? true : false ;
        }catch(ex){
            console.log(ex)
        }
    }

}