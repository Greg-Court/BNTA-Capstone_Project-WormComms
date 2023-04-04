import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authorize from "../Links/authorize";
import { token } from "../Links/token";
import { Buffer } from "buffer";
import { BsConeStriped } from "react-icons/bs";
import { useContext } from "react";
import { useOAuthContext } from "../OAuthTokenHeader";

const Redirect = () => {

    const {oAuthToken, setOAuthToken} = useOAuthContext();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.get('code')) {
            //console.log("got code")
            sessionStorage.setItem('code', searchParams.get('code'))

            //we shoudln't be hard coding the client or secret really
            const client = 'client';
            const secret = 'secret';
            const headers = new Headers();
            headers.append('Content-type', 'application/json')
            headers.append('Authorization', `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`)

            const url = token();

            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers
            }).then(async (response) => {
                const token = await response.json();
                //console.log('token === ', token)
                if (token?.id_token) {
                    sessionStorage.setItem("id-token", token.id_token)
                    setOAuthToken(token.id_token)
                    console.log(sessionStorage.getItem("id-token"))
                    navigate('/');
                }
            }).catch((err) => console.log(err))
        } else if (!searchParams?.get('code')) {
            //console.log("let's get a code")
            //calling our authorization link
            window.location.href = authorize;
        }
    })



    return <p>Redirecting ...</p>
}

export default Redirect;