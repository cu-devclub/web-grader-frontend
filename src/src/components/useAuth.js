import Cookies from 'js-cookie';

async function easy_fetch(host, path, method, body='{}', XCSRF=false){
    const head = {"Content-type": "application/json; charset=UTF-8"}
    if(XCSRF){
        head["X-CSRF-TOKEN"] = Cookies.get("csrf_access_token")
    }

    const fetchdt = {
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

    const response = await fetch(`http://${process.env.REACT_APP_BACKENDHOST}:${process.env.REACT_APP_BACKENDPORT}/glob/auth/checkauth`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-CSRF-TOKEN": Cookies.get("csrf_access_token")
        }
    })
    if (!response.ok) {
        return false
    }
    var dt = await response.json();

    Cookies.set('Name', dt['data']['Name'], { expires: 1 })
    Cookies.set('Email', dt['data']['Email'], { expires: 1 })
    Cookies.set('ID', dt['data']['ID'], { expires: 1 })
    Cookies.set('Role', dt['data']['Role'], { expires: 1 })

    return true;



};