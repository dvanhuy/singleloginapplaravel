import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState();
    const [user, setUser] = useState([]);
    useEffect(() => {
        const handleSubmit = async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: 'http://localhost:1234/api/current_user/',
                  },{ withCredentials: true });
                  if (res.status === 200) {
                      setLogin(true);
                      setUser(res?.data)
                  }
            } catch (error) {
                setLogin(false);
            }
        };
        handleSubmit();
    }, []);

    const handleClick = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: 'http://localhost:1234/api/logout/',
              },{ withCredentials: true });
              if (res.status === 200) {
                navigate('/login')
              }
        } catch (res) {
            console.log(res?.response);
        }
    }
    return ( 
        <div className="flex items-center justify-center flex-col gap-4 text-xl">
            <h1 className="font-bold text-5xl">Trang chủ</h1>
            {login ? 
            <div>
                <div>Thông tin người dùng là</div>
                <div>id : {user.id}</div>
                <div>Tên : {user.name}</div>
                <div>Email : {user.name}</div>
            </div> :
             <div>
                Chưa đăng nhập
            </div>}
            <div className="p-5 bg-slate-300 cursor-pointer" onClick={()=>handleClick()}> Đăng xuất</div>
            <a className="underline" href="/login">Đi tới đăng nhập</a>
        </div>
     );
}
 
export default HomePage;