import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import Tailieu from './Quanlytailieu';
import { Row, Col, Select } from "antd";
import Swal from "sweetalert2";

const { Option } = Select;

class Detailtailieu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matl: '',
            tentl: '',
            mota: '',
            gia: '',
            anhtl: '',
            filedemo: '',
            sotrang: '',
            macd: '1',
            macb: '1',
            link: '',
            up: false
        }
    }

    componentDidMount() {
        var idtailieu = sessionStorage.getItem('idtailieu');
        var matailieu = JSON.parse(idtailieu);
        this.props.requestMotTaiLieu(matailieu.id);
        this.props.requestChuDe();
        this.props.requestCapBac();
        // var user = JSON.parse(localStorage.getItem('user'));
        // var idkh = user.makh;
        // this.props.requestCheckGV(idkh);
        this.setState({
            up: true
        })    
    }

    componentWillReceiveProps(){        
            var tailieu = this.props.tailieu;
            var tl = tailieu[0];
            this.setState({
                matl: tailieu.MaTL === undefined ? tl.MaTL : tailieu.MaTL,
                tentl: tailieu.TenTL === undefined ? tl.TenTL : tailieu.TenTL,
                mota: tailieu.MoTa === undefined ? tl.MoTa : tailieu.MoTa,
                gia: tailieu.GiaTL === undefined ? tl.GiaTL : tailieu.GiaTL,
                anhtl: tailieu.AnhTL === undefined ? tl.AnhTL : tailieu.AnhTL,
                filedemo: tailieu.Demo === undefined ? tl.Demo : tailieu.Demo,
                sotrang: tailieu.SoTrang === undefined ? tl.SoTrang : tailieu.SoTrang,
                link: tailieu.Link === undefined ? tl.Link : tailieu.Link,
                macd: tailieu.MaCD === undefined ? tl.MaCD : tailieu.MaCD,
                macb: tailieu.MaCB === undefined ? tl.MaCB : tailieu.MaCB
            });
    }    

    handleChangeCD = (value) => {
        this.setState({
            macd: value
        })
    }

    handleChangeCB = (value) => {
        this.setState({
            macb: value
        })
    }

    tooglePage = (page) => {
        this.props.togglePageAdmin(page);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    getId = (url) => {
        return url.match(/[-\w]{25,}/);
    }

    onSubmit = (event) => {
        event.preventDefault();
        var { matl, tentl, mota,
            gia, anhtl, filedemo, sotrang,
            link, macb, macd } = this.state;
        var date = new Date();
        var ngaydang = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        var {tailieu} = this.props;
        var magv = tailieu[0].MaGV;    
        if(anhtl){
            anhtl = this.getId(anhtl);
        }
        if(filedemo){
            let id = this.getId(filedemo);
            filedemo = "https://drive.google.com/file/d/"+id+"/preview";
        }
        if(link){
            let id = this.getId(link);
            link = "https://drive.google.com/file/d/"+id+"/preview";
        }  
        if (tentl === '' || mota === '' || macb === '' ||macd === '' ||anhtl === '' ||gia === '' ||filedemo === '' ||sotrang === '' ||ngaydang === '' ||link === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng nh???p ?????y ????? th??ng tin!'
            });
        }
        else if(gia < 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n d??? li???u h???p l???!'
            });
        }
        else if(isNaN(gia)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n d??? li???u h???p l???!'
            });
        }
        else if(sotrang < 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n d??? li???u h???p l???!'
            });
        }
        else if(isNaN(sotrang)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui l??ng ??i???n d??? li???u h???p l???!'
            });
        }
        else{
            Swal.fire({
                title: 'X??c nh???n',
                text: "B???n c?? ch???c ch???n",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'C??',
                cancelButtonText: 'Kh??ng'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.updateTaiLieu(matl, tentl, mota,
                        magv, macb, macd, gia, anhtl, filedemo, sotrang,
                        ngaydang, link);
                    Swal.fire(
                        'Th??nh c??ng!',
                        'C???p nh???t ???? l??u.',
                        'success'
                    )
                    this.tooglePage(<Tailieu />)
                }
            });
        }
        
    }

    showOptionChuDe = (data) => {
        var rs = null;
        if (data.length > 0) {
            rs = data.map((da) => {
                return (
                    <Option key={da.MaCD} value={da.MaCD}>{da.TenCD}</Option>
                );
            });
        }
        return rs;
    }

    showOptionCapBac = (data) => {
        var rs = null;
        if (data.length > 0) {
            rs = data.map((da) => {
                return (
                    <Option key={da.MaCB} value={da.MaCB}>{da.TenCB}</Option>
                );
            });
        }
        return rs;
    }

    onCancer = () => {
        window.location.reload();
    }

    onClear = (e) => {
        e.preventDefault();
        var tailieu = this.props.tailieu;
        var tl = tailieu[0];
        this.setState({
            matl: tailieu.MaTL === undefined ? tl.MaTL : tailieu.MaTL,
            tentl: tailieu.TenTL === undefined ? tl.TenTL : tailieu.TenTL,
            mota: tailieu.MoTa === undefined ? tl.MoTa : tailieu.MoTa,
            gia: tailieu.GiaTL === undefined ? tl.GiaTL : tailieu.GiaTL,
            anhtl: tailieu.AnhTL === undefined ? tl.AnhTL : tailieu.AnhTL,
            filedemo: tailieu.Demo === undefined ? tl.Demo : tailieu.Demo,
            sotrang: tailieu.SoTrang === undefined ? tl.SoTrang : tailieu.SoTrang,
            link: tailieu.Link === undefined ? tl.Link : tailieu.Link,
            macd: tailieu.MaCD === undefined ? tl.MaCD : tailieu.MaCD,
            macb: tailieu.MaCB === undefined ? tl.MaCB : tailieu.MaCB
        });
    }

    render() {
        var { tentl, mota, gia, anhtl, filedemo, sotrang, link, macd, macb } = this.state;
        var { chude, capbac, tailieu } = this.props;
        return (
            <div className="themkhoahoc">
                <div className="container">
                    <a onClick={() => this.tooglePage(<Tailieu />)}>
                        <button className="btn btn-primary">Quay l???i</button>
                    </a>
                </div>

                <h3>Th??ng tin t??i li???u</h3>
                <form>
                    <label>T??n t??i li???u</label>
                    <input className="form-control"
                        type="text"
                        value={tentl}
                        name="tentl"
                        onChange={this.onChange}
                        placeholder="VD: T??i li???u ..." />
                    <br />
                    <Row>
                        <Col span={12}>
                            <label>Th??? lo???i</label>
                            <br />
                            <Select value={macd} style={{ width: '80%' }} onChange={this.handleChangeCD}>
                                {this.showOptionChuDe(chude)}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <label>C???p b???c</label>
                            <br />
                            <Select value={macb} style={{ width: '80%' }} onChange={this.handleChangeCB}>
                                {this.showOptionCapBac(capbac)}
                            </Select>
                        </Col>
                    </Row>
                    <label>M?? t???</label>
                    <textarea className="form-control"
                        type="text"
                        value={mota}
                        name="mota"
                        onChange={this.onChange}
                        placeholder="VD: T??i li???u s??? gi??p b???n ..."></textarea>
                    <br />
                    <label>Gi?? t??i li???u</label>
                    <div className="input-group mb-3">
                        <input className="form-control"
                            type="text"
                            value={gia}
                            onChange={this.onChange}
                            name="gia"
                            placeholder="VD: 80000 ..." /><span className="input-group-text">VND</span>
                    </div>
                    <br />
                    <label>???nh t??i li???u</label>
                    <input className="form-control"
                        type="text"
                        value={anhtl}
                        name="anhtl"
                        onChange={this.onChange}
                        placeholder="D??n id file google drive ??? ????y ..." />
                    <br />
                    <label>File demo t??i li???u</label>
                    <input className="form-control"
                        type="text"
                        value={filedemo}
                        name="filedemo"
                        onChange={this.onChange}
                        placeholder="D??n id file google drive ??? ????y ..." />
                    <br />
                    <label>S??? trang t??i li???u</label>
                    <input className="form-control"
                        type="text"
                        value={sotrang}
                        name="sotrang"
                        onChange={this.onChange}
                        placeholder="8 ..." />
                    <br />
                    <label>Link t??i li???u</label>
                    <input className="form-control"
                        type="text"
                        value={link}
                        name="link"
                        onChange={this.onChange}
                        placeholder="Link file google drive ..." />
                    <br />
                    <br />
                    <div className="bottom-btn">
                        <a onClick={this.onSubmit}>
                            <button className="btn btn-success">L??u l???i</button>
                        </a>
                        <a onClick={this.onClear}>
                            <button className="btn btn-warning">Xo?? h???t</button>
                        </a>
                        <a onClick={this.onCancer}>
                            <button className="btn btn-danger">Hu??? b???</button>
                        </a>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        giangvien: state.checkgv,
        chude: state.getchude,
        capbac: state.getcapbac,
        tailieu: state.getmottailieu
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        togglePageAdmin: (page) => {
            dispatch(action.togglePageAdmin(page));
        },
        requestMotTaiLieu: (idtailieu) => {
            dispatch(action.requestMotTaiLieu(idtailieu));
        },
        requestChuDe: () => {
            dispatch(action.requestChuDe());
        },
        requestCapBac: () => {
            dispatch(action.requestCapBac());
        },
        requestCheckGV: (idkh) => {
            dispatch(action.requestCheckGV(idkh));
        },
        updateTaiLieu: (matl, tentl, mota,
            magv, macb, macd, giatl, anhtl, demo, sotrang,
            ngaydang, link) => {
            dispatch(action.updateTaiLieu(matl, tentl, mota,
                magv, macb, macd, giatl, anhtl, demo, sotrang,
                ngaydang, link));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailtailieu);