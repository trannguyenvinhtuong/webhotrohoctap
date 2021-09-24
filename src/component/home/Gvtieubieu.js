import { Component } from "react";
import vl from "./../../imgs/physics.jpg";
import ls from "./../../imgs/lichsu.jpg";
import ps from "./../../imgs/person.jpg";

class Gvtieubieu extends Component {
    render() {
        return (
            <div className="container gvtieubieu">
                <h3>Giảng viên tiêu biểu</h3>
                <div id="carouselExampleControls" style={{ marginTop: '1rem' }} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner" style={{ padding: '2rem' }}>
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn A</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn A</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn A</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn A</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn A</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn C</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn C</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn C</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn C</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn C</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn B</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn B</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn B</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn B</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a href="#">
                                            <div className="gv-item">
                                                <img src={ps} />
                                                <label>Nguyễn Văn B</label>
                                                <p>Thạc sĩ công nghệ thông tin</p>
                                            </div>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Gvtieubieu;