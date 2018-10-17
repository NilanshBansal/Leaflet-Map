import React, { Component } from "react";
import { Link } from 'react-router';
import Map1 from "./Map1";
import Map2 from "./map";
import SimpleExample from "./map_class";
import OtherLayersExample from "./try";
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Male Female Tweets Classification Clustering</h1>
                {/* <OtherLayersExample />  */}
                <SimpleExample />
            </div>
        );
    }
}