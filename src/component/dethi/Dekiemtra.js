import { Component } from "react";
import db from './../../config/firebase.config';
import { ref, child, get } from "firebase/database";
import anhbaikiemtra from './../../imgs/anhbaikiemtra.jpg';
import './../../SASS/detail.sass';
import {Table} from 'antd';
import * as action from './../../actions/index';
import { connect } from "react-redux";
import {Row, Col} from 'antd';
import {Link} from 'react-router-dom';

import Tab from './Tab';
import Filter from "./Filter";

class Dekiemtra extends Component{
    constructor(props){
        super(props);
        this.state={
            dethi: []
        }
    }
    componentDidMount() {
        const dbref = ref(db);
        get(child(dbref, "nganhangde")).then((snapshot) => {            
            if (snapshot.exists()) {
                this.setState({
                    dethi: snapshot.val()
                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        this.props.requestCapBac();
        this.props.requestChuDe();
    }

    showCapBac = (makt) =>{
        var rs = null;
        var {capbac} = this.props;
        if(capbac){
            rs = capbac.map((cb)=>{                
                if(makt == cb.MaCB){
                    return (
                        <p>{cb.TenCB}</p>
                    )
                }                
            });
        }
        return rs;
    }

    showChuDe = (makt) =>{
        var rs = null;
        var {chude} = this.props;
        if(chude){
            rs = chude.map((cb)=>{                
                if(makt == cb.MaCD){
                    return (
                        <p>{cb.TenCD}</p>
                    )
                }                
            });
        }
        return rs;
    }

    render() {
        var {dethi} = this.state;
        console.log(dethi);
        const columns = [
            {
                title: '',
                render: () => <img src={anhbaikiemtra} />
            },
            {
                title: 'Tên',
                render: (record) => <Link to={`/nguoidung/kiemtra/${record.ma}`}>{record.ten}</Link>
            },
            {
                title: 'Chủ đề',
                render: (record) => this.showChuDe(record.macd)
            },
            {
                title: 'Cấp bậc',
                render: (record) => this.showCapBac(record.macb)
            }
        ]
        var {toggledekt,onfilterkt} = this.props;
        if(onfilterkt.keyword){
            if(dethi){
                dethi = dethi.filter((kh)=>{
                    return (kh.ten).toLowerCase().indexOf(onfilterkt.keyword.toLowerCase()) != -1;
                })
            }            
        }
        if(onfilterkt.machude){
            if(dethi){
                dethi = dethi.filter((kh)=>{
                    return kh.macd == onfilterkt.machude
                })
            }
        }
        if(onfilterkt.macapbac){
            if(dethi){
                dethi = dethi.filter((kh)=>{
                    return kh.macb == onfilterkt.macapbac
                })
            }
        }
        return (           
            <div style={{marginTop: '4.5rem'}} className="alldisplaydekiemtra">                
                <Tab />
                <Row className="padding-element">
                    <Col span={toggledekt === true ? 6 : 0}>
                        <Filter />
                    </Col>
                    <Col span={toggledekt === true ? 18 : 24}>
                        <Table dataSource={dethi} columns={columns} rowKey="ten"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        capbac: state.getcapbac,
        chude: state.getchude,
        toggledekt: state.toggledekt,
        onfilterkt: state.onfilterkt
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestCapBac: () =>{
            dispatch(action.requestCapBac());
        },
        requestChuDe: () =>{
            dispatch(action.requestChuDe());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dekiemtra);