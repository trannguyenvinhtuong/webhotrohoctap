import { Component } from "react";
import "./../../../../node_modules/video-react/dist/video-react.css";
import {connect} from "react-redux";
import * as action from './../../../actions/index';

class Video extends Component{
    componentDidMount(){
        var {idkh} = this.props;
        this.props.requestMotKhoaHoc(idkh);
    }

    render() {
        var {khoahoc} = this.props;
        var kh = khoahoc[0]; 
        return (
            <div>
                <iframe 
                    src={khoahoc.VideoGT === undefined ? kh.VideoGT : khoahoc.VideoGT} 
                    width="100%" height="480" allow="autoplay">                    
                </iframe>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khoahoc: state.getmotkhoahoc
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestMotKhoaHoc: (idkh) =>{
            dispatch(action.requestMotKhoaHoc(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Video);