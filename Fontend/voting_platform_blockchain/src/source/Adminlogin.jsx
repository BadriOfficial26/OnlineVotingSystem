import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavbar from './Navbar';

function Adminlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      navigate('/voterdetails'); // Adjust the path as necessary
    } else {
      setError('Invalid username or password');
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  const backgroundStyle = {
    backgroundImage: 'url("https://erepublic.brightspotcdn.com/dims4/default/52a9e62/2147483647/strip/false/crop/1020x574+0+27/resize/1200x675!/quality/90/?url=http%3A%2F%2Ferepublic-brightspot.s3.us-west-2.amazonaws.com%2Fc0%2F81%2F5212633b7dfe4e4d7d6a657031fe%2Fshutterstock-1648710190.jpg")',
    backgroundSize: 'cover',
    height: '91vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: '0 20px'
  };

  const formContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  };

  const formStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'center',
  };

  return (
    <div>
      <MyNavbar />
      <div style={backgroundStyle}>
        <div style={formContainerStyle}>
          <div style={formStyle}>
            <h2><strong>ADMIN LONG</strong></h2>
            <br/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label><strong>USERNAME</strong></label>
                <br/>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <br/>
              <div className="form-group">
                <label><strong>PASSWORD</strong></label>
                <br/>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <br/>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" className="btn btn-primary">
                  <strong>LOGIN</strong>
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleClear}>
                  <strong>CLEAR</strong>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
