import {Component} from 'react';
import Gioithieu from './Gioithieu';
import Docpdf from './Docpdf';
import Tacgia from './Tacgia';
import Quangcao from './Quangcao';

class Tailieu extends Component{
    render() {
        var {match} = this.props;
        var idtl = match.match.params.idtailieu;
        return (
            <div style={{marginTop:'4.3rem'}} >       
                <Gioithieu idtl = {idtl} />
                <Docpdf idtl = {idtl} />
                <Tacgia idtl = {idtl} />
                {/* <Quangcao /> */}
            </div>
        );
    }
}

export default Tailieu;