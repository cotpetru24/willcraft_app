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
            <Link to='/testator'>Testator</Link>
          </li>
          <li>
            <Link to='/spouse'>Spouse</Link>
          </li>
          <li>
            <Link to='/executor'>Executor</Link>
          </li>
          <li>
            <Link to='/assets'>Assets</Link>
          </li>
          <li>
            <Link to='/beneficiaries'>Beneficiaries</Link>
          </li>
          <li>
            <Link to='/assetDistribution'>Asset Distribution</Link>
          </li>
          <li>
            <Link to='/orderReview'>Review</Link>
          </li>
          <li>
            <Link to='/'>Complete</Link>
          </li>
        </ul>
        <OrderProgressBar currentValue={0.125} maxValue={1} />
      </div>
    </section>
  );
}

export default ProgressBar;
