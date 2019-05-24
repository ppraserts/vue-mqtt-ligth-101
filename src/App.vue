<template>
  <div id="app">
    <div class="split left">
      <div class="centered">
        <h1>APP On/Off Light</h1>
        <img v-if="(ligthStatus === 'on')" src="./assets/on.png">
        <img v-if="(ligthStatus === 'off')" src="./assets/off.png"><br/>
        <label class="toggle_switch"><input type="checkbox" v-model="ligthChecked" v-on:click="updateLigth"><span class="slider"></span></label>  
      </div>
    </div>
    <div class="split right">
      <div class="centered">
        <table id="ligths">
          <tr>
            <th>Who</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
          <tr v-for="(item, index) in ligths" v-bind:key="index">
            <td>{{ item.Name }} ( {{ item.User }} )</td>
            <td>{{ item.Message }}</td>
            <td style="text-align: center">{{ item.Status }}</td>
          </tr>
        </table>
      </div>
    </div>
    <br/>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'app',
  data() {
    return {
      ligthStatus: 'off',
      ligthChecked: false,
      ligths: []
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
      Axios.get("/ligthstatus").then((response)=> {
        response = response.data
        this.ligthStatus = response.Status
        this.ligthChecked = this.ligthStatus === 'on' ? true : false;
        this.getLigth()
      }).catch((error) => {
        console.log(error.response.data)
      })
    },
    updateLigth() {
      var tmpligthChecked = this.ligthChecked ? false : true;
      var tmpligthStatus = this.ligthChecked ? 'off' : 'on';
      Axios.post('/ligth', {
        User: '001',
        Name: 'Paul',
        Message: '',
        Status: tmpligthStatus
      })
      .then(function (response) {
        console.log(response);
        this.ligthChecked = tmpligthChecked
        this.ligthStatus = tmpligthStatus
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getLigth() {
       Axios.get("/ligth").then((response)=> {
        this.ligths = response.data
      }).catch((error) => {
        console.log(error.response.data)
      })
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

 /* Split the screen in half */
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

/* Control the left side */
.left {
  left: 0;
  background-color: #FFF;
}

/* Control the right side */
.right {
  right: 0;
  background-color: #FFF;
}

/* If you want the content centered horizontally and vertically */
.centered {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

#ligths {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
}

#ligths td, #ligths th {
  border: 1px solid #ddd;
  padding: 8px;
}

#ligths td{
  text-align: left;
}

#ligths tr:nth-child(even){background-color: #f2f2f2;}

#ligths tr:hover {background-color: #ddd;}

#ligths th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>
