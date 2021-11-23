import { Component } from "react";
import storage from '../../config/firebaseFireStorage';
import { getDownloadURL } from "firebase/storage";
import * as str  from "firebase/storage";
import { connect } from "react-redux";
import {Row, Col} from 'antd';

var mammoth = require("mammoth");

class TaiLieu extends Component{
    readFileInputEventAsArrayBuffer = (files, callback) => {
        var request = new XMLHttpRequest();
        request.open('GET', files, true);
        request.responseType = 'blob';
        request.withCredentials = false;
        request.onload = function () {
            var reader = new FileReader();
            reader.readAsArrayBuffer(request.response);
            reader.onload = function (e) {
                var arrayBuffer = e.target.result;
                callback(arrayBuffer);
            };
        };
        request.send();
    }


    parseWord = (file) => {
        this.readFileInputEventAsArrayBuffer(file, function (arrayBuffer) {
            mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(function (result) {
                    document.getElementById('word').innerHTML = (result.value);
                })
                .done();
        });
    }
    
    getFireStorage = () => {
        var {tentailieu} = this.props;
     
        // if(tentailieu !== '' && tentailieu !== undefined){
            getDownloadURL(str.ref(storage, 'NoiDungKhoaHoc/test.docx'))
                .then((url)=>{
                    this.parseWord(url);         
                })
                .catch((error)=>{
                    console.log(error);
                });
        // }
    }

    componentDidMount(){
        this.getFireStorage();
    }

    render() {
        var {toogletailieu, tentailieu} = this.props;
        console.log(tentailieu);
        return (
            <Row>
                <Col span={toogletailieu === true ? 24 : "0"}>
                    {tentailieu === undefined ? <div>Bài học này không có tài liệu</div> : <div id="word"></div>}  
                </Col>
                <Col span={toogletailieu === false ? 24 : "0"}>
                    <div></div>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        toogletailieu: state.toogletailieu
    }
}

export default connect(mapStateToProps,null)(TaiLieu);