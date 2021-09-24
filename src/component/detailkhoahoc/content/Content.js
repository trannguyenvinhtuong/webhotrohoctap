import {Component} from 'react';
import Video from './Video';
import Loiich from './Loiich';
import Gioithieukhoahoc from './Gioithieukhoahoc';
import Noidung from './Noidung';
import Thongtingv from './Thongtingv';
import './../../../SASS/detail.sass';

class Content extends Component{
    render() {
        return (
            <div className="content">
                <Video />
                <br/>
                <Loiich />
                <br/>
                <Gioithieukhoahoc />
                <br/>
                <Noidung />
                <br/>
                <Thongtingv />
            </div>
        );
    }
}

export default Content;