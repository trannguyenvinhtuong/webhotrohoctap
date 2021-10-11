import {Component} from 'react';
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import * as action from '../../actions/index';

import Tab from './Tab';
import Tableofdata from './Tableofdata';
import Filter from './Filter';

class AlldislayTaiLieu extends Component{
    componentDidMount(){
        this.props.requestTaiLieu();
    }
    render() {
        var {tooglefilter} = this.props;

        return (
            <div style={{marginTop:'4.7rem'}} >
                <Tab />
                <Row className="padding-element">
                    <Col span={tooglefilter === true ? 6 : 0}>
                        <Filter />
                    </Col>
                    <Col span={tooglefilter === true ? 18 : 24}>
                        <Tableofdata />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        tooglefilter: state.tooglefilter,        
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return{
        requestTaiLieu : () =>{
            dispatch(action.requestTaiLieu());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AlldislayTaiLieu);