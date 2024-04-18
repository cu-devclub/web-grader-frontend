import Cookies from 'js-cookie';

async function easy_fetch(host, path, method, body='{}', XCSRF=false){
    head = {"Content-type": "application/json; charset=UTF-8"}
    if(XCSRF){
        head["X-CSRF-TOKEN"] = getCookie("csrf_access_token")
    }

    fetchdt = {
        method: method,
        credentials: "include",
        
        headers: head
    }
    
    if(method == "POST"){
        fetchdt['body'] = body
    }

    const response = await fetch(host + path, fetchdt)
    if (response.ok) {
        var data = await response.json();
        return [false, data]
    }
    return [true, {}]
    
}

export const useAuth = async () => {

    [err, dt] = await easy_fetch(`${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}`, "glob/auth/checkauth", "GET", XCSRF=true)
    if(err){
        return false
    }
    Cookies.set('Name', dt['data']['Name'], { expires: 1 })
    Cookies.set('Email', dt['data']['Email'], { expires: 1 })
    Cookies.set('ID', dt['data']['ID'], { expires: 1 })
    Cookies.set('Role', dt['data']['Role'], { expires: 1 })

    return true;
};