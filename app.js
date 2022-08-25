// simulation variables
var _sim = 0;
var _h_step = 1000;
var h = 10000;
const n_bodies = 25;

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
