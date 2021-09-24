import { Component } from "react";
import AT from './../../imgs/amthuc.jpg';

class Noidung extends Component {
    render() {
        return (
            <div className="container noidung">
                <h3>Nội dung hot</h3>
                <br />
                <div className="row">
                    <div className="col-4">
                        <div>
                            <a href="#">
                                <img className="bigimg-nd" src={AT} />
                            </a>
                            <h2>Làm chủ Canva.com cơ bản và nâng cao</h2>
                            <p className="ngaydang-big">Sep 3, 2021 / Công nghệ </p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row" style={{ paddingBottom: '.8rem' }}>
                            <div className="col">
                                <a href="#">
                                    <img className="smallimg-nd" src={AT} />
                                </a>
                            </div>
                            <div className="col">
                                <h1>Làm chủ Canva.com cơ bản và nâng cao</h1>
                                <p className="ngaydang-small">Sep 3, 2021 / Công nghệ </p>
                            </div>

                        </div>
                        <div className="row" style={{ paddingBottom: '.8rem' }}>
                            <div className="col">
                                <a href="#">
                                    <img className="smallimg-nd" src={AT} />
                                </a>
                            </div>
                            <div className="col">
                                <h1>Làm chủ Canva.com cơ bản và nâng cao</h1>
                                <p className="ngaydang-small">Sep 3, 2021 / Công nghệ </p>
                            </div>

                        </div>
                        <div className="row" style={{ paddingBottom: '.8rem' }}>
                            <div className="col">
                                <a href="#">
                                    <img className="smallimg-nd" src={AT} />
                                </a>
                            </div>
                            <div className="col">
                                <h1>Làm chủ Canva.com cơ bản và nâng cao</h1>
                                <p className="ngaydang-small">Sep 3, 2021 / Công nghệ </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row" style={{ paddingBottom: '.8rem' }}>
                            <div className="col">
                                <a href="#">
                                    <img className="smallimg-nd" src={AT} />
                                </a>
                            </div>
                            <div className="col">
                                <h1>Làm chủ Canva.com cơ bản và nâng cao</h1>
                                <p className="ngaydang-small">Sep 3, 2021 / Công nghệ </p>
                            </div>

                        </div>
                        <div className="row" style={{ paddingBottom: '.8rem' }}>
                            <div className="col">
                                <a href="#">
                                    <img className="smallimg-nd" src={AT} />
                                </a>
                            </div>
                            <div className="col">
                                <h1>Làm chủ Canva.com cơ bản và nâng cao</h1>
                                <p className="ngaydang-small">Sep 3, 2021 / Công nghệ </p>
                            </div>

                        </div>
                        <div className="row" style={{ paddingBottom: '.8rem' }}>
                            <div className="col">
                                <a href="#">
                                    <img className="smallimg-nd" src={AT} />
                                </a>
                            </div>
                            <div className="col">
                                <h1>Làm chủ Canva.com cơ bản và nâng cao</h1>
                                <p className="ngaydang-small">Sep 3, 2021 / Công nghệ </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Noidung;