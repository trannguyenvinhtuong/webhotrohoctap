import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import { withRouter } from 'react-router-dom';
import { Checkbox } from "antd";
import './../../SASS/detail.sass';

//firebase
import db from './../../config/firebase.config';
import { ref, child, get } from "firebase/database";

class Xemdapan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dapan: [],
            ten: '',
            made: ''
        }
    }

    componentDidMount() {
        var { match } = this.props;
        var id = match.params.idkt;
        this.setState({
            made: id
        })
        const dbRef = ref(db, "nganhangde");
        get(child(dbRef, id.toString())).then((snapshot) => {
            if (snapshot.exists()) {
                this.props.getdekiemtra(snapshot.val().bocauhoi);
                this.setState({
                    ten: snapshot.val().ten
                })
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    onCancel = () => {
        this.props.history.push('/nguoidung/hoanthanhkiemtra');
    }

    checkDapAn = (dap, dukien) => {
        var rs = false;
        var dapan = [];
        if (dap.length <= 1) {
            if(dap == dukien){
                rs = true;
            }            
        }
        else if (dap.length == 3) {
            let dapan1 = dap.slice(0, 1);
            let dapan2 = dap.slice(2, 3);
            if(dukien == dapan1 || dukien == dapan2){
                rs = true;
            }
        }
        else if (dap.length == 5) {           
            let dapan1 = dap.slice(0, 1);
            let dapan2 = dap.slice(2, 3);
            let dapan3 = dap.slice(4, 5);
            if(dukien == dapan1 || dukien == dapan2 || dukien == dapan3){
                rs = true;
            }
        }
        else if (dap.length == 7) {
            let dapan1 = dap.slice(0, 1);
            let dapan2 = dap.slice(2, 3);
            let dapan3 = dap.slice(4, 5);
            let dapan4 = dap.slice(6, 7);
            if(dukien == dapan1 || dukien == dapan2 || dukien == dapan3 || dukien == dapan4){
                rs = true;
            }
        }
        return rs;
    }

    showCauHoi = (data) => {
        var rs = null;
        if (data) {
            rs = data.map((da, index) => {
                return (
                    <div className="kiemtra">
                        <h3>Câu {(index + 1)}: {da.cauhoi}</h3>
                        <Checkbox className="xemdapan-checkbox" onChange={e => this.onChange(e.target.checked, index, 'A')} defaultChecked={this.checkDapAn(da.dapan, 'A')} disabled>A  {da.A}</Checkbox>
                        <Checkbox className="xemdapan-checkbox" onChange={e => this.onChange(e.target.checked, index, 'B')} defaultChecked={this.checkDapAn(da.dapan, 'B')} disabled>B  {da.B}</Checkbox>
                        <Checkbox className="xemdapan-checkbox" onChange={e => this.onChange(e.target.checked, index, 'C')} defaultChecked={this.checkDapAn(da.dapan, 'C')} disabled>C  {da.C}</Checkbox>
                        <Checkbox className="xemdapan-checkbox" onChange={e => this.onChange(e.target.checked, index, 'D')} defaultChecked={this.checkDapAn(da.dapan, 'D')} disabled>D  {da.D}</Checkbox>
                    </div>
                )
            })
        }
        return rs;
    }

    render() {
        var { getde } = this.props;
        var { ten } = this.state;
        return (
            <div className="container" style={{marginTop:'4.3rem'}}>
                <br />
                <h2 style={{ textAlign: 'center' }}>{ten}</h2>
                <br />
                {this.showCauHoi(getde)}
                <br />
                <br />
                <div>                    
                    <a onClick={this.onCancel} style={{ float: 'left'}}>
                        <button className="btn-nopbai btn-primary">Quay lại</button>
                    </a>
                </div>
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getde: state.getdekiemtra
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getdekiemtra: (dekt) => {
            dispatch(action.getDeKiemTra(dekt));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Xemdapan));