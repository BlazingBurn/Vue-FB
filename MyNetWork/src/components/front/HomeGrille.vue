<template>
    <div class="HomeGrilleCustom">
        <article v-for="article , index in articles" :key="index" class="articleCustom d-flex flex-column">
            
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

                <div class="m-2">
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

            </footer>
        </article>
    </div>
</template>

<script setup>
    import ArticlesApi from '../../services/article';
    import UtilisateursApi from '../../services/utilisateur';
    import { RouterLink } from "vue-router";
    import { ref } from "vue" ;
    import moment from 'moment';

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

</script>

<style scoped>

.HomeGrilleCustom {
    margin-top: 51px;
}

.articleCustom {
    border: 3px solid rgb(169, 169, 169);
    border-radius: 4px;
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

</style>