import { Component } from "react";
import './../../SASS/filter.sass';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as action from './../../actions/index';

const { Option } = Select;

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            keyword: name === 'filtername' ? value : this.state.keyword
        };
        this.props.onFilter(filter);
        this.setState({
            keyword: name === 'filtername' ? value : this.state.keyword
        });

    }
    onReset = () => {
        var filter = {
            keyword: ''
        }
        this.props.onFilter(filter);
        this.setState({
            keyword: ''
        })
    }
    render() {
        var { keyword } = this.state;
        return (
            <div className="filter">
                <h2>Filter</h2>
                <Input size="medium"
                    name="filtername"
                    placeholder="Tìm theo chữ cái....."
                    className="key-search"
                    value={keyword}
                    prefix={<SearchOutlined />}
                    onChange={this.onChange} />
                <h3>Theo thể loại</h3>
                <Select className="select-width" defaultValue="lucy" onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <h3>Theo chủ đề</h3>
                <Select className="select-width" defaultValue="lucy" onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <a onClick={this.onReset}>
                    <button className="reset-btn" block>
                        Reset
                    </button>
                </a>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilter: (filter_data) => {
            dispatch(action.onFilter(filter_data));
        }
    }
}

export default connect(null, mapDispatchToProps)(Filter);