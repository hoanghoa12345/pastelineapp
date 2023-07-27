import Cookies from "js-cookie";

function getToken() {
    return Cookies.get("access_token")
}

export {
    getToken
}