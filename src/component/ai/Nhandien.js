import { Component } from "react";
import Toastify from "toastify-js";
import * as faceapi from 'face-api.js';
import './../../SASS/nhandien.sass';
import { connect } from "react-redux";
// import '@tensorflow/tfjs-node';
import * as action from './../../actions/index';
import {Table} from 'antd';
import {Link} from 'react-router-dom';

async function loadTrainingdata() {
    // var khachhang = data;
    const labels = ['6', '13', '14', '15'];
    
    const faceDecription = [];
    for (const label of labels) {
        const decriptors = [];
        for (let i = 1; i <= 4; i++) {
            const image = await faceapi.fetchImage(`/data/${label}/${i}.jpg`);
            const dectection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
            decriptors.push(dectection.descriptor);
        }
        faceDecription.push(new faceapi.LabeledFaceDescriptors(label, decriptors));
    }
    return faceDecription;
}

async function loadModel() {
    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    ]);
}

class Nhandien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ten: ''
        }
    }

    componentWillMount() {
        loadModel();
    }

    async onChange(file){
        const trainingdata = await loadTrainingdata();
        const facematcher = new faceapi.FaceMatcher(trainingdata, 0.6);
    
        const contai = document.querySelector("#container-anh");
        const img = await faceapi.bufferToImage(file);
        const canvas = faceapi.createCanvasFromMedia(img);
        contai.innerHTML = "";
        contai.append(img);
        contai.append(canvas);
    
        const size = {
            witdth: img.width,
            height: img.height
        }
        faceapi.matchDimensions(canvas, size);
    
        const detect = await faceapi.detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
        const detection = await faceapi.detectAllFaces(img)
            .withFaceLandmarks()
            .withFaceDescriptors();
        const resizedetect = faceapi.resizeResults(detection, { width: img.width, height: img.height });
        canvas.width = img.width;
        canvas.height = img.height;
    
        for (const dec of resizedetect) {
            const box = dec.detection.box;
            const drawbox = new faceapi.draw.DrawBox(box, {
                label: facematcher.findBestMatch(detect.descriptor).toString()
            });
            drawbox.draw(canvas);
        }
        const rs = facematcher.findBestMatch(detect.descriptor).label.toString();
        if(rs!='unknown'){
            this.props.requestCheckGV(rs);
        }
        
    }

    render() {
        // var {khachhang,giangvien} = this.props;
        var giangvien = [];
        giangvien = this.props.giangvien;
        const columns = [
            {
                title: 'Tên giảng viên',
                render: (record) => <Link to={`/nguoidung/khoahoctheogv/${record.MaKH}`}>{record.TenKH}</Link>
            },
            {
                title: 'Trình độ',
                render: (record) => <p>{record.TrinhDo}</p>
            },
            {
                title: 'Nơi công tác',
                render: (record) => <p>{record.NoiCongTac}</p>
            },
            {
                title: 'Kinh nghiệm',
                render: (record) => <p>{record.KinhNghiem} năm</p>
            }
        ]
        return (
            <div style={{ height: '900px auto', marginTop: '5.5rem' }} className="container">
                <h1 className="nhandien-h1">Nhận diện giảng viên</h1>
                <input ref="file" type="file" name="file" onChange={(e) => this.onChange(e.target.files[0])} />
                <br />
                <br />
                <div id="container-anh" className="container-anh"></div>
                <br />
                {giangvien != undefined ? <Table dataSource={[...giangvien]} columns={columns} /> : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        khachhang: state.getanhkh,
        giangvien: state.checkgv
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestAnhKH: () => {
            dispatch(action.requestAnhKH());
        },
        requestCheckGV: (idkh) =>{
            dispatch(action.requestCheckGV(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Nhandien);