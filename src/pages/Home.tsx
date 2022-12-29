import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Hello world!</p>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
