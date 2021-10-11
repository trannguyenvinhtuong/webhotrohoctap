import { Component } from "react";
import { connect } from 'react-redux';
import * as action from './../../actions/index';

class Docpdf extends Component{
    componentDidMount(){
        var {idtl} = this.props;
        this.props.requestMotTaiLieu(idtl);
    }


    render() {
        var {tailieu} = this.props;
        var tl = tailieu[0];
        return (
            <div className="docfilepdf">
                <embed src={tailieu.Link === undefined ? tl.Link : tailieu.Link} />
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

export default connect(mapStateToProps,mapDispatchToProps)(Docpdf);