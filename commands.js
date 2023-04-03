
function SetSimulationStep(sim_step) {
  h = sim_step;
}

function SetGravityConst(_const) {
  gravity_const = g_const * _const;
}


// simulation scenarios creation functions
function CreateRandomScenario() {
  scenario.ClearScenario();
  for (var i = 0; i < n_bodies; i++){
    scenario.CreateBody(null, null, null, null, null);
  }
}


function TwoBodyCircle1() {
  scenario.ClearScenario();

  var m1 = getRandomInt(2000, 5000);
  var m2 = getRandomInt(0.5, 1);

  var pos1 = [0, 0, 0];
  var pos2 = [getRandomInt(50, 150), 0, 0];

  var res = ComputeDistance(pos1, pos2);
  var v = Math.sqrt(m1 * g_const / res.distance_norm);

  var vel1 = [0, 0, 0];
  var vel2 = [0, v, 0];

  scenario.CreateBody(pos1, vel1, 7, m1, null);
  scenario.CreateBody(pos2, vel2, 2, m2, null);
}

function TwoBodyCircle2() {
  scenario.ClearScenario();

  var m1 = getRandomInt(5000, 10000);
  var m2 = m1;

  var pos1 = [getRandomInt(50, 150), 0, 0];
  var pos2 = [-pos1[0], 0, 0];

  var res = ComputeDistance(pos1, pos2);
  var v = Math.sqrt(m1 * g_const / res.distance_norm) * Math.sqrt(2) / 2;

  var vel1 = [0, v, 0];
  var vel2 = [0, -v, 0];

  scenario.CreateBody(pos1, vel1, 3, m1, null);
  scenario.CreateBody(pos2, vel2, 3, m2, null);
}

function TwoBodyElliptic1() {
  scenario.ClearScenario();

  var m1 = getRandomInt(2000, 5000);
  var m2 = getRandomInt(0.5, 1);

  var pos1 = [0, 0, 0];
  var pos2 = [getRandomInt(50, 150), 0, 0];

  var ell = getRandomInt(4, 9);

  var res = ComputeDistance(pos1, pos2);
  var v = Math.sqrt(m1 * g_const / res.distance_norm) * ell / 10;

  var vel1 = [0, 0, 0];
  var vel2 = [0, v, 0];

  scenario.CreateBody(pos1, vel1, 7, m1, null);
  scenario.CreateBody(pos2, vel2, 2, m2, null);
}


function TwoBodyElliptic2() {
  scenario.ClearScenario();

  var m1 = getRandomInt(5000, 10000);
  var m2 = m1;

  var pos1 = [getRandomInt(50, 150), 0, 0];
  var pos2 = [-pos1[0], 0, 0];

  var ell = getRandomInt(3, 9);

  var res = ComputeDistance(pos1, pos2);
  var v = Math.sqrt(m1 * g_const / res.distance_norm) * ell / 10;

  var vel1 = [0, v, 0];
  var vel2 = [0, -v, 0];

  scenario.CreateBody(pos1, vel1, 3, m1, null);
  scenario.CreateBody(pos2, vel2, 3, m2, null);
}





function ThreeBody1() {
  scenario.ClearScenario();

  var m1 = getRandomInt(5000, 10000);
  var m2 = m1;
  var m3 = m1;

  
  var pos1 = [0, 0, 0];
  var pos2 = [getRandomInt(50, 150), 0, 0];
  var pos3 = [-pos2[0], 0, 0];

  // var ell = getRandomInt(3, 9);

  var res12 = ComputeDistance(pos1, pos2);
  var res23 = ComputeDistance(pos2, pos3);
  var v = Math.sqrt(m1 * g_const * res12.distance_norm * (1 / Math.pow(res12.distance_norm, 2) + 1 / Math.pow(res23.distance_norm, 2)));

  var vel1 = [0, 0, 0];
  var vel2 = [0, -v, 0];
  var vel3 = [0, v, 0];

  scenario.CreateBody(pos1, vel1, 3, m1, null);
  scenario.CreateBody(pos2, vel2, 3, m2, null);
  scenario.CreateBody(pos3, vel3, 3, m3, null);
}