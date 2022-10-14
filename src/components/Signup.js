import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: ""}) 
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");
            props.showAlert("Account created successfully","success");
        }
        else{
            props.showAlert("Invalid credentials","danger");
        }

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container">
           <form onSubmit={handleSubmit}>
                    <div className="form-group ">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input name="name" type="text" className="form-control" id="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input name="email" type="email" className="form-control" id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" minLength={5} onChange={onChange} placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary md-3">Submit</button>
                    </form>
        </div>
    )
}

export default Signup
