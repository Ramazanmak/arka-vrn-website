<script setup>
import {ref} from 'vue'


</script>


<template>
    <div class="burger">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </div>
</template>

<style scoped>

.burger{
    cursor:pointer;
    height:100%;
    aspect-ratio:1 / 1;
    margin-top:1vh;
}

.bar1, .bar2, .bar3{
    width:60%;
    height:3px;
    background-color: #fff;
    margin:4px 0;
    transition:0.4s
}
.bar1{
    margin:10% 0;
}

.change .bar1 {
    transform: translate(0,230%) rotate(45deg) ;
    border-radius: 5px;
}

.change .bar2 {opacity: 0;}

.change .bar3 {
    transform: translate(0,-230%) rotate(-45deg);
    border-radius: 5px;
}

@media (min-width:560px){
    .bar1, .bar2, .bar3{
        height:3px;
        margin:5px 0;
    }
    .change .bar1 {
        transform: translate(0,260%) rotate(45deg) ;
    }
    
    .change .bar3 {
        transform: translate(0,-260%) rotate(-45deg);
    }
}

@media (min-width:768px){
    .bar1, .bar2, .bar3{
        height:4px;
        margin:5px 0;
    }
    .change .bar1 {
        transform: translate(0,220%) rotate(45deg) ;
    }
    
    .change .bar3 {
        transform: translate(0,-220%) rotate(-45deg);
    }
}

@media (min-width:1024px){
    .burger{
        display:none;
    }
}
</style>