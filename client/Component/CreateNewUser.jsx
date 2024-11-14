import React, { useState } from 'react';

const CreateNewUser = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState(null);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Send POST request to create a new user
      // console.log(username, password, birthday);
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, birthday }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data); // Callback to handle the created user
      } else {
        setError('Failed to create user: ' + data.message);
      }
    } catch (error) {
      console.error('Create user error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div id='create-user-form'>
      <h1 className= 'font-semibold text-white'>create new user </h1>
      <form className= 'flex flex-col stretch' onSubmit={handleCreateUser}>
        <div>
          <label htmlFor='username' className='text-white'>
            username:
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
          <label htmlFor='password' className='text-white'>
            password:
          </label>
          <input
            type='password'
            className='block w-full px-4 py-2 text-gray-300 h-10 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-700'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='birthday' className='text-white'>
            birthday:
          </label>
          <input
            type='date'
            id='birthday'
            className='block w-full px-4 py-4 my-2 text-gray-300 h-10 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-700'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button
          id='create account button'
          className='px-4 py-2 rounded bg-darkerpeach text-white hover:bg-darkerpeach'
          type='submit'
        >
          sign up
        </button>
      </form>
    </div>
  );
};

export default CreateNewUser;
