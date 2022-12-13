import { defineStore } from "pinia"
import { ArticlesApi } from "../services/articles"

export const useArticleStore = defineStore("articleStore" , {
    actions : {
        poster : async function(post){
            const articlesApi = new ArticlesApi();

            // ajouter d'un nouveau post
            const postUpdate = await articlesApi.poster(post)

            return {message : "ok" };
        },
        liker : async function(article){
            const articlesApi = new ArticlesApi();

            // ajouter d'un like sur l'article
            const articleUpdate = await articlesApi.liker(article)

            return {message : "ok" };
        },
        commenter : async function(article){
            const articlesApi = new ArticlesApi();

            // ajouter d'un commentaire sur l'article
            const articleUpdate = await articlesApi.commenter(article)

            return {message : "ok" };
        }
    }

})