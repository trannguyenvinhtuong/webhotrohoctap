import { Component } from "react";
import {Row, Col} from 'antd';
import Gioithieu from "./Gioithieu";
import Price from "./Price";
import Content from "./content/Content";

class Detailkhoahoc extends Component{   
    render() {
        var {match} = this.props;
        var idkh = match.match.params.idkhoahoc;
        return (
            <div style={{marginTop:'4.3rem'}} >
                <Row>
                    <Col span={17}>
                        <Gioithieu idkh = {idkh} />
                        <Content idkh = {idkh} />
                    </Col>
                    <Col span={7}>
                        <Price idkh = {idkh} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Detailkhoahoc;
