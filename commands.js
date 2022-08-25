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

// simulation scenarios creation functions
function CreateRandomScenario() {
  scenario.ClearScenario();
  for (var i = 0; i < n_bodies; i++){
    scenario.CreateBody(null, null, null, null, null, 100);
  }
}
