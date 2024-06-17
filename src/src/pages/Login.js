import React,{useEffect} from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Cookies from 'js-cookie';


const loginRedir  = async () => {
  	var data = await fetch(`http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}/glob/auth/login`);

  	data = await data.json();
	
  	Cookies.set("state", data["data"]["state"])
  	window.location.href = data["data"]["url"]
}

function Login() {

  // pre write for cunet

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // async function loginRedir(){
  //   //validate input
  //   if(username.length != 10){
  //     withReactContent(Swal).fire({
  //       title: "Username must be 10 characters!",
  //       icon: "error"
  //     })
  //     return
  //   }

  //   if(isNaN(username)){
  //     withReactContent(Swal).fire({
  //       title: "Username must contain only numbers!",
  //       icon: "error"
  //     })
  //     return
  //   }
    
  //   if(password.length <= 0){
  //     withReactContent(Swal).fire({
  //       title: "Password is require!",
  //       icon: "error"
  //     })
  //     return
  //   }
    
  //   //request login to backend
  //   const response = await fetch(`http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}/glob/auth/login`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       "Access-Control-Allow-Origin": "*"
  //     },
  //     body: JSON.stringify({
  //       "username": username,
  //       "password": password
  //     })
  //   })

  //   var data = await response.json();
  //   //if user valid set cookie and sent to Home
  //   if(data['success']){
  //     Cookies.set("UID", data["data"]["uid"])
  //     Cookies.set("type", data["data"]["type"])
  //     withReactContent(Swal).fire({
  //       title: "Login successfully!",
  //       icon: "success"
  //     }).then((result) => {
  //       window.location.href = "/"
  //     })
  //   }else{
  //     withReactContent(Swal).fire({
  //       title: "Username or Password is invalid!",
  //       icon: "error"
  //     });
  //   }
  // }

  useEffect(() => {
    document.body.style.backgroundColor = "#F2F2F2"
  })

  return (
    <div className="container align-items-center align-content-center" style={{background: "#FFF", borderWidth: "2px", borderStyle: "solid", borderRadius: "2px", width: "70vw", height: "50vh", marginTop: "25vh", marginRight: "15vw"}}>
      	<div className="row" style={{height: "100%"}}>
        	<div className="col-lg-6 text-center align-self-center">
          		<img style={{marginTop: "20px"}} src="icon.jpg" width="150" alt='logo'/>
          		<h2>Grader</h2>
        	</div>

        	<div className="col align-self-center">
          		<h1>Login</h1>
          		<button onClick={() => loginRedir()} className="btn btn-outline-dark" type="button" style={{marginTop: "20px", marginLeft: "20px"}}>
            		<img src="/gg-con.svg" width="20" alt='...'/>&nbsp; with Google
          		</button>
				{/* <div class="input-group mb-3" style={{paddingRight: "10vw"}}>
					<input value={username} onChange={e => setUsername(e.target.value)} type="text" class="form-control" placeholder="Username" aria-label="Username" required/>
				</div>
				<div class="input-group mb-3" style={{paddingRight: "10vw"}}>
					<input value={password} onChange={e => setPassword(e.target.value)}  type="password" class="form-control" placeholder="Password" aria-label="Password" required/>
				</div>
				<button type="button" onClick={() => loginRedir()} class="btn btn-primary">Login</button> */}
        	</div>
      	</div>
    </div>
	// <div>
	//     <h1>Login</h1>
	//     <button onClick={() => window.location.href = 'http://www.google.com'} classNameName="btn btn-primary">Test</button>
	// </div>
  );
}


export default Login;
