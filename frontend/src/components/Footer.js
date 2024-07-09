import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';


const Footer = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)

    const logoutfn = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <footer className='footer'>
            <div>
                <Link to='/'>
                    <img src='/logoNewTree.png' alt='WillCraft Logo' />
                </Link>
            </div>
            <div className='footer-container'>
                <p>Contact us:</p>


                <Link to='/'>
                    Contact Form
                </Link>
                <p>024 099555999</p>

                <Link to='/'>
                    demo@demo.com
                </Link>

                <Link to='/'>
                    Terms of Service
                </Link>
                <Link to='/'>
                    Privacy Policy
                </Link>
                <Link to='/'>
                    Help and Support
                </Link>
                <p>&copy;2024 WillCraft. All rights reserved.</p>
            </div>
        </footer >
    )
}

export default Footer;