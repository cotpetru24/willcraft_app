import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';


const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth)

    const logoutfn = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <header className='header'>
            <div>
                <Link to='/'>Task Creator</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={logoutfn}>
                        Logout
                        </button>
                    </li>

                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                            Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                            Register
                            </Link>
                        </li>
                    </>
                )}
            </ul >
        </header >
    )
}

export default Header;