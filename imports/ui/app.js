import React, { Component } from "react";
import { Link } from 'react-router';
<<<<<<< HEAD
import Map1 from "./Map1";
export default class App extends Component{
    constructor(props){
=======
import Map1 from "./map";
import SimpleExample from "./map_class";
import OtherLayersExample from "./try";
export default class App extends Component {
    constructor(props) {
>>>>>>> 6af931c1848f950149005d4b0e021b6e7727b874
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Welcome</h1>
                {/* <OtherLayersExample />  */}
                <SimpleExample />
            </div>
        );
    }
}