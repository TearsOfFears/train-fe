// pages/Login.tsx
import { FC } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {login, login as loginThunk} from '../store/slices/authSlices';
import { useAppDispatch } from '../store/hooks';
import {useLoginMutation} from "../store/services/auth.api";
import {errorResponseParse} from "../utils/parseError";

 const authValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loginApi] = useLoginMutation()

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: authValidationSchema,
        onSubmit: async (values) => {
            try {
                const res = await loginApi(values).unwrap()
                if (res.token) {
                    dispatch(login(res));
                    toast.success('You have successfully logged in');
                    navigate('/');
                }
            } catch (err: any) {
                const errorParsed = errorResponseParse(err)
                toast.error(errorParsed.message || 'Error during login');
            }
        },
    });
    const handleNavigateRegister = ()=>navigate('/register')
    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="p-4 shadow-lg mt-5">
                <h1 className="text-center text-3xl font-weight-bold">Sign In</h1>
                <form onSubmit={formik.handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">Login</button>
                    </div>
                </form>

                <div className="mt-3 d-flex justify-content-center">
                    <p className="btn btn-link text-dark font-weight-bold" onClick={()=>handleNavigateRegister()}>
                        Don’t have an account?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
