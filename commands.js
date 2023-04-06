
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

  scenario.CreateBody(pos1, vel1, 10, m1, null);
  scenario.CreateBody(pos2, vel2, 2, m2, null);
}

function TwoBodyCircle2() {
  scenario.ClearScenario();

  var m1 = getRandomInt(5000, 10000);
  var m2 = m1;

  var pos1 = [getRandomInt(50, 150), 0, 0];
  var pos2 = [-pos1[0], 0, 0];

  var res = ComputeDistance(pos1, pos2);
  // var v = Math.sqrt(m1 * g_const / res.distance_norm) * Math.sqrt(2) / 2;
  
  var v = Math.sqrt(1/2 * m1 * g_const / res.distance_norm);

  var vel1 = [0, v, 0];
  var vel2 = [0, -v, 0];

  scenario.CreateBody(pos1, vel1, 4, m1, null);
  scenario.CreateBody(pos2, vel2, 4, m2, null);
}

function TwoBodyElliptic1() {
  scenario.ClearScenario();

  var m1 = getRandomInt(2000, 5000);
  var m2 = getRandomInt(0.5, 1);

  var pos1 = [0, 0, 0];
  var pos2 = [getRandomInt(50, 150), 0, 0];

  var ell = getRandomInt(5, 8);

  var res = ComputeDistance(pos1, pos2);
  var v = Math.sqrt(m1 * g_const / res.distance_norm) * ell / 10;

  var vel1 = [0, 0, 0];
  var vel2 = [0, v, 0];

  scenario.CreateBody(pos1, vel1, 10, m1, null);
  scenario.CreateBody(pos2, vel2, 2, m2, null);
}


function TwoBodyElliptic2() {
  scenario.ClearScenario();

  var m1 = getRandomInt(5000, 10000);
  var m2 = m1;

  var pos1 = [getRandomInt(50, 150), 0, 0];
  var pos2 = [-pos1[0], 0, 0];

  var ell = getRandomInt(3, 6);

  var res = ComputeDistance(pos1, pos2);
  var v = Math.sqrt(m1 * g_const / res.distance_norm) * ell / 10;

  var vel1 = [0, v, 0];
  var vel2 = [0, -v, 0];

  scenario.CreateBody(pos1, vel1, 4, m1, null);
  scenario.CreateBody(pos2, vel2, 4, m2, null);
}

function TwoBodyRand() {
  scenario.ClearScenario();

  var m1 = getRandomInt(5000, 10000);
  var m2 = getRandomInt(5000, 10000);

  var pos1 = [getRandomInt(-100, 100), getRandomInt(-100, 100), getRandomInt(-100, 100)];
  var pos2 = [getRandomInt(-100, 100), getRandomInt(-100, 100), getRandomInt(-100, 100)];

  var scale = 300000;

  var vel1 = [getRandomInt(-10, 10) / scale, getRandomInt(-10, 10) / scale, getRandomInt(-10, 10) / scale];
  var vel2 = [getRandomInt(-10, 10) / scale, getRandomInt(-10, 10) / scale, getRandomInt(-10, 10) / scale];

  scenario.CreateBody(pos1, vel1, 4, m1, null);
  scenario.CreateBody(pos2, vel2, 4, m2, null);
}


function ThreeBodyCircle1s() {
  scenario.ClearScenario();

  var m1 = getRandomInt(5000, 10000);
  var m2 = m1/10000;
  var m3 = m1/10000;

  
  var pos1 = [0, 0, 0];
  var pos2 = [getRandomInt(50, 150), 0, 0];
  var pos3 = [-pos2[0], 0, 0];

  var res12 = ComputeDistance(pos1, pos2);
  var res23 = ComputeDistance(pos2, pos3);
  var v = Math.sqrt(g_const * res12.distance_norm * (m1 / Math.pow(res12.distance_norm, 2) + m2 / Math.pow(res23.distance_norm, 2)));

  var vel1 = [0, 0, 0];
  var vel2 = [0, v, 0];
  var vel3 = [0, -v, 0];

  scenario.CreateBody(pos1, vel1, 10, m1, null);
  scenario.CreateBody(pos2, vel2, 2, m2, null);
  scenario.CreateBody(pos3, vel3, 2, m3, null);
}


function ThreeBodyCircle1ua() {
  scenario.ClearScenario();

  var m1 = getRandomInt(5000, 10000);
  var m2 = m1;
  var m3 = m1;

  
  var pos1 = [0, 0, 0];
  var pos2 = [getRandomInt(50, 150), 0, 0];
  var pos3 = [-pos2[0], 0, 0];

  var res12 = ComputeDistance(pos1, pos2);
  var res23 = ComputeDistance(pos2, pos3);
  var v = Math.sqrt(g_const * res12.distance_norm * (m1 / Math.pow(res12.distance_norm, 2) + m2 / Math.pow(res23.distance_norm, 2)));

  var vel1 = [0, 0, 0];
  var vel2 = [0, v, 0];
  var vel3 = [0, -v, 0];

  scenario.CreateBody(pos1, vel1, 4, m1, null);
  scenario.CreateBody(pos2, vel2, 4, m2, null);
  scenario.CreateBody(pos3, vel3, 4, m3, null);
}


function ThreeBodyCircle1ub() {
  scenario.ClearScenario();

  var m1 =  getRandomInt(5000, 10000);
  var m2 = m1;
  var m3 = m1;

  var dist_h = getRandomInt(50, 150);

  var ang1 = getRandomInt(0, 360);
  var ang2 = ang1 + 120;
  var ang3 = ang2 + 120;

  var ang1 = Math.PI / 180 * ang1;
  var ang2 = Math.PI / 180 * ang2;
  var ang3 = Math.PI / 180 * ang3;


  var pos1 = [Math.sin(ang1) * dist_h, Math.cos(ang1) * dist_h, 0];
  var pos2 = [Math.sin(ang2) * dist_h, Math.cos(ang2) * dist_h, 0];
  var pos3 = [Math.sin(ang3) * dist_h, Math.cos(ang3) * dist_h, 0];

  var v = Math.sqrt(1/2 * m1 * g_const / (dist_h * (Math.sqrt(3)/2)));

  var vel1 = [Math.sin(ang1 - Math.PI/2) * v, Math.cos(ang1 - Math.PI/2) * v, 0];
  var vel2 = [Math.sin(ang2 - Math.PI/2) * v, Math.cos(ang2 - Math.PI/2) * v, 0];
  var vel3 = [Math.sin(ang3 - Math.PI/2) * v, Math.cos(ang3 - Math.PI/2) * v, 0];

  scenario.CreateBody(pos1, vel1, 4, m1, null);
  scenario.CreateBody(pos2, vel2, 4, m2, null);
  scenario.CreateBody(pos3, vel3, 4, m3, null);
}


function ThreeBodyElliptic1() {
  scenario.ClearScenario();

  var m1 =  getRandomInt(5000, 10000);
  var m2 = m1;
  var m3 = m1;

  var dist_h = getRandomInt(50, 150);

  var ang1 = getRandomInt(0, 360);
  var ang2 = ang1 + 120;
  var ang3 = ang2 + 120;

  var ang1 = Math.PI / 180 * ang1;
  var ang2 = Math.PI / 180 * ang2;
  var ang3 = Math.PI / 180 * ang3;

  var pos1 = [Math.sin(ang1) * dist_h, Math.cos(ang1) * dist_h, 0];
  var pos2 = [Math.sin(ang2) * dist_h, Math.cos(ang2) * dist_h, 0];
  var pos3 = [Math.sin(ang3) * dist_h, Math.cos(ang3) * dist_h, 0];

  var ell = getRandomInt(3, 6);
  var v = Math.sqrt(m1 * g_const / (dist_h * (Math.sqrt(3)/2))) * ell / 10;

  var vel1 = [Math.sin(ang1 - Math.PI/2) * v, Math.cos(ang1 - Math.PI/2) * v, 0];
  var vel2 = [Math.sin(ang2 - Math.PI/2) * v, Math.cos(ang2 - Math.PI/2) * v, 0];
  var vel3 = [Math.sin(ang3 - Math.PI/2) * v, Math.cos(ang3 - Math.PI/2) * v, 0];

  scenario.CreateBody(pos1, vel1, 4, m1, null);
  scenario.CreateBody(pos2, vel2, 4, m2, null);
  scenario.CreateBody(pos3, vel3, 4, m3, null);
}



function ThreeBodyFigureEight() {
  scenario.ClearScenario();

  var m1 =  getRandomInt(5000, 10000);
  var m2 = m1;
  var m3 = m1;

  var ang = Math.PI / 180 * 30;

  var pos1 = [0, 0, 0];
  var pos2 = [getRandomInt(50, 150), 0, 0];
  var pos3 = [-pos2[0], 0, 0];

  var dist = pos2[0];

  var v = Math.sqrt(m1 * g_const * dist * (1 / Math.pow(dist, 2) + 1 / Math.pow(dist * 2, 2))) / 1.78;

  var vel1 = [- Math.sin(ang) * 2 * v,- Math.cos(ang) * 2 * v, 0];
  var vel2 = [Math.sin(ang) * v, Math.cos(ang) * v, 0];
  var vel3 = [Math.sin(ang) * v, Math.cos(ang) * v, 0];

  scenario.CreateBody(pos1, vel1, 4, m1, null);
  scenario.CreateBody(pos2, vel2, 4, m2, null);
  scenario.CreateBody(pos3, vel3, 4, m3, null);
}

function ThreeBodyRand() {
  scenario.ClearScenario();

  var m1 = getRandomInt(5000, 10000);
  var m2 = getRandomInt(5000, 10000);
  var m3 = getRandomInt(5000, 10000);

  var pos1 = [getRandomInt(-100, 100), getRandomInt(-100, 100), getRandomInt(-100, 100)];
  var pos2 = [getRandomInt(-100, 100), getRandomInt(-100, 100), getRandomInt(-100, 100)];
  var pos3 = [getRandomInt(-100, 100), getRandomInt(-100, 100), getRandomInt(-100, 100)];

  var scale = 300000;

  var vel1 = [getRandomInt(-10, 10) / scale, getRandomInt(-10, 10) / scale, getRandomInt(-10, 10) / scale];
  var vel2 = [getRandomInt(-10, 10) / scale, getRandomInt(-10, 10) / scale, getRandomInt(-10, 10) / scale];
  var vel3 = [getRandomInt(-10, 10) / scale, getRandomInt(-10, 10) / scale, getRandomInt(-10, 10) / scale];

  scenario.CreateBody(pos1, vel1, 4, m1, null);
  scenario.CreateBody(pos2, vel2, 4, m2, null);
  scenario.CreateBody(pos3, vel3, 4, m3, null);
}


