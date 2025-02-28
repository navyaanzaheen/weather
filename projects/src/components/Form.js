import React, { useState } from 'react'
import "../App.css";


export default function Form() {


const [name,setName]= useState('');
const [email,setEmail]= useState('');
const [passwordVisible, setPasswordVisible] = useState(false);
const [password, setPassword] = useState('');
const [submitted, setSubmitted] = useState(false); 
const [error, setError] = useState('');



const validateEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}$/i;
  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address.');
    
    
  } else {
    setError('');
  }

 }



const handleNameChange = (e)=>{
    setName(e.target.value);
};

 const handleEmailChange =(e)=>{
  setEmail(e.target.value);
  
  if (submitted) { 
    validateEmail(e.target.value);
  } else {
    setError('');
  }
      
}




 const togglePasswordVisibility = () => {
  setPasswordVisible(!passwordVisible);
};








const submitData =(event)=>{

const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Z]{2,}$/i;

 event.preventDefault();


 let div1 = document.createElement('div');
 setSubmitted(true); 
 validateEmail(email)
 
 
 



if((name==="")||(email==="")||(password==="")||(!emailRegex.test(email))){

  div1.style.display="none"

}



if(name===""){
    alert('Name field is empty')
}


else{
  setName(name);
 }

if(email===""){
  alert("Email field is empty")
}
else{
  setEmail(email);
 
}

if(password===""){
  alert("password field is empty");
}
else{

  setPassword(password);
 
}


div1.style.border = "1px solid black";
div1.style.marginTop ="10px"
div1.style.backgroundColor = "orange";


let paraName = document.createElement('p');
paraName.innerHTML = "Name :"+name;

let paraEmail = document.createElement('p');
paraEmail.innerHTML = "Email :"+email;


let paraPassword = document.createElement('p');
paraPassword.innerHTML = "Password:"+password;


setName('');
setEmail('');
setPassword('');

div1.appendChild(paraName);
div1.appendChild(paraEmail);
div1.appendChild(paraPassword);


document.body.appendChild(div1);


}




return (
    <>
    <h1 className='text-center'>Form</h1>
    <form onSubmit={submitData}>
    <div className="mb-3">
      <label htmlFor="exampleName1" className="form-label">Name</label>
      <input type="text" className="form-control" id="exampleName1" value={name} aria-describedby="nameHelp" onChange={handleNameChange}/>
      
    </div>

    <div className="mb-3">
      <label htmlFor="exampleEmail1" className="form-label">Email</label>
      <input type="email" className={`form-control ${error ? 'error-input' : ''}`}  id="exampleEmail1" value={email} onChange={handleEmailChange}
      />
  {<div className="error-message">{error}</div>}

    </div>
    <div className="mb-3">
    <label htmlFor="examplePassword1" className="form-label">Password</label>
    <input
        type={passwordVisible ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        
      />
      <button
        type="button" 
        className="password-toggle"
        onClick={togglePasswordVisibility}
      >
      {/* <img 
      src="/images/eye1.png"
          
      alt={passwordVisible ? 'Hide password' : 'Show password'}
      className="eye-icon"
        /> */}
      </button>
</div>

<div className="text-center">
<button type="submit" className="btn btn-danger">Submit</button>
</div>
</form>
  </>
  )
}



