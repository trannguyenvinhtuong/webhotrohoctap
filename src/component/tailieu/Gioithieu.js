import {Component} from 'react';
import './../../SASS/tailieu.sass';
import { connect } from 'react-redux';
import * as action from './../../actions/index';

class Gioithieu extends Component{
    componentDidMount(){
        var {idtl} = this.props;
        this.props.requestMotTaiLieu(idtl);
    }

    render() {
        var {tailieu} = this.props;
        var tl = tailieu[0];
        return (
            <div className="gioithieu">
                <h1>{tailieu.TenTL === undefined ? tl.TenTL : tailieu.TenTL}</h1>
                <div className="nd-gt">
                    <h2>
                        Thông tin tài liệu
                    </h2>
                    <p>
                    {tailieu.MoTa === undefined ? tl.MoTa : tailieu.MoTa}
                    </p>                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        tailieu: state.getmottailieu
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestMotTaiLieu: (idtl) =>{
            dispatch(action.requestMotTaiLieu(idtl));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Gioithieu);