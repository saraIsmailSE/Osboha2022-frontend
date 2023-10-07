<template>
  <div class="col  text-center">
    <div id="displayPercentage"></div>
  </div>

</template>
<script>
require('./js-fluid-meter');
import {FluidMeter} from "./js-fluid-meter"; // <-- import
export default {
  name: "Chart",
  mounted() {
    var fm3 = new FluidMeter();
    fm3.init({
      targetContainer: document.getElementById("displayPercentage"),
      fillPercentage: this.percintage,
      options: {
        fontSize: "30px",
        drawPercentageSign: true,
        drawBubbles: false,
        size: 300,
        borderWidth: 19,
        backgroundColor: "#e2e2e2",
        foregroundColor: "#fafafa",
        foregroundFluidLayer: {
          fillStyle: "#2e328b",
          angularSpeed: 30,
          maxAmplitude: 5,
          frequency: 30,
          horizontalSpeed: -20
        },
        backgroundFluidLayer: {
          fillStyle: "#4F8FC6",
          angularSpeed: 100,
          maxAmplitude: 3,
          frequency: 22,
          horizontalSpeed: 20
        }
      }
    });
  },
  created() {
  },
  props: {
    percintage: {
      required: true,
    },
  },    
};
</script>
