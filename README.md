# N-Body Simulator

![Screenshot from 2023-04-19 20-16-42](https://user-images.githubusercontent.com/95315431/233165279-6807c80f-c5bb-49b6-9539-8618a53e69f4.png)

## Project Description

N-Body Simulator is simple web page that uses JavaScript and Three.js to render a 3D simulation of the motion of pointlike bodies taking into account the gravitanional interaction between them. 

There are several options to initialize a simulation:

- Select a simulation scenario among 2-Body, 3-Body and N-Body scenarios
- Generate a single body selecting its mass, radius as well as its initial position and velocity
- Generate a random body

Through the "Settings" panel it is possible to change the timestep used for numerical integration and the gravitational constant.

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Built With

- JavaScript
- ThreeJs

## License

[MIT](https://choosealicense.com/licenses/mit/)

three.js supports most modern browsers, including Internet Explorer 9 and above.

three.js provides WebGL, Canvas, SVG and CSS renderers. Different renderers may have different requirements of compatibility.
In theory, three.js works on all browsers that support WebGL: Google Chrome 9+, Firefox 4+, Opera 15+, Safari 5.1+, Internet Explorer 11 and Microsoft Edge. More infomation can be found at Can I use WebGL?.


If you still need to support IE9, it's a good choice to use CanvasRenderer.





Gravitational N-Body Simulation
This is a simple web page that uses JavaScript and Three.js to simulate the gravitational n-body problem. It renders a 3D simulation that allows users to visualize the movements of multiple objects in space, taking into account their gravitational interactions with one another.

Installation
To run this simulation on your local machine, you will need to have Node.js and npm installed. Once you have those dependencies installed, follow these steps:

Clone this repository to your local machine.
Navigate to the project directory in your terminal.
Run npm install to install the project's dependencies.
Run npm start to start the development server.
You should now be able to view the simulation by opening localhost:3000 in your web browser.

Usage
To use this simulation, simply drag and drop the objects on the screen to change their positions and velocities. The simulation will update in real time to reflect the new positions of the objects.

You can also adjust various simulation parameters using the controls on the right-hand side of the screen. These include:

The number of objects in the simulation.
The mass of each object.
The gravitational constant.
The time step used for numerical integration.
Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request. You can also submit issues and bug reports using the project's GitHub issue tracker.

License
This project is licensed under the MIT license. See the LICENSE file for more information.




