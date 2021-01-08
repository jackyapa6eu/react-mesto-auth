import { Link } from 'react-router-dom';

const Title = () => (
  <p className="user__question">Уже зарегистрированы? <Link className="user__link" to='/sing-in'>Войти</Link></p>
);

export default Title;