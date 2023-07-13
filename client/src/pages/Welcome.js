import { WelcomeStyle } from '../style/style';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const handleClick = () => {
      navigate("login");
  }
  return WelcomeStyle(handleClick)
}

export default Welcome