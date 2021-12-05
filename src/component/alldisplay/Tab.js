import { Component } from "react";
import './../../SASS/tab.sass';
import { SortAscendingOutlined, FilterOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import {connect} from 'react-redux';
import * as action from './../../actions/index';

class Tab extends Component {
    onChose = () =>{
        this.props.toogleFilter();
    }

    onClick = (data) =>{
        var da = {
            sort_kh_data: data
        }
        this.props.onSortKH(da);
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={()=>this.onClick('tang')}>
                        Giá tăng dần
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={()=>this.onClick('giam')}>
                        Giá giảm dần
                    </a>
                </Menu.Item>
            </Menu>
        );
        
        return (
            <div className="tab">
                <div className="left-content">
                    <h3>Learn <i className="fas fa-angle-double-right"></i> Khóa học</h3>
                </div>
                <div className="right-content">
                    <div>
                        <a className="icon-tab" onClick={this.onChose} >
                            <FilterOutlined className="color-w" />
                        </a>
                    </div>
                    <div>
                        <a href="#" className="icon-tab">                            
                            <Dropdown overlay={menu} placement="bottomCenter" arrow>
                                <SortAscendingOutlined />
                            </Dropdown>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return{
        toogleFilter : () =>{
            dispatch(action.toogleFilter());
        },
        onSortKH: (sortdata) =>{
            dispatch(action.onSortKH(sortdata));
        }
    }
}

export default connect(null,mapDispatchToProps)(Tab);