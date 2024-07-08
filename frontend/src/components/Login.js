import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from './Spinner';


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

    const onChange = e = ()=>{
        setFormData(prevState=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const onSubmit = e =>{
        e.preventDefault()
        const userData = {email, password}
        dispatch(login(userData))
    };

    return(
        isLoading ? <Spinner/> :(
            <>
                <section classname="heading">
                    <h1>Login</h1>
                </section>
                <section classname="form">
                    <form onSubmit={onSubmit}>
                        <div classname="form-group">
                            <input type = "email" classname="form-control" id = "email" name="email" value={email}
                            placeholder = "Please enter your email" onChange={onChange}/> 
                        </div>
                        <div classname="forn-group">
                            <input type = "password" classname="form-control" id = "password" name = "password" value={password}
                            placeholde="Please eneter your password" onChange={onChange}/>
                        </div>
                        <div classname="form-group">
                            <button type="submit" classname="btn">Login</button>
                        </div>
                        <div classname="form-group login-register-toggle-container">
                            <p>Don't have an account?</p>
                            <button type="button" classname="login-register-toggle-btn">Register</button>
                        </div>
                    </form>
                </section>
            </>
        )
    )
}

export default Login