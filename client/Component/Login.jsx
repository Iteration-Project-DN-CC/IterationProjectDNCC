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
      <h1 className='font-semibold text-white'>existing user</h1>
      <form className= 'flex flex-col stretch' onSubmit={handleLogin}>
        <div>
          <label htmlFor='username' className='text-white'>
            username:{' '}
          </label>
          <input
            type='text'
            id='username'
            className='block w-full px-4 py-2 text-gray-300 h-10 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-700'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='text-white'>password: </label>
          <input
            type='password'
            id='password'
            className='block w-full px-4 py-2 text-gray-300 h-10 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-700'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button
          id='login button on the login screen'
          className='px-4 py-2 my-2 rounded bg-darkerpeach text-white hover:bg-darkerpeach'
          type='submit'
        >
          login
        </button>
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
