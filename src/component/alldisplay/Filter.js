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
            keyword: '',
            machude: '',
            macapbac: ''
        }
    }

    componentDidMount() {
        this.onReset();
        this.props.requestChuDe();
        this.props.requestCapBac();
        var {iddm} = this.props;
        if(iddm != 0 ){
            this.setState({
                machude: iddm
            });
            var filter = {
                machude: iddm
            };
            this.props.onFilter(filter);
        }
        else{
            this.onReset();
        }
    }

    handleChangeCD = (value) => {
        var filter = {
            machude: value
        }
        this.props.onFilter(filter);
        this.setState({
            machude: value
        })
    }

    handleChangeCB = (value) => {
        var filter = {
            macapbac: value
        }
        this.props.onFilter(filter);
        this.setState({
            macapbac: value
        })
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
            keyword: '',
            machude: '',
            macapbac: ''
        }
        this.props.onFilter(filter);
        this.setState({
            keyword: '',
            machude: '',
            macapbac: ''
        })
    }

    showChuDe = (data) => {
        var rs = null;
        if (data) {
            rs = data.map((da, index) => {
                return (
                    <Option value={da.MaCD}>{da.TenCD}</Option>
                )
            })
        }
        return rs;
    }

    showCapBac = (data) => {
        var rs = null;
        if (data) {
            rs = data.map((da, index) => {
                return (
                    <Option value={da.MaCB}>{da.TenCB}</Option>
                )
            })
        }
        return rs;
    }

    render() {
        var { keyword, machude, macapbac } = this.state;
        var { chude, capbac } = this.props;

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
                <h3>Theo chủ đề</h3>
                <Select className="select-width"
                    onChange={this.handleChangeCD}
                    value={machude === '' ? null : machude}
                >
                    {this.showChuDe(chude)}
                </Select>
                <h3>Theo cấp bậc</h3>
                <Select className="select-width"
                    onChange={this.handleChangeCB}
                    value={macapbac === '' ? null : macapbac}
                >
                    {this.showCapBac(capbac)}
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

const mapStateToProps = (state) => {
    return {
        chude: state.getchude,
        capbac: state.getcapbac
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilter: (filter_data) => {
            dispatch(action.onFilter(filter_data));
        },
        requestChuDe: () => {
            dispatch(action.requestChuDe());
        },
        requestCapBac: () => {
            dispatch(action.requestCapBac());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);