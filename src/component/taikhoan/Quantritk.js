import { Component } from "react";
import {Row, Col} from 'antd';
import './../../SASS/quantritk.sass';
import Control from "./Control";
import {connect} from 'react-redux';

class Quantritk extends Component{

    render() {
        var {pagequanlytk} = this.props;
        return (            
            <div className="quantritk" style={{marginTop:'4.3rem'}}>
                <Row>
                    <Col span={6}>
                        <Control />
                    </Col>
                    <Col span={18} style={{paddingLeft:'1.4rem'}}>
                        {pagequanlytk}
                    </Col>
                </Row>

            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        pagequanlytk: state.pagequanlytk
    }
}

export default connect(mapStateToProps,null)(Quantritk);