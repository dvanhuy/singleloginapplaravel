import Logo from '../assets/images/logonavyuh.png';
import Banner from '../assets/images/bannerlogin.jpg'
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import TextField from '../components/inputField/TextField';
import * as Yup from 'yup';
import PasswordField from '../components/inputField/PasswordField';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

axios.defaults.withCredentials = true;

const schemaYub = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Hãy nhập email!')
    .email('Email không đúng định dạng!'),
  password: Yup.string().trim().required('Hãy nhập mật khẩu!')
});

const Login = () => {
  const [loginFail, setLoginFail] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async ({email,password}) => {
    try {
      const res = await axios({
        method: 'post',
        // url: 'http://127.0.0.1:1234/api/login/', sai
        url: 'http://localhost:1234/api/login/',
        data: { email,password }
      },{ withCredentials: true });
      if (res.status === 200){
        navigate("/");
      }
    } catch (res) {
      console.log(res?.response);
      setLoginFail(res?.response?.data?.message);
    }
  };

  return (
    <div className='flex relative'>
      <div className='hidden flex-1 lg:flex h-screen sticky top-0 left-0 overflow-hidden'>
        <img src={Banner} className='w-full object-contain' alt='' />
      </div>
      <div className='flex-1 flex flex-col items-center px-10 py-5 min-h-screen relative'>
        <div className='flex mt-10 max-w-[600px] items-center'>
          <Link to='/'>
            <img className='h-14 mx-' src={Logo} alt='' />
          </Link>
        </div>
        <Formik
          validationSchema={schemaYub}
          initialValues={{
            email: '',
            password: ''
          }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            touched
          }) => (
            <Form className='flex w-full flex-col gap-2 mt-6 max-w-[600px]'>
              <TextField
                label='Email'
                name='email'
                required
                error={touched.email ? errors.email : ''}
                value={values.email}
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                }}
                placeHolder='Nhập email'
              />
              <PasswordField
                label='Mật khẩu'
                name='password'
                required
                error={touched.password ? errors.password : ''}
                value={values.password}
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                }}
                placeHolder='Nhập mật khẩu'
              />

              <button
                type='submit'
                disabled={isSubmitting}
                className='whitespace-nowrap mt-[20px] text-[14px] font-semibold py-[20px] bg-black rounded text-white'
              >
                Đăng nhập
              </button>
            </Form>
          )}
        </Formik>
        {loginFail && <div className='mt-5 font-bold'>{loginFail}</div>}
        <Link className='text-[14px] mt-5 underline underline-offset-2 font-medium' to={'/forgot-password'}>
            Quên mật khẩu ?
        </Link>
        <p className='text-[14px] py-5'>Hoặc</p>

        <p className='text-[14px] pt-8'>
          Chưa có tài khoản?{' '}
          <Link className='underline underline-offset-2 font-medium' to='/register'>
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
