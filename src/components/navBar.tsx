import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SiRailway } from 'react-icons/si';
import {useAuth, useUser} from '../hooks/useAuth';
import { IoLogOut } from "react-icons/io5";
import { useAppDispatch } from '../store/hooks';
import { toast } from 'react-toastify';
import {logout} from "../store/slices/authSlices";

const Navbar: React.FC = () => {
    const isAuth = useAuth();
    const user = useUser();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout())
        toast.success('You successfully logged out');
        navigate('/login');
    }

    return (
        <nav className='navbar navbar-expand-sm navbar-light bg-warning'>
            <Link className='navbar-brand ms-1' to='/'>
                <span className='ml-2 ms-1 text-white text-lg font-semibold'>UKRZALIZNUTCIA</span>
            </Link>
            <div className='collapse navbar-collapse justify-content-end pe-4'>
                <ul className='navbar-nav'>
                    {!isAuth && (
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/login'>Login</NavLink>
                        </li>
                    )}
                    {isAuth && (
                        <li className='nav-item d-flex align-items-center'>
                            <NavLink className='nav-link' to='/users'>{user.name}</NavLink>
                            <button
                                className='btn nav-link'
                                onClick={logoutHandler}
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
