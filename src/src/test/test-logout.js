import React from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Logout(){
    const [isRun, _] = useState(0);

    async function run(){
        Cookies.remove('email')
        Cookies.remove('uid')
        Cookies.remove('role')
        Cookies.remove('csrf_token')
        window.location.href = "/login"
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

export default Logout;