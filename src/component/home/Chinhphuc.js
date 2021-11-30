import { Component } from "react";
import th from "./../../imgs/toanhoc.jpg";
import vl from "./../../imgs/physics.jpg";
import lt from "./../../imgs/laptrinh.jpg";
import ls from "./../../imgs/lichsu.jpg";
import vh from "./../../imgs/vanhoc.jpg";
import imath from "./../../imgs/math.svg";
import iphysics from "./../../imgs/Physics.svg";
import ilaptrinh from "./../../imgs/laptrinh.svg";
import ivh from "./../../imgs/vanhoc.svg";
import ils from "./../../imgs/lichsu.svg";
import {Link} from 'react-router-dom';

class Chinhphuc extends Component {
    render() {
        return (
            <div className="container chinhphuc">
                <h3>Chinh phục đề thi</h3>
                <div className="row">
                    <div className="col-6">
                        <Link to="/nguoidung/alldisplaydethi">
                            <div className="anhlon-cp" style={{ backgroundImage: `url(${th})` }}>
                                <div className="txtbottom">
                                    <i>
                                        <img className="cp-icon" src={imath} />
                                    </i>
                                    <label>Toán học</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to="/nguoidung/alldisplaydethi">
                            <div className="anhlon-cp" style={{ backgroundImage: `url(${vl})` }}>
                                <div className="txtbottom">
                                    <i>
                                        <img className="cp-icon" src={iphysics} />
                                    </i>
                                    <label>Vật lý</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '1rem' }}>
                    <div className="col">
                        <Link to="/nguoidung/alldisplaydethi">
                            <div className="anhnho-cp" style={{ backgroundImage: `url(${lt})` }}>
                                <div className="txtbottom-nho">
                                    <i>
                                        <img className="cp-icon" src={ilaptrinh} />
                                    </i>
                                    <label>Lập trình</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/nguoidung/alldisplaydethi">
                            <div className="anhnho-cp" style={{ backgroundImage: `url(${vh})` }}>
                                <div className="txtbottom-nho">
                                    <i>
                                        <img className="cp-icon" src={ivh} />
                                    </i>
                                    <label>Văn học</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to="/nguoidung/alldisplaydethi">
                            <div className="anhnho-cp" style={{ backgroundImage: `url(${ls})` }}>
                                <div className="txtbottom-nho">
                                    <i>
                                        <img className="cp-icon" src={ils} />
                                    </i>
                                    <label>Lịch sử</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chinhphuc;