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
      console.log(username, password, birthday);
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
    <div className='create-user-form'>
      <h2>Create New User</h2>
      <form onSubmit={handleCreateUser}>
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
        <div>
          <label htmlFor='birthday'>Birthday:</label>
          <input
            type='date'
            id='birthday'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button type='submit'>Create account</button>
      </form>
    </div>
  );
};

export default CreateNewUser;
