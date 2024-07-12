import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { login, reset } from '../features/auth/authSlice'


const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess || user) navigate('/');
        dispatch(reset());
    },
        [user, isError, isSuccess, message, navigate, dispatch]
    );

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const onSubmit = e => {
        e.preventDefault()
        const userData = { email, password }
        dispatch(login(userData))
    };

    return (
        isLoading ? <Spinner /> : (
            <>
                <section className="auth-form">
                    <section className="heading">
                        <h1>Login</h1>
                    </section>
                    <section className="form">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>

                                <input type="email" className="form-control" id="email" name="email" value={email}
                                    placeholder="Please enter your email" onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>

                                <input type="password" className="form-control" id="password" name="password" value={password}
                                    placeholder="Please eneter your password" onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn">Login</button>
                            </div>
                            <div className="form-group login-register-toggle-container">
                                <p>Don't have an account?</p>
                                <Link to='/register'>
                                    Register
                                </Link>
                            </div>
                        </form>
                    </section>
                </section>
            </>
        )
    )
}

export default Login