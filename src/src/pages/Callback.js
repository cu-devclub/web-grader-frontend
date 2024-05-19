import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import React,{useEffect, useState} from 'react';
import Cookies from 'js-cookie';


function Callback() {
    const [isRun, _] = useState(0);


    async function run(){
        try {
            //request login to backend
            const response = await fetch(`http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}/glob/auth/callback`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    url: window.location.href,
                    state: Cookies.get("state")
                })
            })

            var data = await response.json();
            //if user valid set cookie and sent to Home
            if(data['success']){
                Cookies.remove('state')
                Cookies.set("email", data["data"]["email"])
                Cookies.set("uid", data["data"]["uid"])
                Cookies.set('csrf_token', data["data"]["csrf_token"])

                // Cookies.set("role", data["data"]["role"])
                Cookies.set("role", 2)

                withReactContent(Swal).fire({
                    title: "Login successfully!",
                    icon: "success"
                }).then(ok => {
                    if(ok)
                        window.location.href = "/"
                })
            }else{
                withReactContent(Swal).fire({
                    title: "Login unsuccessful!",
                    text: data["msg"],
                    icon: "error"
                }).then(ok => {
                    if(ok)
                        window.location.href = "/login"
                });
            }
        }catch(error){
            withReactContent(Swal).fire({
                title: "Login unsuccessful!",
                text: "Please contact admin",
                icon: "error"
            }).then(ok => {
                if(ok)
                    window.location.href = "/login"
            });
        }
    }

    useEffect(() => {
        run()
    }, [isRun])

    
    return (
        <div className="pos-center">
            <div className="loader"></div>
        </div> 
    )
}

export default Callback;