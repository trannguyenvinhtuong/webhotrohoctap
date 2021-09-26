import { Component } from 'react';
import './../../SASS/khoahoc.sass';
import { Row, Col, Table } from 'antd';
import { Link } from 'react-router-dom';
import './../../SASS/detail.sass';
import im from './../../imgs/person.jpg';

const data = [
    {
        key: '1',
        nam: 'chuong 1',
        link: 'https://drive.google.com/file/d/1w-jYKpuk7aCs1Z7OGtrQ2vESpzkftYE0/preview'
    },
    {
        key: '2',
        nam: 'chuong 2',
        link: 'https://drive.google.com/file/d/1SAmxbvxXinM2i-YA5Zp12MxF0JtptB5O/preview'
    },
    {
        key: '3',
        nam: 'chuong 3',
        link: 'https://drive.google.com/file/d/1t8aT9-xvd5zBEcwpTxgZvHPranffx45W/preview' 
    },
    {
        key: '4',
        nam: 'chuong 1',
        link: 'https://drive.google.com/file/d/1tsk-ueXg3yPNs0itpe0RRI0ROUxzBB1N/preview'
    },
    {
        key: '5',
        nam: 'chuong 2',
        link: 'https://drive.google.com/file/d/1MSA2F9-gh3PwRgmiAD6DSMjBXIncyB7w/preview'
    },
    {
        key: '6',
        nam: 'chuong 3'
    },
    {
        key: '7',
        nam: 'chuong 1'
    },
    {
        key: '8',
        nam: 'chuong 2'
    },
    {
        key: '9',
        nam: 'chuong 3'
    },
    {
        key: '10',
        nam: 'chuong 1'
    },
    {
        key: '11',
        nam: 'chuong 2'
    },
    {
        key: '12',
        nam: 'chuong 3'
    },
    {
        key: '13',
        nam: 'chuong 1'
    },
    {
        key: '14',
        nam: 'chuong 2'
    },
    {
        key: '15',
        nam: 'chuong 3'
    }
];

class Khoahoc extends Component {
    constructor(props){
        super(props);
        this.state={
            link: ''
        }
    }

    clickShow = (da) =>{
        this.setState({
            link: da
        })
    }

    render() {
        const columns = [
            {
                title: 'Bài học',
                key: 'nam',
                render: (record) => <a onClick={()=>this.clickShow(record.link)} className="namekh">{record.nam}</a>
            }
        ]
        var {link} = this.state;
        console.log(link);
        return (            
            <div style={{ marginTop: '4.7rem' }}>
                <div className="khoahocvideo">
                    <Row>
                        <Col span={18} className="video-kh">
                            <iframe src={link} width="100%" height="615px" allow="autoplay"></iframe>   
                            <br />
                            <br/>
                            <div className="detail-gioithieu" style={{borderRadius: '3px'}}>
                                <h1>Nhập môn chứng khoán</h1>
                                <p>
                                    Khóa học chứng khoán online giúp bạn nắm bắt được kiến thức đầu tư chứng khoán đầy đủ, bài bản và chi tiết nhất dành cho người mới bắt đầu tham gia. Bí quyết để nhanh chóng có được nguồn lợi nhuận khổng lồ từ thị trường chứng khoán
                                </p>
                                <div>
                                    <img src={im} />
                                    <span>Đặng Trọng Khang</span>
                                    <span>
                                        <i class="far fa-smile" style={{ color: 'yellow' }}></i>
                                        3950 Đánh giá
                                    </span>
                                    <span>
                                        <i class="fas fa-user-graduate"></i>
                                        4554 Học viên
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <Table dataSource={data} columns={columns} />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Khoahoc;