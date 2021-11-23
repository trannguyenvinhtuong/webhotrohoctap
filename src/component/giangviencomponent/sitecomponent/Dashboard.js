import { Component } from "react";
import * as action from "./../../../actions/index";
import {connect} from "react-redux";

class Dashboard extends Component{
    componentDidMount(){
        var logg = localStorage.getItem('user');
        var jslog = JSON.parse(logg);      
        this.props.requestThongTinGV(jslog.makh);
    }
    render() {
        return (
            <div>
                123456
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestThongTinGV: (makh) =>{
            dispatch(action.requestThongTinGV(makh));
        }
    }
}

export default connect(null,mapDispatchToProps)(Dashboard);