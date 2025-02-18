import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Home.css'
const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      navigate('/quiz'); 
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div className='home-container'>
      <h1>Welcome to the Quiz App</h1>
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
        {error && <p className='error'>{error}</p>}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Home;