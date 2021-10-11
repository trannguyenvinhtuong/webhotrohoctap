import {Component} from 'react';
import Gioithieu from './Gioithieu';
import Price from './Price';
import Thongtingv from './Thongtingv';
import Showpdf from './Showpdf';
import {Row,Col} from 'antd';
import './../../SASS/detail.sass';

class Detailtailieu extends Component{
    render() {
        var {match} = this.props;
        var idtailieu = match.match.params.idtailieu;
        return (
            <div style={{marginTop: '5rem'}}>
                <Row>
                    <Col span={17}>
                        <Gioithieu idtailieu = {idtailieu} />
                        <Showpdf idtailieu = {idtailieu} />
                        <div className="content">
                            <Thongtingv idtailieu = {idtailieu} />
                        </div>                        
                    </Col>
                    <Col span={7}>
                        <Price idtailieu = {idtailieu} />
                    </Col>
                </Row>
            </div>
        );
    }
}



export default Detailtailieu;