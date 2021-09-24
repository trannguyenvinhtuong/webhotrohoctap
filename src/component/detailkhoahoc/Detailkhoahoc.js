import { Component } from "react";
import {Row, Col} from 'antd';
import Gioithieu from "./Gioithieu";
import Price from "./Price";
import Content from "./content/Content";

class Detailkhoahoc extends Component{
    render() {
        return (
            <div style={{marginTop:'5.5rem'}}>
                <Row>
                    <Col span={17}>
                        <Gioithieu />
                        <Content />
                    </Col>
                    <Col span={7}>
                        <Price />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Detailkhoahoc;