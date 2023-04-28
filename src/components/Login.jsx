import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = ({ onUser }) => {
  const navigate = useNavigate();

  const [ user, setUser ] = useState(null);
  const [ profile, setProfile ] = useState(null);
  const [ users, setUsers ] = useState([]);
  const [ userData, setUserData ] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setUser({ access_token: accessToken });
    }
  }, []);

  const saveAccessToken = (token) => {
    localStorage.setItem('access_token', token);
    setUser({ access_token: token });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      saveAccessToken(codeResponse.access_token);
      navigate(`/home/${userData.id}`);
      onUser(userData);
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user && !isDataFetched) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
          axios.get('http://localhost:3000/people').then((response) => {
            setUsers(response.data);
            const foundUser = response.data.find((u) => u.email === res.data.email);
            if (!foundUser) {
              const newUser = {
                firstname: res.data.given_name,
                lastname: res.data.family_name,
                email: res.data.email,
                role: 'manager',
                start_date: Date.now(),
                password: '111111'
              };
              axios.post('http://localhost:3000/people', newUser).then((response) => {
                setUserData(response.data);
                onUser(response.data); // Pass user data to parent component
              });
            } else {
              setUserData(foundUser);
              onUser(foundUser); // Pass user data to parent component
            }
          });
        })
        .catch((err) => console.log(err))
        .finally(() => setIsDataFetched(true));
    }
  }, [user, onUser, isDataFetched]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.removeItem('access_token');
    navigate('/');
    onUser({});
  };

  const isLoggedIn = () => {
    if (profile && profile.email && users.length > 0) {
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === profile.email.toLowerCase()
      );
      return Boolean(foundUser);
    }
    return false;
  };

  return (
    <div className="login-wrapper">
      {isDataFetched ? (
        <>
          {profile ? (
            <div className='inner-login-wrapper'>
              {isLoggedIn() ? (
                <>
                  <img src={profile.picture} alt="profile picture" />
                  <button className='login-button' onClick={logOut}>Log out</button>
                </>
              ) : (
                <>
                  <p>You are not authorized to access this page.</p>
                  <button className='login-button' onClick={logOut}>Log out</button>
                </>
              )}
            </div>
          ) : (
            <button className='login-button' onClick={() => login()}>Sign in with Google 🚀 </button>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Login;
