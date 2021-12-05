import Nguoidung from './../pages/Nguoidung';
import Notfault from './../component/Notfault';
import Giangvien from './../pages/Giangvien';
import Adminhome from './../pages/Adminhome';

const routesALL = [
    {
        path: '/nguoidung',
        exact: false,
        main: () => <Nguoidung />
    },
    {
        path: '/giangvienpage',
        exact: false,
        main: () => <Giangvien />
    }, 
    {
        path: '/admin',
        exact: false,
        main: () => <Adminhome />
    }, 
    {
        path: '',
        exact: false,
        main: () => <Notfault />
    }
];

export default routesALL;