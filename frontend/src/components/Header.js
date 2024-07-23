import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Testator from './Testator.js'


const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)

    // const logoutfn = () => {
    //     dispatch(logout());
    //     dispatch(reset());
    //     navigate('/');
    // }

    const logoutfn = () => {
        dispatch(logout())
            .unwrap() // Ensure the thunk result is unwrapped for proper chaining
            .then(() => {
                dispatch(reset());
                console.log('Navigating to home...');
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };



    return (
        <header className='header'>
            <div>
                <Link to='/'>
                    <img src='/logo10.png' alt='WillCraft Logo' />
                    {/* <h5>WillWizad</h5> */}
                </Link>
            </div>
            <div className='navigation-container'>
                {user ? (
                    <div>
                        <h2>Welcome back {user ? user.firstName : ''}!</h2>
                    </div>
                ) : null}
                <div>
                    <ul>
                        {user ? (
                            <>
                                <li>
                                    <Link to='/aboutus'>
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/prices'>
                                        Prices
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard'>
                                        My Wills
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/progressBar'>
                                        My Account
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={logoutfn}>
                                        Logout
                                    </Link>
                                </li>
                            </>

                        ) : (
                            <>
                                <li>
                                    <Link to='/aboutus'>
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/aboutus'>
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/prices'>
                                        Prices
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/login'>
                                        <button id='login-btn'>
                                            Login
                                        </button>
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