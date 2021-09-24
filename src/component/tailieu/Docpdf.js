import { Component } from "react";
import fl from './../../imgs/filetest.pdf';

class Docpdf extends Component{
    render() {
        return (
            <div className="docfilepdf">
                <embed src={fl} />
            </div>
        );
    }
}

export default Docpdf;