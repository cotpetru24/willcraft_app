import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

export const OrderProgressBar = ({ currentValue, maxValue }) => (
  <>
    <progress id="progress-bar" className="full-width-progress" value={currentValue} max={maxValue}>{currentValue}%</progress>
  </>
);






const ProgressBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  return (
    <section className='progress-bar'>
      <div className='progress-bar-container'>
        <ul>
          <li>
            <Link >Testator</Link>
          </li>
          <li>
            <Link >Executor</Link>
          </li>
          <li>
            <Link >Assets</Link>
          </li>
          <li>
            <Link >Beneficiaries</Link>
          </li>
          <li>
            <Link >Asset Distribution</Link>
          </li>
          <li>
            <Link >Review</Link>
          </li>
          <li>
            <Link >Complete</Link>
          </li>
        </ul>
        <OrderProgressBar currentValue={0.08} maxValue={1} />
      </div>
    </section>
  );
}

export default ProgressBar;
