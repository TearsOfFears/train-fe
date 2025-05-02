// pages/Register.tsx
import { FC } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useRegisterMutation } from '../store/services/auth.api';
import {useNavigate} from "react-router-dom";
import {ErrorResponse} from "../interfaces/errorResponse";
import {errorResponseParse} from "../utils/parseError";

const registerValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be more than 6 symbols').required('Password is required'),
    name: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
});

const Register: FC = () => {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            surname: '',
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            try {
                 await register(values).unwrap()
                    toast.success('You registered!');
                    navigate('/login');
            } catch (err) {
                const errorParsed = errorResponseParse(err)
                toast.error(errorParsed.message || 'Error during registration');
            }
        },
    });

    const handleNavigateLogin = ()=>navigate('/login')

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="p-4 shadow-lg mt-5">
                <h1 className="text-center text-3xl font-weight-bold">Sign Up</h1>
                <form onSubmit={formik.handleSubmit} className="mt-4">
                    {['email', 'password', 'name', 'surname'].map((field) => (
                        <div className="mb-3" key={field}>
                            <label htmlFor={field} className="form-label text-capitalize">
                                {field}
                            </label>
                            <input
                                id={field}
                                name={field}
                                type={field === 'password' ? 'password' : 'text'}
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values[field as keyof typeof formik.values]}
                            />
                            {formik.errors[field as keyof typeof formik.errors] && (
                                <div className="text-danger">{formik.errors[field as keyof typeof formik.errors]}</div>
                            )}
                        </div>
                    ))}

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">Register</button>
                    </div>
                </form>

                <div className="mt-3 d-flex justify-content-center">
                    <p className="btn btn-link text-dark font-weight-bold" onClick={()=>handleNavigateLogin()}>
                        Already have an account?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
