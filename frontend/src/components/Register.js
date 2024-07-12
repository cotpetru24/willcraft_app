import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import {register, reset} from '../features/auth/authSlice';


const Register = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', 
        email: '', password: '', password2: '' });
    const { firstName, lastName, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess || user) navigate('/');
        dispatch(reset());
    },
        [user, isSuccess, isError, message, navigate, dispatch]
    )

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = e => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords don\'t match')
        }
        else {
            const userData = { firstName, lastName, email, password }
            dispatch(register(userData));
        }
    };


    return (
        isLoading ? <Spinner/> : (
            <>
                <section className="auth-form">

                    <section className="heading">
                        <h1>Register</h1>
                    </section>

                    <section className="form">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">

                            <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" id="firstName" name="firstName" value={firstName}
                                    placeholder="Enter your first name" onChange={onChange} />
                            </div>
                            <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>

                                <input type="text" className="form-control" id="lastName" name="lastName" value={lastName}
                                    placeholder="Enter your last name" onChange={onChange} />
                            </div>
                            <div className="form-group">
                            <label htmlFor="email">Email</label>

                                <input type="email" className="form-control" id="email" name="email" value={email}
                                    placeholder="Enter your email" onChange={onChange} />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password">Password</label>

                                <input type="password" className="form-control" id="password" name="password" value={password}
                                    placeholder="Enter the password" onChange={onChange} />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>

                                <input type="password" className="form-control" id="password2" name="password2" value={password2}
                                    placeholder="Confirm the password" onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="login-register-toggle-btn">Register</button>
                            </div>
                            <div className="form-group login-register-toggle-container">
                                <p>Don't have an account?</p>
                                <Link to='/login'>
                                    Login
                                </Link>
                            </div>
                        </form>
                    </section>
                </section>
            </>
        )
    )
}

export default Register;