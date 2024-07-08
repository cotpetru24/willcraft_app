import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';


const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)

    const logoutfn = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <header className='header'>
            <div>
                <Link to='/'>
                <img src='/logo.webp' alt='WillCraft Logo' />
                </Link>
            </div>
            <div className='navigation-container'>
                {user ? (
                    <div>
                        <h2>Welcome {user ? user.name : ''}</h2>
                    </div>
                ) : null}
                <div>
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
                                        Login/Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul >
                </div>
            </div>
        </header >
    )
}

export default Header;