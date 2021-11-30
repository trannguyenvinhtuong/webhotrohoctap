import { Component } from "react";
import Marketing from './Marketing';
import Khoahoc from './Khoahoc.js';
import Chude from './Chude.js';
import Tailieu from './Tailieu';
import Noidung from './Noidung.js';
import Chinhphuc from './Chinhphuc.js';
import Gvtieubieu from './Gvtieubieu';
import Dkgiangvien from './Dkgiangvien.js';
import Backg from './../../imgs/background10.jpg';

class Index extends Component {
    render() {
        return (
            <div>                
                <div style={{ backgroundImage: `url(${Backg})` }} className="home">
                    <br />
                    <br />
                    <br />
                    <br />
                    <Marketing />
                </div>
                <br />
                <br />
                <Khoahoc />
                <br />
                <Chude />
                <br />
                <br />
                <Tailieu />
                {/* <br />
                <br />
                <Noidung /> */}
                <br />
                <br />
                <Chinhphuc />
                <br />
                <br />
                <br />
                <Gvtieubieu />
                <br />
                <br />
                <Dkgiangvien />                
            </div>
        );
    }
}

export default Index;