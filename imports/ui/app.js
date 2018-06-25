import React,{ Component } from "react";
import { Link } from 'react-router';
import Map1 from "./map";
import SimpleExample from "./map_class";
import AnimateExample from "./try";
export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Welcome</h1>
                    {/* <AnimateExample /> */}
                    <SimpleExample />
            </div>
        );
    }
}