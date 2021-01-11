import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLogInFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';


const Login = () => {
    const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    password : '',
    photo : ''
  });

  initializeLogInFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history  = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
      })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
      })
  }

  

  //Module 42 started

  const handleSubmit = (event) => {
    // console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    if(!newUser && user.email && user.password){
     signInWithEmailAndPassword(user.email, user.password)
     .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
    }

    event.preventDefault();
  }


  const handleBlur = (event) => {
    let isFormValid = true;
    if(event.target.name === 'email'){
      isFormValid = /\S+@\S+|.S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const hasPasswordNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && hasPasswordNumber;
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  
    return (
        <div style={{textAlign : 'center'}}>
            { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
                <button onClick={googleSignIn}>Sign In</button>
            }
            <br/>
            <button onClick={fbSignIn}>Sign In With Facebook</button>
            {
                user.isSignedIn && <div>
                <p>Welcome, {user.name}</p>
                <p>Email : {user.email}</p>
                <img src={user.photo} alt=""/>
                </div>
            }
            <h1>Our Authwntication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
            <label htmlFor="newUser">A New User?</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input onBlur={handleBlur} type="text" name="name"  placeholder="Enter Name"/>}
                <br/>
                <input onBlur={handleBlur} type="text" name="email"  placeholder="Enter Email" required/>
                <br/>
                <input onBlur={handleBlur} type="password" name="password" placeholder="Enter Password" required/>
                <br/>
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
                </form>
                <p style={{color: 'red'}}>{user.error}</p>
                {
                user.success && <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Logged In'} Succesfully</p>
                }
         </div>
    );
};

export default Login;