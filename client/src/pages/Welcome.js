import { WelcomeStyle } from '../style/style';

function Welcome({setLogin}) {
    const handleClick = (e) => {
        e.preventDefault();
        setLogin(true);
    }
  return WelcomeStyle(handleClick)
}

export default Welcome