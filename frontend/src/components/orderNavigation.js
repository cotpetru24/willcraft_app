import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';



const OrderNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  return (
    <section className='progress-bar'>
      <div className='progress-bar-container'>
        <ul>
          <li>
            <Link to='/testator'>Back</Link>
          </li>
          <li>
            <Link to='/executor'>wave and continue later</Link>
          </li>
          <li>
            <Link to='/assets'>Next</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default OrderNavigation;
