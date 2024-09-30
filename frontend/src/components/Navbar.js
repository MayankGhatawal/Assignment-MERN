import { Link, useNavigate } from 'react-router-dom';
import LOGO from '../images/logo192.png'

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className=' w-10'>
          <img src={LOGO} alt='logo'/>
        </div>
        <div className='text-xl'>
          <Link to="/" className=" mr-16">Home</Link>
          {isAuthenticated && <Link to="/employees" className="mr-4">Employee List</Link>}
          {!isAuthenticated && <Link to="/signup" className="mr-16">Signup</Link>}
          {!isAuthenticated && <Link to="/login" className="mr-16">Login</Link>}
        </div>
        {isAuthenticated && (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
