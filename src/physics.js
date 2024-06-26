// body object
function Body( pos, vel, mass, radius, density, mesh, rgb_color, trace_array, trajectory, drawCount ) {
    this.pos = pos;
    this.vel = vel;
    this.mass = mass;
    this.radius = radius;
    this.density = density
    this.mesh = mesh;
    this.rgb_color = rgb_color;
    this.trace_array = trace_array;
    this.trajectory = trajectory;
    this.drawCount = drawCount;
}

// scenario object
function Scenario() {

    // container used to store the Body objects
    this.bodies = [];

    // method used to instantiate a single body
    this.CreateBody = function ( pos, vel, radius, mass, rgb_color ) {

        // if position not defined -> set random position between +- pos_range
        if ( !pos ) {
            pos = [];
            for ( var i = 0; i < 3; i++ ) {
                pos.push( getRandomInt( -pos_range, pos_range ) );
            }
        }

        // if velocity not defined -> set random velocity to 0
        if ( !vel ) {

            // vel = [0, 0, 0];
            vel = [];
            for ( var i = 0; i < 3; i++ ) {
                vel.push( getRandomInt( -1, 1 ) * 0.00001 );
            }
        }

        // if radius not defined -> set random radius
        if ( !radius ) {
            radius = getRandomInt( 1, 5 );
        }

        // if mass not defined -> set random mass
        if ( !mass ) {
            mass = getRandomInt( 1, 50 );
        }

        // compute density
        var density = 3 / 4 * mass / Math.PI / Math.pow( radius, 3 );

        // if color not defined -> set random color
        if ( !rgb_color ) {
            var rgb_color = [ Math.random(), Math.random(), Math.random() ];
        }

        // - - - BODY MESH - - - //
        // set body material
        var body_material = new THREE.MeshBasicMaterial();
        body_material.color.setRGB( rgb_color[ 0 ], rgb_color[ 1 ], rgb_color[ 2 ] );
        body_material.flatShading = true;
        // set body geometry
        var body_geometry = new THREE.SphereGeometry( radius, 100, 100 );
        var mesh = new THREE.Mesh( body_geometry, body_material );
        // set body mesh position
        mesh.position.x = pos[ 0 ];
        mesh.position.y = pos[ 1 ];
        mesh.position.z = pos[ 2 ];
        // add body mesh to the scene
        scene.add( mesh );

        // - - - TRAJECTORY MESH - - - //
        // set trajectory material
        var traj_material = new THREE.LineBasicMaterial();
        traj_material.color.setRGB( rgb_color[ 0 ], rgb_color[ 1 ], rgb_color[ 2 ] );
        traj_material.flatShading = true;
        // set trajectory geometry
        var traj_geometry = new THREE.BufferGeometry();
        var trace_array = new Array( max_points * 3 ).fill( 0 );
        traj_geometry.setAttribute( "position", new THREE.Float32BufferAttribute( trace_array, 3 ) );
        var drawCount = 0;
        var trajectory = new THREE.Line( traj_geometry, traj_material );
        // add trajectory mesh to the scene
        scene.add( trajectory );

        // create a new Body object
        var body = new Body( pos, vel, mass, radius, density, mesh, rgb_color, trace_array, traj_geometry, drawCount );
        // add the body object to the bodies container
        this.bodies.push( body );
    }

    // method to perform a simulation step
    this.SimulationStep = function () { // REMOVE h
        var colliding_bodies = [];
        if ( this.bodies.length > 1 ) {
            for ( var body of this.bodies ) {
                var res = RungeKutta( body, this.bodies ); // REMOVE h
                if ( res.length > 0 ) {
                    colliding_bodies.push( res );
                }
            }
            if ( colliding_bodies.length > 0 ) {
                this.JoinBodies( colliding_bodies );
            }
            for ( var body of this.bodies ) {
                body.mesh.position.x = body.pos[ 0 ];
                body.mesh.position.y = body.pos[ 1 ];
                body.mesh.position.z = body.pos[ 2 ];
            }
            this.UpdateTrajectories();
        }
    }

    // method to update trajectories
    this.UpdateTrajectories = function () {
        for ( var body of this.bodies ) {
            body.trace_array.unshift( body.pos[ 0 ], body.pos[ 1 ], body.pos[ 2 ] );
            body.trace_array.splice( max_points * 3 );
            body.trajectory.attributes.position.copyArray( body.trace_array );
            body.trajectory.attributes.position.needsUpdate = true;
            body.drawCount = THREE.MathUtils.clamp( body.drawCount, 0, max_points );
            body.trajectory.setDrawRange( 0, body.drawCount );
            body.drawCount++;
        }
    }

    // method to join 2 colliding bodies
    this.JoinBodies = function ( colliding_bodies ) {

        // detemine which bodies have to be joined
        // clean the colliding_bodies container from redundancies
        colliding_bodies = cleanbodies( colliding_bodies );

        // select the body

        for ( var bodies of colliding_bodies ) {

            var first_body = bodies[ 0 ];
            var second_body = bodies[ 1 ];

            // compute body color taking into account the density of the colliding bodies
            var rgb_color = [];
            for ( var i = 0; i < 3; i++ ) {
                rgb_color.push( ( first_body.rgb_color[ i ] * first_body.mass + second_body.rgb_color[ i ] * second_body.mass ) / ( first_body.mass + second_body.mass ) )
            }

            // compute mass, radius
            var mass = first_body.mass + second_body.mass;
            var radius = Math.pow( ( Math.pow( first_body.radius, 3 ) + Math.pow( second_body.radius, 3 ) ), 1 / 3 );

            // compute position taking into account the masses of the colliding bodies
            var pos = [];
            for ( var i = 0; i < 3; i++ ) {
                pos.push( ( first_body.pos[ i ] * first_body.mass + second_body.pos[ i ] * second_body.mass ) / ( first_body.mass + second_body.mass ) );
            }

            // compute velocity through the ocnservation of momentum
            vel = MomentumConservation( first_body.mass, second_body.mass, first_body.vel, second_body.vel );
            // remove the colliding bodies from the scenario
            for ( var i = 0; i < this.bodies.length; i++ ) {
                if ( this.bodies[ i ] == first_body || this.bodies[ i ] == second_body ) {
                    this.bodies.splice( i, 1 );
                    i--;

                    // remove both body and its trajectory
                    scene.remove( scene.children[ 2 * i + 3 ] );
                    scene.remove( scene.children[ 2 * i + 3 ] );
                }
            }

            // create the new body
            this.CreateBody( pos, vel, radius, mass, rgb_color );
            //console.log(radius);
        }
    }

    this.ClearScenario = function () {
        // clear bodies containers
        this.bodies.splice( 0, this.bodies.length );

        // clear scene
        while ( scene.children.length > 1 ) {
            scene.remove( scene.children[ 1 ] );
        }
        //log(scene.children);
    }
}

// given the masses and the velocity vectors of two colliding bodies
// compute the velocity vector of the resulting third body
function MomentumConservation( m_1, m_2, v_1, v_2 ) {
    var m_3 = m_1 + m_2;
    var p_1 = v_x_const( v_1, m_1 );
    var p_2 = v_x_const( v_2, m_2 );
    var p_3 = v_sum( p_1, p_2 );
    var v_3 = v_x_const( p_3, 1 / m_3 );
    return v_3;
}


function cleanbodies( colliding_bodies ) {
    for ( var bodies of colliding_bodies ) {
        for ( var i = 0; i < colliding_bodies.length; i++ ) {
            if ( bodies != colliding_bodies[ i ] ) {
                if ( bodies[ 0 ] === colliding_bodies[ i ][ 1 ] && bodies[ 1 ] === colliding_bodies[ i ][ 0 ] ) {
                    colliding_bodies.splice( i, 1 );
                }
            }
        }
    }
    return colliding_bodies;
}



// compute the acceleration felt by single body caused by the presence of the other bodies
function ComputeAcceleration( first_body, bodies ) {

    // define colliding bodies array
    var colliding_bodies = [];

    // reset first_body acceleration
    var acc = [ 0, 0, 0 ];

    // update first_body acceleration taking into account the contribution of all the bodies
    for ( var second_body of bodies ) {
        if ( first_body != second_body ) {

            // compute distance and distance norm
            var result = ComputeDistance( first_body.pos, second_body.pos );

            // get distance_norm ^ 3
            var distance_norm_3 = Math.pow( result.distance_norm, 3 );

            // update first_body acceleration
            if ( result.distance_norm > Math.max( first_body.radius, second_body.radius ) ) {
                for ( var i = 0; i < 3; i++ ) {
                    acc[ i ] += -result.distance[ i ] / distance_norm_3 * second_body.mass * gravity_const;
                }
            } else {
                acc = [ 0, 0, 0 ];
                colliding_bodies = [ first_body, second_body ];
            }
        }
    }
    return {
        acc,
        colliding_bodies
    };
}


// runge kutta integration of order 4
function RungeKutta( body, bodies ) { // REMOVE h

    var pos_1 = body.pos;
    var vel_1 = body.vel;
    var res_1 = ComputeAcceleration( body, bodies );

    var pos_2 = v_sum( pos_1, v_x_const( vel_1, ( 0.5 * h ) ) );
    var vel_2 = v_sum( vel_1, v_x_const( res_1.acc, ( 0.5 * h ) ) );
    body.pos = pos_2;
    body.vel = vel_2;
    var res_2 = ComputeAcceleration( body, bodies );


    var pos_3 = v_sum( pos_1, v_x_const( vel_2, ( 0.5 * h ) ) );
    var vel_3 = v_sum( vel_1, v_x_const( res_2.acc, ( 0.5 * h ) ) );
    body.pos = pos_3;
    body.vel = vel_3;
    var res_3 = ComputeAcceleration( body, bodies );


    var pos_4 = v_sum( pos_1, v_x_const( vel_3, h ) );
    var vel_4 = v_sum( vel_1, v_x_const( res_3.acc, h ) );
    body.pos = pos_4;
    body.vel = vel_4;
    var res_4 = ComputeAcceleration( body, bodies );


    var pos_f = v_sum( pos_1, v_x_const( v_sum( v_sum( vel_1, v_x_const( vel_2, 2 ) ), v_sum( v_x_const( vel_3, 2 ), vel_4 ) ), h / 6 ) );
    var vel_f = v_sum( vel_1, v_x_const( v_sum( v_sum( res_1.acc, v_x_const( res_2.acc, 2 ) ), v_sum( v_x_const( res_3.acc, 2 ), res_4.acc ) ), h / 6 ) );

    body.pos = pos_f;
    body.vel = vel_f;

    // call colliding bodies
    var colliding_bodies = [ res_1.colliding_bodies, res_2.colliding_bodies, res_3.colliding_bodies, res_4.colliding_bodies ];
    for ( var bodies of colliding_bodies ) {
        if ( bodies.length > 0 ) {
            return bodies;
        }
    }
    return [];
}
