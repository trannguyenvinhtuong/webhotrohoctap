import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';

class Showpdf extends Component {
    componentDidMount() {
        var { idtailieu } = this.props;
        this.props.requestMotTaiLieu(idtailieu);
    }

    render() {
        var { tailieu } = this.props;
        var tl = tailieu[0];
        return (
            <div className="docfilepdf">
                <embed src={tailieu.Demo === undefined ? tl.Demo : tailieu.Demo} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tailieu: state.getmottailieu
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestMotTaiLieu: (idtl) => {
            dispatch(action.requestMotTaiLieu(idtl));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Showpdf);