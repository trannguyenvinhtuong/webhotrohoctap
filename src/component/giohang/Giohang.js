import { Component } from "react";
import './../../SASS/giohang.sass';
import Showgiohang from "./Showgiohang";
import Showgiohangrong from "./Showgiohangrong";

class Giohang extends Component{
    render() {
        var cart = JSON.parse(localStorage.getItem('cart'));
        return (
            <div style={{marginTop:'5.5rem'}}>
                {!cart ? <Showgiohangrong /> : <Showgiohang cart={cart} />}
            </div>
        );
    }
}

export default Giohang;