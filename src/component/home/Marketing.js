import { Button } from "react-bootstrap";
import { Component } from "react";
import './../../stylecss/Style.css';

class Marketing extends Component{
    render(){
        return(
            <div className="marketing container">
                <h2>Keep calm and study</h2>
                <h3>Bạn nhận ra nhiều khuyết điểm của bản thân? Và bạn đang tìm cách sửa và hoàn
                    thiện bản thân? 
                </h3>
                <div>
                    <Button className="timhieungay">Tìm hiểu ngay!</Button>
                    <Button className="muakhoahoc">Mua khóa học</Button>
                </div>

            </div>
        );
    }    
}

export default Marketing;