import Home from './../component/home/Index';
import Notfault from './../component/Notfault';
import Dangnhap from './../component/dangnhap/Dangnhap';
import Danhmuc from './../component/danhmuc/Danhmuc';
import Kichhoat from './../component/kichhoat/Kichhoat';
import Quantritk from './../component/taikhoan/Quantritk';
import Thongtin from './../component/thongtin/Index';
import Alldislay from './../component/alldisplay/Alldisplay';
import Detailkhoahoc from './../component/detailkhoahoc/Detailkhoahoc';
import Dangkytk from './../component/dangky/Dangkytk';
import Tailieu from './../component/tailieu/Tailieu';
import Khoahoc from './../component/khoahoc/Khoahoc';
import AlldisplayTaiLieu from './../component/alldisplaytailieu/AlldisplayTaiLieu';
import Detailtailieu from '../component/detailtailieu/Detailtailieu';
import Giohang from './../component/giohang/Giohang';

const routesND = [
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/danhmuc',
        exact: false,
        main: () => <Danhmuc />
    },
    {
        path: '/kichhoat',
        exact: false,
        main: () => <Kichhoat />
    },
    {
        path: '/dangnhap',
        exact: false,
        main: () => <Dangnhap />
    },
    {
        path: '/quantritk',
        exact: false,
        main: () => <Quantritk />
    },
    {
        path: '/thongtin',
        exact: false,
        main: () => <Thongtin />
    },
    {
        path: '/detailtailieu/:idtailieu',
        exact: false,
        main: (match) => <Detailtailieu match={match} />
    },
    {
        path: '/alldisplay/:iddm',
        exact: false,
        main: (match) => <Alldislay match={match} />
    },
    {
        path: '/alldisplaytailieu',
        exact: false,
        main: () => <AlldisplayTaiLieu />
    },
    {
        path: '/detailkhoahoc/:idkhoahoc',
        exact: false,
        main: (match) => <Detailkhoahoc match={match} />
    },
    {
        path: '/tailieu/:idtailieu',
        exact: false,
        main: (match) => <Tailieu match={match} />
    },
    {
        path: '/khoahoc/:idkhoahoc',
        exact: false,
        main: (match) => <Khoahoc match={match} />
    },
    {
        path: '/dangkytk',
        exact: false,
        main: () => <Dangkytk />
    },
    {
        path: '/giohang',
        exact: false,
        main: () => <Giohang />
    },
    {
        path: '',
        exact: false,
        main: () => <Notfault />
    }

];

export default routesND;