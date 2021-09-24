import {Component} from 'react';
import Gioithieu from './Gioithieu';
import Docpdf from './Docpdf';
import Tacgia from './Tacgia';
import Quangcao from './Quangcao';

class Tailieu extends Component{
    render() {
        return (
            <div style={{marginTop:'5.5rem'}}>       
                <Gioithieu />
                <Docpdf />
                <Tacgia />
                <Quangcao />
            </div>
        );
    }
}

export default Tailieu;