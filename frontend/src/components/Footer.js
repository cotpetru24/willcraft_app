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
                    <img src='/logo.webp' alt='WillCraft Logo' />
                </Link>
            </div>
            <div className='footer-container'>

            </div>
        </footer >
    )
}

export default Footer;