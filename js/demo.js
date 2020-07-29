// You should use this script in html with the type module.
// For example:
//   <script type="module" src="./demo.js"></script>
//
// Open the page in a http server, otherwise there will be a CORS policy error.
//
// script demo.js

import { cube, foo, graph } from 'my-module';
graph.options = {
    color:'blue',
    thickness:'3px'
}; 
graph.draw();

function moduletest() {
    console.log(cube(3)); // 27
    console.log(foo);    // 4.555806215962888
}
