
const codeChallange = 'QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8';

const redirect_uri_path = 'http://192.168.0.61:5173/authorized'

const authorize = `http://localhost:8081/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=${redirect_uri_path}&code_challenge=${codeChallange}&code_challenge_method=S256`;


export default authorize;