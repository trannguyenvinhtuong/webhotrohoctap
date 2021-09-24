import Home from './component/home/Index';
import Notfault from './component/Notfault';
import Dangnhap from './component/dangnhap/Dangnhap';
import Danhmuc from './component/danhmuc/Danhmuc';
import Kichhoat from './component/kichhoat/Kichhoat';
import Quantritk from './component/taikhoan/Quantritk';
import Thongtin from './component/thongtin/Index';
import Alldislay from './component/alldisplay/Alldisplay';
import Detailkhoahoc from './component/detailkhoahoc/Detailkhoahoc';
import Dangkytk from './component/dangky/Dangkytk';
import Tailieu from './component/tailieu/Tailieu';

const routes = [
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
        path:'/quantritk',
        exact: false,
        main: () => <Quantritk />
    },
    {
        path:'/thongtin',
        exact: false,
        main: () => <Thongtin />
    },
    {
        path: '/alldisplay',
        exact: false,
        main: () => <Alldislay />
    },
    {
        path: '/detailkhoahoc',
        exact: false,
        main: () => <Detailkhoahoc />
    },
    {
        path: '/tailieu',
        exact: false,
        main: () => <Tailieu />
    },
    {
        path: '/dangkytk',
        exact: false,
        main: () => <Dangkytk />
    },
    {
        path: '',
        exact: false,
        main: () => <Notfault />
    }
    
];

export default routes;