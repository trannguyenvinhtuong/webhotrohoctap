import { Component } from "react";
import "./../../../../node_modules/video-react/dist/video-react.css";
import {Player} from 'video-react';
import hinh from './../../../imgs/cntt.jpg';

class Video extends Component{
    render() {
        return (
            <div>
                <Player 
                    playsInline
                    poster={hinh}
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
            </div>
        );
    }
}

export default Video;