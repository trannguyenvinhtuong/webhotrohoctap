import Nguoidung from './../pages/Nguoidung';
import Notfault from './../component/Notfault';
import Giangvien from './../pages/Giangvien';

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
        path: '',
        exact: false,
        main: () => <Notfault />
    }
];

export default routesALL;