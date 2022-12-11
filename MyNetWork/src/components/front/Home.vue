<template>
    <div class="m-2">
        <Suspense>
            <template #default>
                <HomeGrille />
            </template>
            <template #fallback>
                données en cours de chargement
            </template>
        </Suspense>
    </div>
</template>

<script setup>
    import {Suspense} from "vue";
    import HomeGrille from "./HomeGrille.vue";

</script>