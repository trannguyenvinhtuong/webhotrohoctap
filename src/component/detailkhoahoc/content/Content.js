import {Component} from 'react';
import Video from './Video';
import Loiich from './Loiich';
import Gioithieukhoahoc from './Gioithieukhoahoc';
import Noidung from './Noidung';
import Thongtingv from './Thongtingv';
import './../../../SASS/detail.sass';

class Content extends Component{
    render() {
        var {idkh} = this.props;
        return (
            <div className="content">
                <Video idkh = {idkh}/>
                <br/>
                <Loiich idkh = {idkh} />
                <br/>
                <Gioithieukhoahoc idkh = {idkh} />
                <br/>
                <Noidung idkh = {idkh} />
                <br/>
                <Thongtingv idkh = {idkh}/>
            </div>
        );
    }
}

export default Content;