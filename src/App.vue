<template>
  <div id="app">
    <h1>APP On/Off Light</h1>
    <img v-if="(ligthStatus === 'on')" src="./assets/on.png">
    <img v-if="(ligthStatus === 'off')" src="./assets/off.png"><br/>
    <label class="toggle_switch"><input type="checkbox" v-model="ligthChecked" v-on:click="updateLigth"><span class="slider"></span></label><br/>
  </div>
</template>

<script>
import firebase from'./Firebase' 

export default {
  name: 'app',
  data() {
    return {
      ligthStatus: 'off',
      ligthChecked: false,
    }
  },
  mounted () {
    this.$nextTick(function () {
        window.setInterval(() => {
            this.getLigthStatus()
        },5000)
    })
  },
  methods: {
    getLigthStatus() {
      var self = this;
      var ligthReference = firebase.database().ref("/Ligths/000/");
      ligthReference.on("value", function(snapshot) {
          self.ligthStatus = snapshot.val().Status;
          self.ligthChecked = self.ligthStatus === 'on' ? true : false;
          ligthReference.off("value");
      }, 
      function (errorObject) { console.log("The read failed: " + errorObject.code); });
    },
    updateLigth() {
      this.ligthStatus = this.ligthChecked ? 'off' : 'on';
      var referencePath = '/Ligths/000/';
      var ligthReference = firebase.database().ref(referencePath);
      ligthReference.set({Name: 'ligth', Message: '', Status: this.ligthStatus}, function(error) {
          if (error) {
              console.log("Data could not be saved." + error );
          } 
          else {
              console.log("Data saved successfully.");
          }
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 120px;
}
.toggle_switch 
 {
  width: 120px;
  height: 40px; 
  position: relative;
  display: inline-block;
  
 }

.toggle_switch input {display:none;}

.slider 
 {  
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
 }
 
 .slider:before 
   { 
   position: absolute;
   content: "";
   height: 52px;
   width: 52px;
   left: 2px; 
   top: -8px;
   background-color: white;
   -webkit-transition: .4s;
   transition: .4s; border:2px solid gray; 
   }
 input:checked + .slider 
  { 
  background-color: #FFDD54; 
  } 
  
 input:focus + .slider 
  { 
    box-shadow: 0 0 1px #FFDD54;
  }
  
 input:checked + .slider:before 
 {
	-webkit-transform: translateX(61px);
	-ms-transform: translateX(61px);
	transform: translateX(61px);
	border: 2px solid #FFDD54;
 }
	
 .slider { border-radius: 50px; }
 
 .slider:before { border-radius: 100%; }
</style>
