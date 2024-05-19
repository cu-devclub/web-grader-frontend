import Cookies from 'js-cookie';

export const useAuth = () => {
    const UID = Cookies.get("uid")
    return UID ? true : false
};