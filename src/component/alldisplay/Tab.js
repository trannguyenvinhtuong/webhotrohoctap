import { Component } from "react";
import './../../SASS/tab.sass';
import { SortAscendingOutlined, FilterOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import {connect} from 'react-redux';
import * as action from './../../actions/index';

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        </Menu.Item>
    </Menu>
);

class Tab extends Component {
    onChose = () =>{
        this.props.toogleFilter();
    }
    render() {
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
                            <Dropdown overlay={menu} placement="topCenter" arrow>
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
        }
    }
}

export default connect(null,mapDispatchToProps)(Tab);