<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="navbar navbar-dark bg-dark px-3 shadow row justify-content-between topnav m-0 p-0">

        <h1 class="col-sm-auto title">SMART HOME PROJECT</h1>

        <div class="col-auto">
            <nav class="navbar navbar-expand-lg navbar-fit-content row">

                <RouterLink to="/" class="col navbar-item" exact-active-class="active">Home</RouterLink>


                <RouterLink to="/App1" class="col navbar-item" exact-active-class="active">App1</RouterLink>


                <RouterLink to="/App2" class="col navbar-item" exact-active-class="active">App2</RouterLink>


                <RouterLink to="/App3" class="col navbar-item" exact-active-class="active">App3</RouterLink>

            </nav>
        </div>
    </nav>
</template>

<style scoped>
.title {
    padding-left: 30px;
    color: #ddd;
}

/* Add a black background color to the top navigation */
.topnav {
    background-color: #333;
    overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
    background-color: #ddd;
    color: black;
}

/* Add a color to the active/current link */
.active {
    background-color: #04AA6D;
    color: white;
}

.navbar-fit-content {
    padding: 0px;
    height: 100%;
}

.navbar-item {
    height: 100%;
    display: flex;
    align-items: center;
}
</style>