import { Component } from "react";
import './../../../SASS/detail.sass';
import { Row, Col } from 'antd';
import {connect} from "react-redux";
import * as action from './../../../actions/index';

class Loiich extends Component {
    componentDidMount(){
        var {idkh} = this.props;
        this.props.requestTTKH(idkh);
    }

    render() {
        var {thongtin} = this.props;
        var tt = thongtin[0];
        return (
            <div className="gt-qc">
                <h1>Bạn sẽ học được gì</h1>
                <Row>
                    <Col span={12}>
                        <p>
                            <i className="fas fa-check"></i>
                            {thongtin.Marketing1 === undefined ? tt.Marketing1 : thongtin.Marketing1}
                        </p>
                        <p>
                            <i className="fas fa-check"></i>
                            {thongtin.Marketing2 === undefined ? tt.Marketing2 : thongtin.Marketing2}
                        </p>
                        <p>
                            <i className="fas fa-check"></i>
                            {thongtin.Marketing3 === undefined ? tt.Marketing1 : thongtin.Marketing3}
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>
                            <i className="fas fa-check"></i>
                            {thongtin.Marketing4 === undefined ? tt.Marketing1 : thongtin.Marketing4}
                        </p>
                        <p>
                            <i className="fas fa-check"></i>
                            {thongtin.Marketing5 === undefined ? tt.Marketing1 : thongtin.Marketing5}
                        </p>
                        <p>
                            <i className="fas fa-check"></i>
                            {thongtin.Marketing6 === undefined ? tt.Marketing1 : thongtin.Marketing6}
                        </p>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        thongtin: state.getttkhoahoc
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestTTKH: (idkh) =>{
            dispatch(action.requestTTKH(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Loiich);