import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";


const Register = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', mobile: '', password: '', password2: '' });
    const { firstName, lastName, email, mobile, password, password2 } = formData;

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

    const onSubmit = e=>{
        e.preventDefault();

        if(password !== password2){
            toast.error('Passwords don\'t match')
        }
        else{
            const userData = {firstName, lastName, email, mobile, password}
            dispatch(register(userData));
        }
    };


    return (
        isLoading ? Spinner : (
            <>
                <section className="heading">
                    <h1>Register</h1>
                </section>

                <section className="form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="firstName" name="firstName" value={firstName}
                            placeholder="Enter your first name" onChange={onChange}/> 
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="lastName" name="lastname" value={lastName}
                            placeholder="Enter your last name" onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" id="email" name="email" value={email}
                            placeholder="Enter your email" onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <input type="tel" className="form-control" id="mobile" name="mobile" value={mobile}
                            placeholder="Enter your mobile number" on onChange={onChange}/>
                        </div>
                        <div className="forn-group">
                            <input type="password" className="form-control" id="password" name="password" value={password}
                            placeholder="Enter the password" onChanhe={onChange}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="password2" name="password2" value={password2}
                            placeholder="Confirm the password" onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" classname="login-register-toggle-btn">Register</button>
                        </div>                       
                    </form>
                </section>
            </>
        )
    )
}

export default Register;