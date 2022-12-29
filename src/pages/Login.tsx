import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Login = () => {
  const [user, loading, error] = useAuthState(auth);

  const provider = new GithubAuthProvider();

  function login() {
    signInWithPopup(auth, provider).catch((error) => {
      console.log(error);
    });
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
      </div>
    );
  }
  return <button onClick={login}>Sign in with Github</button>;
};

export default Login;
