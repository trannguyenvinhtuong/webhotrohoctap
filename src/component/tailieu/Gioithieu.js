import {Component} from 'react';
import './../../SASS/tailieu.sass';

class Gioithieu extends Component{
    render() {
        return (
            <div className="gioithieu">
                <h1>GIỚI THIỆU VÀ THIẾT KẾ VỀ ĐỘNG CƠ KHÔNG ĐỒNG BỘ ROTO DÂY QUẤN</h1>
                <div className="nd-gt">
                    <h2>
                        Thông tin tài liệu
                    </h2>
                    <p>
                    Máy điều chỉnh cảm ứng là một máy biến áp có hai dây quấn được đặt trên hai phần riêng biệt của lõi thép, hai phần này có thể quay hoặc dịch chuyển vị trí tương đối với nhau. Máy điều chỉnh cảm ứng thường được cấu tạo như động cơ không đồng bộ một dây quấn được đặt ở phần Stato, phần Roto được đặt dây quấn thứ hai, chuyển động tương đối của Rôto và Stato thực hiện qua bộ truyền trục vít. Máy điều chỉnh cảm ứng ba pha có dây quấn ba pha tương tự như dây quấn Stato và dây quấn Roto của động cơ điện không đồng bộ ba pha Roto dây quấn
                    </p>                    
                </div>
            </div>
        );
    }
}

export default Gioithieu;