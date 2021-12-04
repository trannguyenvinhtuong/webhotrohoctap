import { Component } from "react";
import ps from "./../../imgs/person.jpg";
import * as action from './../../actions/index';
import { connect } from "react-redux";

class Gvtieubieu extends Component {
    componentDidMount() {
        this.props.requestGiangVien();
    }

    loadItemSlide = (data) => {
        var rs = null;
        rs = data.map((da) => {
            return(
                <div className="col">
                    <a>
                        <div className="gv-item">
                            <img src={da.AnhDaiDien} />
                            <label>{da.TenKH}</label>
                            <p>{da.TrinhDo} {da.ChuyenNganh}</p>
                        </div>
                    </a>
                </div>
            )
        });
        return rs;
    }

    showSlide = (data) => {
        var rs = null;
        if (data < 5) {
            rs = (
                <div className="carousel-inner" style={{ padding: '2rem' }}>
                    <div className="carousel-item active">
                        <div className="container">
                            <div className="row">
                                {this.loadItemSlide(data)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            var da = [];
            for(let i =0; i<5; i++){
                da.push(data[i]);
            }
            rs = (
                <div className="carousel-inner" style={{ padding: '2rem' }}>
                    <div className="carousel-item active">
                        <div className="container">
                            <div className="row">
                                {this.loadItemSlide(da)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        // if (data.length > 5 && data.length < 11) {
        //     var datadau = [];
        //     var datacuoi = [];
        //     for (let i = 0; i < 5; i++) {
        //         datadau.push(data[i]);
        //     }
        //     for (let i = 5; i < 9; i++) {
        //         datacuoi.push(data[i]);
        //     }
        //     rs = (
        //         <div className="carousel-inner" style={{ padding: '2rem' }}>
        //             <div className="carousel-item active">
        //                 <div className="container">
        //                     <div className="row">
        //                         {this.loadItemSlide(datadau)}
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="carousel-item">
        //                 <div className="container">
        //                     <div className="row">
        //                         {this.loadItemSlide(datacuoi)}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //     )
        // }
        return rs;
    }

    render() {
        var { giangvien } = this.props;

        return (
            <div className="container gvtieubieu">
                <h3>Giảng viên tiêu biểu</h3>
                <div id="carouselExampleControls" style={{ marginTop: '1rem' }} className="carousel slide" data-bs-ride="carousel">
                    {this.showSlide(giangvien)}

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        giangvien: state.getgiangvien
    }
}

const mapDispacthToProps = (dispatch, props) => {
    return {
        requestGiangVien: () => {
            dispatch(action.requestGiangVien());
        }
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(Gvtieubieu);