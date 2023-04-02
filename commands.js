// simulation settings functions
function SlowDownSimulation() {
  if (h > _h_step) {
    h -= _h_step;
  }
  else {
    h = _h_step;
  }
}

function StopSimulation() {
  _sim = 1;
}

function ResumeSimulation() {
  _sim = 0;
}

function SpeedUpSimulation() {
  h += _h_step;
}


function SetSimulationStep(sim_step) {
  h = sim_step;
}

// simulation scenarios creation functions
function CreateRandomScenario() {
  scenario.ClearScenario();
  for (var i = 0; i < n_bodies; i++){
    scenario.CreateBody(null, null, null, null, null);
  }
}

function ScenarioEarthMoon() {
  scenario.ClearScenario();
  scenario.CreateBody([0, 0, 0], [0, 0, 0], 3, 80, null);
  scenario.CreateBody([0, 30, 30], [0, 0, -0.00001], 1, 1, null);
}

function ThreeBody_1() {
  scenario.ClearScenario();

  // scenario.CreateBody([0, 0, 0], [2e-6, -2e-6, 0], 1, 3, null);
  // scenario.CreateBody([30, 0, 0], [-2e-6, 2e-6, 0], 1, 3, null);
  // scenario.CreateBody([15, Math.sqrt(3/4)*30, 0], [2e-6, -2e-6, 0], 1, 3, null);

  // scenario.CreateBody([0, 0, 0], [-2e-6, 2e-6, 0], 1, 1, null);
  // scenario.CreateBody([30, 0, 0], [1e-7, -2e-6, 0], 1, 1, null);
  // scenario.CreateBody([-30, 0, 0], [2e-6, -1e-6, 0], 1, 1, null);

  scenario.CreateBody([0.9700436, -0.24308753, 0], [0.466203685, 0.43236573, 0], 0.01, 10000, null);
  scenario.CreateBody([-0.9700436, 0.24308753, 0], [0.466203685, 0.43236573, 0], 0.01, 10000, null);
  scenario.CreateBody([0, 0, 0], [-2*0.466203685, -2*0.43236573, 0], 0.01, 10000, null);
}