import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

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
                    <button onClick={() => navigate("/callback")} className="btn btn-outline-dark" type="button" style={{marginTop: "20px", marginLeft: "20px"}}>
                        <img src="/gg-con.svg" width="20" alt='gg'/>&nbsp; with Google
                    </button>
                </div>
            </div>
        </div>
    );
}


export default Login;
