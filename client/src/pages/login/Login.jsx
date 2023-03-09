import { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import "./login.scss"

const Login = () => {
  const [inputs,setInputs] = useState({
    username:"",
    password:"",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setInputs((prev)=>({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) =>{
    e.preventDefault();         //o cai doan nay thi khi dang nhap se bi block boi API vi the de ma xu ly van de nay thi vao index trong api them 1 dong la 
  /*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
}); */
    try{
      await login(inputs);
      navigate("/");
    }catch(err){
      setErr(err.response.data);
    }
  };
  
  return (
    <div className="login">
        <div className="card">
          <div className="left">
          <h1>Lorloe Social</h1>
              <p> Social media app using javascript, reactJs, nodeJs, MySQL 
              </p>
              <span>You don't have an account?</span>  
              <Link to="/register">
              <button>Register</button>
              </Link>
          </div>
          <div className="right">
            <h1>Login</h1>    
            <form>
              <input type="text" placeholder="UserName" name="username" onChange={handleChange} />
              <input type="password" placeholder="Password" name="password" onChange={handleChange} />
              {err && err}
              <button onClick={handleLogin}>Login</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login