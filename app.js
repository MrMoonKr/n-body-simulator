// simulation variables
var _sim = 0;
var _h_step = 5000;
var h = 10000;
const n_bodies = 30;
const pos_range = 100;

// create a scenario object
const scenario = new Scenario();


const animate = function() {
  if(_sim == 0) {
    scenario.SimulationStep(h);
  }
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();
