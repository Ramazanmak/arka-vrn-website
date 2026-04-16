<template>
  <button class="burger" tabindex="0">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </button>
  <div class="burger__shutter"></div>
</template>

<style scoped>

input {
  width:1px;
  height:1px;
  background-color:transparent;
}

.burger{
  display: block;
  margin: 0;
  padding: 0;
  line-height: inherit;
  text-align: center;
  text-decoration: none;
  background: none;
  border: 0;
  cursor: pointer;
  width: 1.8em;
  aspect-ratio:1 / 1;
}

.bar1, .bar2, .bar3{
    width:100%;
    height:4px;
    background-color: #fff;
    transition:0.4s;
    margin-bottom:5px;
}

.bar3 {
  margin-bottom:0;
}

.burger__shutter {
  display: block;
  position:absolute;
  top:0;
  left:-101%;
  width:100%;
  height:100vh;
}

:focus + .burger__shutter {
  left:0;
}

.burger:focus .bar1 {
    transform: translate(0,220%) rotate(45deg) ;
    border-radius: 5px;
}

.burger:focus  .bar2 {opacity: 0;}

.burger:focus  .bar3 {
    transform: translate(0,-220%) rotate(-45deg);
    border-radius: 5px;
}

@media (min-width:560px){
    .bar1, .bar2, .bar3{
        height:3px;
    }
    .burger:focus > .bar1 {
        transform: translate(0,260%) rotate(45deg) ;
    }
    
    .burger:focus > .bar3 {
        transform: translate(0,-260%) rotate(-45deg);
    }
}

@media (min-width:768px){
    .bar1, .bar2, .bar3{
        height:4px;
    }
    .burger:focus > .bar1 {
        transform: translate(0,220%) rotate(45deg) ;
    }
    
    .burger:focus > .bar3 {
        transform: translate(0,-220%) rotate(-45deg);
    }
}

@media (min-width:1024px){
    .burger{
        display:none;
    }
}
</style>