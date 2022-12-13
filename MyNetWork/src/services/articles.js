export class ArticlesApi{

    url = "http://localhost:3400/articles"

    async poster(post){
        try{
            const options = {
                method : "POST",
                body : JSON.stringify({...post}),
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

    async liker(article){
        try{
            const options = {
                method : "PUT",
                body : JSON.stringify({...article}),
                headers : {
                    "content-type" : "application/json"
                }
            }
            const reponse = await fetch(`http://localhost:3400/articles/${article.id}`, options)
           const data = await reponse.json();
           return data ;
        }catch(ex){
            console.log(ex)
        }
    }

    async commenter(article){
        try{
            const options = {
                method : "PUT",
                body : JSON.stringify({...article}),
                headers : {
                    "content-type" : "application/json"
                }
            }
            const reponse = await fetch(`http://localhost:3400/articles/${article.id}`, options)
           const data = await reponse.json();
           return data ;
        }catch(ex){
            console.log(ex)
        }
    }

}