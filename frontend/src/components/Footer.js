import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';



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

            <div className='footer-container'>
                <div className='footer-sub-container footer-message-us'>
                    <form type='submit'>
                        <h3>MESSAGE US</h3>
                        <input type="name" id="name" name="name" required placeholder='Your name' />
                        <input type="email" id="email" name="email" required placeholder='Your email' />
                        <textarea type="text" id="text" name="text" required placeholder='Your enquiry' />
                        <button type='submit'>SEND</button>
                    </form>
                </div>


                <div className='footer-sub-container footer-copyright'>
                    <p>&copy;2024 WillCraft</p>
                    <p>STU124543 Computing Project</p>
                </div>
            </div>
            <div className='footer-container'>
                <div className='footer-sub-container footer-contact-us'>
                    <h4>CALL US ON</h4>
                    <h2>+44 024 123 4567</h2>
                    <h4>OR EMAIL</h4>
                    <a href="mailto:someone@example.com" id="sendEmailButton">info@willcraft.co.uk</a>
                    <h4>SOCIAL</h4>
                    <div className="footer-social-media">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={30} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={30} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={30} />
                        </a>
                    </div>
                </div>


                <div className='footer-sub-container footer-address-and-terms'>
                    <p> 123 Hight Street</p>
                    <p>Coventry, CV1 1AB, UK</p>
                    <div className='footer-terms-and-policy'>
                        <Link to='/'>
                            Terms of Service
                        </Link>
                        <Link to='/'>
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
















        </footer >
    )
}

export default Footer;