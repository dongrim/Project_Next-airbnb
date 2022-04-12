import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/store'
import { commonActions } from '../../redux/store/commonSlice'

export default () => {
  const dispatch = useDispatch();
  const validateMode = useSelector(state => state.common.validateMode);

  const setValidateMode = (value: boolean) =>
    dispatch(commonActions.setValidateMode(value));

  return { validateMode, setValidateMode };
}