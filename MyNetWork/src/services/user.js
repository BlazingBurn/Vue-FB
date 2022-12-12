export class UserApi{

    url = "http://localhost:3400/utilisateurs"

    async create(identifiants){
        try{
            const options = {
                method : "POST",
                body : JSON.stringify({...identifiants}),
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

    async emailConnect(email){
        try{
            const reponse = await fetch(`http://localhost:3400/utilisateurs?email=${email}`);
            const data = await reponse.json()

            return data.length === 0 ? false : true;
        }catch(ex){
            console.log(ex)
        }
    }

    async passwordConnect(email, password){
        try{
            const reponse = await fetch(`http://localhost:3400/utilisateurs?email=${email}`);
            const data = await reponse.json()

            return password === data[0].password ? true : false; 

        }catch(ex){
            console.log(ex)
        }
    }

    async getOneByEmail(email){
        try{
            const reponse = await fetch(`http://localhost:3400/utilisateurs?email=${email}`);
            const data = await reponse.json()
            return data[0]
        }catch(ex){
            console.log(ex)
        }
    }

}