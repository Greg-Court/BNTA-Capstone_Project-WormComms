
const token = () => {

const codeVerifier = "qPsH306-ZDDaOE8DFzVn05TkN3ZZoVmI_6x4LsVglQI";

const code = sessionStorage.getItem('code');

const redirect_uri_path = "http://192.168.0.61:5173/authorized"

const oAuthTokenPath = "http://localhost:8081/oauth2/token"

return `${oAuthTokenPath}?client_id=client&redirect_uri=${redirect_uri_path}&grant_type=authorization_code&code=${code}&code_verifier=${codeVerifier}`;
}

export {token}