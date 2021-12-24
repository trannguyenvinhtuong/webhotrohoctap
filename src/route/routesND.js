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
import Giangvien from './../component/giangviencomponent/Giangvien';
import Thongtinthanhtoan from '../component/thanhtoan/Thongtinthanhtoan';
import Thanhtoanbuoc2 from '../component/thanhtoan/Thanhtoanbuoc2';
import Thanhtoanthanhcong from '../component/thanhtoan/Thanhtoanthanhcong';
import Dekiemtra from '../component/dethi/Dekiemtra';
import Kiemtra from '../component/dethi/Kiemtra';
import Hoanthanh from '../component/dethi/Hoanthanh';
import Dangky from './../component/dangnhap/Dangky';
import Dangkygiangvien from './../component/dangky/Dangkygiangvien';
import Xemdapan from '../component/dethi/Xemdapan';
import Searchpage from '../component/master/search/Searchpage';
import Bangxephang from '../component/dethi/Bangxephang';

const routesND = [
    {
        path: '/nguoidung',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/nguoidung/danhmuc',
        exact: false,
        main: () => <Danhmuc />
    },
    {
        path: '/nguoidung/kichhoat',
        exact: false,
        main: () => <Kichhoat />
    },
    {
        path: '/nguoidung/dangnhap',
        exact: false,
        main: () => <Dangnhap />
    },
    {
        path: '/nguoidung/quantritk',
        exact: false,
        main: () => <Quantritk />
    },
    {
        path: '/nguoidung/thongtin',
        exact: false,
        main: () => <Thongtin />
    },
    {
        path: '/nguoidung/detailtailieu/:idtailieu',
        exact: false,
        main: (match) => <Detailtailieu match={match} />
    },
    {
        path: '/nguoidung/alldisplay/:iddm',
        exact: false,
        main: (match) => <Alldislay match={match} />
    },
    {
        path: '/nguoidung/alldisplaytailieu',
        exact: false,
        main: () => <AlldisplayTaiLieu />
    },
    {
        path: '/nguoidung/detailkhoahoc/:idkhoahoc',
        exact: false,
        main: (match) => <Detailkhoahoc match={match} />
    },
    {
        path: '/nguoidung/tailieu/:idtailieu',
        exact: false,
        main: (match) => <Tailieu match={match} />
    },
    {
        path: '/nguoidung/khoahoc/:idkhoahoc',
        exact: false,
        main: (match) => <Khoahoc match={match} />
    },
    {
        path: '/nguoidung/dangkytk',
        exact: false,
        main: () => <Dangkytk />
    },
    {
        path: '/nguoidung/giohang',
        exact: false,
        main: () => <Giohang />
    },
    {
        path: '/nguoidung/giangvien',
        exact: false,
        main: () => <Giangvien />
    },
    {
        path: '/nguoidung/thongtinthanhtoan',
        exact: false,
        main: () => <Thongtinthanhtoan />
    },
    {
        path: '/nguoidung/thanhtoanbuoc2',
        exact: false,
        main: () => <Thanhtoanbuoc2 />
    },
    {
        path: '/nguoidung/thanhtoanthanhcong',
        exact: false,
        main: () => <Thanhtoanthanhcong />
    },
    {
        path: '/nguoidung/alldisplaydethi',
        exact: false,
        main: () => <Dekiemtra />
    },
    {
        path: '/nguoidung/kiemtra/:idkt',
        exact: false,
        main: (match) => <Kiemtra match={match} />
    },
    {
        path: '/nguoidung/xemdapan/:idkt',
        exact: false,
        main: (match) => <Xemdapan match={match} />
    },
    {
        path: '/nguoidung/hoanthanhkiemtra',
        exact: false,
        main: () => <Hoanthanh />
    },
    {
        path: '/nguoidung/dangky',
        exact: false,
        main: () => <Dangky />
    },
    {
        path: '/nguoidung/dangkygiangvien',
        exact: false,
        main: () => <Dangkygiangvien />
    },
    {
        path: '/nguoidung/searchpage/:keyword',
        exact: false,
        main: (match) => <Searchpage match={match} />
    },
    {
        path: '/nguoidung/bangxephang/:iddethi',
        exact: false,
        main: (match) => <Bangxephang match={match} />
    },
    {
        path: '',
        exact: false,
        main: () => <Notfault />
    }

];

export default routesND;