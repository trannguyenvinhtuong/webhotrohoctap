import { Component } from "react";
import './../../SASS/quantritk.sass';
import Thongtintk from './Thongtintk';
import { connect } from "react-redux";
import * as action from './../../actions/index';

class Dangxuat extends Component{
    onClick = () =>{
        localStorage.removeItem('user');
        window.location.reload();
    }

    onReturn = () =>{
        this.props.onChangePage(<Thongtintk />);
    }

    render() {
        return (
            <div className="dangxuat">
                <h1>Bạn có muốn đăng xuất?</h1>
                <br />
                <div>
                    <a onClick={this.onClick}>
                        <button style={{marginRight: '1rem', backgroundColor: 'green'}}>Yes</button>
                    </a>   
                    <a onClick={this.onReturn}>
                        <button style={{marginLeft: '1rem', backgroundColor: 'red'}}>No</button>
                    </a>          
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        onChangePage: (page) =>{
            dispatch(action.changePageTK(page));
        }
    }
}

export default connect(null,mapDispatchToProps)(Dangxuat);