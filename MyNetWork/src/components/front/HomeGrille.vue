<template>
    <div>

        <div>
            <div v-if="isConnected">

                <div class="CreatePostCustom">

                    <div class="d-flex m-3">
                        <div class="align-self-center">
                            <h2 class="m-auto">Quoi de neuf ?</h2>
                        </div>
                        <div class="align-self-center">
                            <img class="homeIMGPost" src="../../assets/home-30.png" alt=""/>
                        </div>
                    </div>

                    <form @submit.prevent="submit" class="m-3">

                        <div class="mb-4">
                            <input type="textarea" required @focus="show = false" class="form-control" id="contenu" v-model="contenu" placeholder="laisser un nouveau message" autocomplete="">
                        </div>
                        
                        <div class="mb-4">
                            <input type="text" required @focus="show = false" class="form-control" id="urlImgArticle" v-model="urlImgArticle" placeholder="url de votre image - taille conseillé 1000x200px" autocomplete="">
                        </div>

                        <div class="mb-4">
                            <input type="submit" class="ButtonSubmitPost" value="laisser un nouveau post">
                        </div>
                    </form>

                </div>

            </div>
        </div>
        
        <div>
            <article v-for="article, index in articles.slice().reverse()" :key="index" class="articleCustom d-flex flex-column">
                
                <div class="d-flex justify-content-between bg-light">
                    <div class="m-2 d-flex">
                        <div>
                            <span class="articlePseudo">{{ article.pseudo }}</span>
                        </div>
                        <div class="align-self-center">
                            <img :src="utilisateurs.find(user => user.pseudo === article.pseudo ).urlImgProfil" alt="userProfilImg" class="utilisateurIMG" />
                        </div>
                    </div>
                    <span class="dateCustom m-2">posté le {{ moment(article.date).format('d/MM/YY') }} à {{  moment(article.date).format('hh') }}h{{  moment(article.date).format('mm') }}</span>
                </div>
                
                <img :src="article.urlImgArticle" alt="" class="articleIMG">
                <span class="m-2">{{ article.contenu }}</span>
                
                <div class="d-flex bg-light articleStatusCustom">
                    <div class="m-2">
                        <img class="commentIMG" src="../../assets/comment-48.png" alt=""/>
                        <span class="commentCustom">{{ article.commentaires.length }}</span>
                    </div>
    
                    <!-- if connected like possible -->
                    <div class="m-2" v-if="isConnected">
                        <img class="likeIMG" src="../../assets/like-50.png" alt="" @click="liker(article)"/>
                        <span class="likeCustom">{{ article.like }}</span>
                    </div>
                    <div class="m-2" v-else>
                        <img class="likeIMG" src="../../assets/like-50.png" alt=""/>
                        <span class="likeCustom">{{ article.like }}</span>
                    </div>

                </div>
                
                <footer class="d-flex flex-column align-items-baseline mt-3">
                    <h2>Commentaires :</h2>
                    
                    <div v-for="commentaire , index in article.commentaires" :key="index" class="CommentaireCustom d-flex flex-column w-100">
    
                        <div class="d-flex justify-content-between m-2">
                            <div>
                                <span class="CommentPseudo">{{ commentaire.pseudo }}</span>
                            </div>
                            <span class="dateCustom">le {{ moment(commentaire.dt).format('d/MM/YY') }} à {{  moment(commentaire.dt).format('hh') }}h{{  moment(commentaire.dt).format('mm') }}</span>
                        </div>
    
                        <p class="m-2">{{ commentaire.contenu }}</p>
                    </div>
                    
                    <div v-if="isConnected" class="CommentaireCustom d-flex flex-column w-100">
    
                        <div class="m-2">
                            <h2 class="m-auto">Ajouter un commentaire : </h2>
                        </div>
    
                        <form @submit.prevent="commenter(article)">

                            <div class="mb-4">
                                <input type="textarea" required @focus="show = false" class="form-control" id="contenuNewComment" v-model="contenuNewComment" placeholder="laisser un commentaire" autocomplete="">
                            </div>

                            <div class="mb-4">
                                <input type="submit" class="ButtonSubmitNewComment" value="laisser un nouveau post">
                            </div>
                        </form>
                    </div>
                </footer>
            </article>
        </div>
    </div>
</template>

<script setup>
    import ArticlesApi from '../../services/article';
    import UtilisateursApi from '../../services/utilisateur';
    import { RouterLink } from "vue-router";
    import { ref, computed } from "vue" ;
    import moment from 'moment';
    import {useUserStore} from "../../stores/userStore";
    import {useArticleStore} from "../../stores/articleStore";

    // Init
    let articles = ref([]);
    let utilisateurs = ref([]);
    
    async function getArticles(){
        const api = new ArticlesApi()
        const data = await api.getAll()
        articles.value = data;
    }
    await getArticles();
    
    async function getUsers(){
        const api = new UtilisateursApi()
        const data = await api.getAll()
        utilisateurs.value = data;
    }
    await getUsers();
    // End Init

    // If connected
    const userStore = useUserStore();
    const isConnected = computed(() => {
        return userStore.user.isLogged ? true : false;
    });

    let contenu = ref("");
    let urlImgArticle = ref("");

    async function submit (){

        const post = {
            id : articles.value.length+1,
            contenu : contenu.value,
            urlImgArticle : urlImgArticle.value,
            like : 0,
            pseudo : userStore.user.pseudo,
            date : moment(),
            commentaires : []
        }

        contenu = "";
        urlImgArticle ="";
        
        let articleStore = useArticleStore()
        // créer un nouveau post
        const reponse = await articleStore.poster(post)
        console.log(reponse);
        articles.value.push(post);

    }

    async function liker(article){

        let articleStore = useArticleStore()
        article.like = article.like+1
        // liker un post
        const reponse = await articleStore.liker(article)
        console.log(reponse);
    }

    let contenuNewComment = ref("");
    async function commenter(article){

        const commentaire = {
            id : article.commentaires.length+1,
            contenu : contenuNewComment.value,
            pseudo : userStore.user.pseudo,
            dt : moment()
        }
        contenuNewComment = "";
        console.log(article)
        article.commentaires.push(commentaire);

        let articleStore = useArticleStore()
        // commenter un post
        const reponse = await articleStore.commenter(article)
        console.log(reponse);
    }

    // End If connected

</script>

<style scoped>

.articleCustom {
    border: 3px solid rgb(169, 169, 169);
    border-radius: 4px;
    margin-bottom: 20px;
}

.commentIMG {
    width: 20px;
    height: 20px;
}
.likeIMG {
    width: 20px;
    height: 20px;
}

.articlePseudo {
    font-size: 26px;
    text-align: center;
}

.dateCustom {
    font-size: 15px;
    align-self: center;
}

.articleStatusCustom {
    border-top: 2px solid lightgrey;
}

.commentCustom {
    background-color: green;
    color: white;
    border-radius: 3px;
    padding: 0 6px 0 6px;
    margin-left: 5px;
}

.likeCustom {
    background-color: blue;
    color: white;
    border-radius: 3px;
    padding: 0 6px 0 6px;
    margin-left: 5px;
}

.CommentaireCustom {
    border-top: 2px solid lightgrey;
}

.utilisateurIMG {
    width: 35px;
    height: 35px;
    border-radius: 15px;
    margin-left: 8px;
}

.articleIMG {
    width: auto;
    height: 300px;
}

.CommentPseudo {
    font-weight: bold;
}


/* if connected */

.CreatePostCustom {
    border: 3px solid rgb(169, 169, 169);
    border-radius: 4px;
    background-color: rgb(244, 244, 244);
    margin-bottom: 20px;
}

.homeIMGPost {
    width: 35px;
    height: 35px;
}

.ButtonSubmitPost {
    background-color: green;
    color: white;
    border-radius: 5px;
    border: none;
    padding: 8px;
    width: 100%;
}

.ButtonSubmitNewComment {
    background-color: white;
    color: green;
    border-color: green;
    border-radius: 5px;
    padding: 8px;
}

</style>