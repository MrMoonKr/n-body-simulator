// compute the acceleration felt by single body caused by the presence of the other bodies
function ComputeAcceleration(first_body, bodies) {

  // define colliding bodies array
  var colliding_bodies = [];
  // reset first_body acceleration
  var acc = [0, 0, 0];
  // update first_body acceleration taking into account the contribution of all the bodies
  for (var second_body of bodies) {
    if (first_body != second_body) {
      // compute distance and distance norm
      var result = ComputeDistance(first_body.pos, second_body.pos);
      // get distance_norm ^ 3
      var distance_norm_3 = Math.pow(result.distance_norm, 3);
      // update first_body acceleration

      /*
      if (result.distance_norm < Math.min(first_body.radius, second_body.radius)) {
        acc = 0;
        return second_body;
      }
      */

      if (result.distance_norm > Math.max(first_body.radius, second_body.radius)) {
        for (var i = 0; i < 3; i ++) {
          acc[i] += - result.distance[i] / distance_norm_3 * second_body.mass * gravity_const;
        }
      }
      else {
        acc = [0, 0, 0];
        //colliding_bodies.push([first_body, second_body]);
        colliding_bodies = [first_body, second_body];
      }
    }
  }
  return {acc, colliding_bodies};
}

// organize coliding bodies
function VerifyCollidingBodies() {
  for (var bodies of list) {
    if (list.length > 0) {
      return list;
    }
  }
}


// runge kutta integration of order 4
function RungeKutta(body, bodies) { // REMOVE h

  var pos_1 = body.pos;
  var vel_1 = body.vel;
  var res_1 = ComputeAcceleration(body, bodies);

  var pos_2 = v_sum(pos_1, v_x_const(vel_1, (0.5 * h)));
  var vel_2 = v_sum(vel_1, v_x_const(res_1.acc, (0.5 * h)));
  body.pos = pos_2;
  body.vel = vel_2;
  var res_2 = ComputeAcceleration(body, bodies);


  var pos_3 = v_sum(pos_1, v_x_const(vel_2, (0.5 * h)));
  var vel_3 = v_sum(vel_1, v_x_const(res_2.acc, (0.5 * h)));
  body.pos = pos_3;
  body.vel = vel_3;
  var res_3 = ComputeAcceleration(body, bodies);


  var pos_4 = v_sum(pos_1, v_x_const(vel_3, h));
  var vel_4 = v_sum(vel_1, v_x_const(res_3.acc, h));
  body.pos = pos_4;
  body.vel = vel_4;
  var res_4 = ComputeAcceleration(body, bodies);


  var pos_f = v_sum(pos_1, v_x_const(v_sum(v_sum(vel_1, v_x_const(vel_2, 2)), v_sum(v_x_const(vel_3, 2), vel_4)), h / 6));
  var vel_f = v_sum(vel_1, v_x_const(v_sum(v_sum(res_1.acc, v_x_const(res_2.acc, 2)), v_sum(v_x_const(res_3.acc, 2), res_4.acc)), h / 6));

  body.pos = pos_f;
  body.vel = vel_f;

  // call colliding bodies
  var colliding_bodies = [res_1.colliding_bodies, res_2.colliding_bodies, res_3.colliding_bodies, res_4.colliding_bodies];
  for (var bodies of colliding_bodies) {
    if (bodies.length > 0) {
      return bodies;
    }
  }
  return [];
}
