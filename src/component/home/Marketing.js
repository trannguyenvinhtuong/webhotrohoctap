import { Button } from "react-bootstrap";
import { Component } from "react";
import './../../stylecss/Style.css';
import {Link} from 'react-router-dom';

class Marketing extends Component{
    render(){
        return(
            <div className="marketing container">
                <h2>Keep calm and study</h2>
                <h3>Bạn nhận ra nhiều khuyết điểm của bản thân? Và bạn đang tìm cách sửa và hoàn
                    thiện bản thân? 
                </h3>
                <div>
                    <Link to='/nguoidung/alldisplaytailieu' >
                        <Button className="timhieungay">Tìm hiểu ngay!</Button>
                    </Link>
                    <Link to='/nguoidung/alldisplay/0' >
                        <Button className="muakhoahoc">Mua khóa học</Button>
                    </Link>
                </div>

            </div>
        );
    }    
}

export default Marketing;