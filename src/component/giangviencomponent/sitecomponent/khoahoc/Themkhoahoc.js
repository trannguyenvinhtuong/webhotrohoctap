import { Component } from "react";
import { Row, Col, Select } from "antd";
import { connect } from "react-redux";
import * as action from './../../../../actions/index';
import Khoahoc from "../Khoahoc";
import Swal from "sweetalert2";

//firebase
import db from './../../../../config/firebase.config';
import { ref, child, get } from "firebase/database";

const { Option } = Select;

class Themkhoahoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenkhoahoc: '',
            theloai: '1',
            capbacst: '1',
            mota: '',
            gia: '',
            anh: '',
            videogioithieu: '',
            gioithieu: '',
            dieu1: '',
            dieu2: '',
            dieu3: '',
            dieu4: '',
            dieu5: '',
            dieu6: ''
        }
    }

    componentDidMount() {
        this.props.requestChuDe();
        this.props.requestCapBac();
    }

    tooglePage = (page) => {
        this.props.togglepagegiangvien(page);
    }

    handleChangeCD = (value) => {
        this.setState({
            theloai: value
        })
    }

    handleChangeCB = (value) => {
        this.setState({
            capbacst: value
        })
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

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onClear = (e) => {
        e.preventDefault();
        this.setState({
            tenkhoahoc: '',
            theloai: '1',
            capbacst: '1',
            mota: '',
            gia: '',
            anh: '',
            videogioithieu: '',
            gioithieu: '',
            dieu1: '',
            dieu2: '',
            dieu3: '',
            dieu4: '',
            dieu5: '',
            dieu6: ''
        })
    }

    onCancer = () =>{
        window.location.reload();
    }

    onSubmit = (e) =>{
        e.preventDefault();
        var { tenkhoahoc, theloai, capbacst, mota, gia, anh, videogioithieu,gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6 } = this.state;
        console.log(this.state);
        var idgv = JSON.parse(sessionStorage.getItem('magv'));
        var magv = idgv.id;
        var ngaydang = null;
        var date = new Date();
        anh = this.getId(anh);
        videogioithieu = this.getIdYouTube(videogioithieu);
        ngaydang = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
        if(tenkhoahoc === '' ||mota === '' || gia === '' || anh === '' || videogioithieu === '' ||dieu1 === '' ||dieu2 === '' ||dieu3 === '' ||dieu4 === '' ||dieu5 === '' ||dieu6 === ''){
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
        else{
            this.props.insertKhoaHoc(tenkhoahoc, theloai, capbacst, mota, gia, anh, videogioithieu, ngaydang, magv,
                gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6);
                
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'L??u th??nh c??ng',
                showConfirmButton: false,
                timer: 1500
            });
            this.props.togglepagegiangvien(<Khoahoc />);
        }
        
    }

    getId = (url) => {
        return url.match(/[-\w]{25,}/);
    }

    getIdYouTube = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    render() {
        var { chude, capbac } = this.props;
        var { tenkhoahoc, theloai, capbacst, mota, gia, anh, videogioithieu, gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6 } = this.state;
        // console.log(dieu6);
        return (
            <div className="themkhoahoc">
                <div className="container">
                    <a onClick={() => this.tooglePage(<Khoahoc />)}>
                        <button className="btn btn-primary">Quay l???i</button>
                    </a>
                </div>
                <h3>Th??m kho?? h???c</h3>
                <form>
                    <label>T??n kho?? h???c</label>
                    <input className="form-control"
                        name="tenkhoahoc"
                        value={tenkhoahoc}
                        onChange={this.onChange}
                        type="text"
                        placeholder="VD: Kho?? h???c l??m gi??u ..." />
                    <br />
                    <Row>
                        <Col span={12}>
                            <label>Th??? lo???i</label>
                            <br />
                            <Select defaultValue={theloai} style={{ width: '80%' }} onChange={this.handleChangeCD}>
                                {this.showOptionChuDe(chude)}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <label>C???p b???c</label>
                            <br />
                            <Select defaultValue={capbacst} style={{ width: '80%' }} onChange={this.handleChangeCB}>
                                {this.showOptionCapBac(capbac)}
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <label>M?? t???</label>
                    <textarea className="form-control"
                        type="text"
                        placeholder="VD: Kho?? h???c s??? gi??p b???n th??nh t??? ph?? ..."
                        value={mota}
                        onChange={this.onChange}
                        name="mota"
                    >
                    </textarea>
                    <br />
                    <label>Gi?? kho?? h???c</label>
                    <div className="input-group mb-3">
                        <input className="form-control"
                            type="text"
                            value={gia}
                            onChange={this.onChange}
                            name="gia"
                            placeholder="VD: 80000 ..." /><span className="input-group-text">VND</span>
                    </div>
                    <br />
                    <label>???nh kho?? h???c</label>
                    <input className="form-control"
                            type="text"
                            name="anh"
                            value={anh}
                            onChange={this.onChange}
                            placeholder="D??n id file google drive ??? ????y ..." />
                    <br />
                    <label>Video gi???i thi???u kho?? h???c</label>
                    <input className="form-control"
                            type="text"
                            value={videogioithieu}
                            name="videogioithieu"
                            onChange={this.onChange}
                            placeholder="D??n id file google drive ??? ????y ..." />
                    <br />
                    <label>Gi???i thi???u chi ti???t kho?? h???c</label>
                    <textarea
                            className="form-control"
                            type="text"
                            value={gioithieu}
                            name="gioithieu"
                            onChange={this.onChange}
                            placeholder="VD: Kho?? h???c g???m 16 b??i gi???ng ..."></textarea>
                    <br />
                    <label>6 ??i???u ?????t ???????c khi tham gia kho?? h???c</label>
                    <Row>
                        <Col span={12}>
                            <textarea 
                                className="small-textarea form-control" 
                                type="text" 
                                value={dieu1}
                                name="dieu1" 
                                onChange={this.onChange}
                                placeholder="??i???u 1..."></textarea>
                            <br />
                            <textarea
                                className="small-textarea form-control" 
                                type="text" 
                                value={dieu2}
                                name="dieu2" 
                                onChange={this.onChange}
                                placeholder="??i???u 2..."></textarea>
                            <br />
                            <textarea 
                                className="small-textarea form-control" 
                                type="text" 
                                value={dieu3}
                                name="dieu3" 
                                onChange={this.onChange}
                                placeholder="??i???u 3..."></textarea>
                        </Col>
                        <Col span={12}>
                            <textarea 
                                className="small-textarea form-control" 
                                type="text" 
                                value={dieu4}
                                name="dieu4" 
                                onChange={this.onChange}
                                placeholder="??i???u 4..."></textarea>
                            <br />
                            <textarea 
                                className="small-textarea form-control" 
                                type="text" 
                                value={dieu5}
                                name="dieu5" 
                                onChange={this.onChange}
                                placeholder="??i???u 5..."></textarea>
                            <br />
                            <textarea 
                                className="small-textarea form-control" 
                                type="text" 
                                value={dieu6}
                                name="dieu6" 
                                onChange={this.onChange}
                                placeholder="??i???u 6..."></textarea>
                        </Col>
                    </Row>
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
        chude: state.getchude,
        capbac: state.getcapbac
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        togglepagegiangvien: (page) => {
            dispatch(action.togglePageGiangVien(page));
        },
        requestChuDe: () => {
            dispatch(action.requestChuDe());
        },
        requestCapBac: () => {
            dispatch(action.requestCapBac());
        },
        insertKhoaHoc: (tenkhoahoc, theloai, capbacst, mota, gia, anh, videogioithieu,ngaydang,magv,
            gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6) =>{
            dispatch(action.insertKhoaHoc(tenkhoahoc, theloai, capbacst, mota, gia, anh, videogioithieu, ngaydang, magv,
                gioithieu, dieu1, dieu2, dieu3, dieu4, dieu5, dieu6));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Themkhoahoc);