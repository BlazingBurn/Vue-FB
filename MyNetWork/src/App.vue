<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import Menu from "./components/Menu.vue"
import {RouterView} from "vue-router"
</script>

<template>
 
 <div class="d-flex">

    <Menu class="menuFlex" />
    <div class="container pageCustom">
      <RouterView />
    </div>
 
 </div>
</template>

<style scoped>

.menuFlex {
  width: 15%;
}

.pageCustom {
  width: 85%;
}

</style>