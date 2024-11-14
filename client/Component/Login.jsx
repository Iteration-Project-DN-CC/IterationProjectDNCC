import React, { useState } from 'react';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //   const [birthday, setBirthday] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    // alert(`${username} ${password}`);

    try {
      const response = await fetch(
        `http://localhost:3000/user?username=${username}&password=${password}`
      );

      const data = await response.json();
      // console.log(data)

      if (response.ok) {
        setUser(data);
      } else {
        console.error('Login failed:', await response.text());
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* <div>
          <label htmlFor='birthday'>Birthday:</label>
          <input
            type='date'
            id='birthday'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div> */}
        {error && <p className='error'>{error}</p>}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;

// const login = async (username, password, birthday) => {
//   try {
//     const response = await fetch('http://localhost:3000/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({ username, password, birthday }),
//     });

//     if (response.ok) {
//       setIsAuthenticated(true);
//       await fetchUser(); // Fetch user data after login
//     } else {
//       console.error('Login failed:', await response.text());
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//   }
// };
