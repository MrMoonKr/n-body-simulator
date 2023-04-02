// simulation variables
var _sim = 0;
var _h_step = 5000;
var h = 10000;
var gravity_const = 6.6743e-11;
const n_bodies = 100;
const pos_range = 250;

// create a scenario object
const scenario = new Scenario();


const animate = function() {
  if(h > 0) {
    scenario.SimulationStep(h);
  }
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();
