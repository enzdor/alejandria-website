import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import {useNavigate} from "react-router-dom";

export function Auth0ProviderWithHistory({children}){
	const navigate = useNavigate()

	const domain = process.env.REACT_APP_AUTH0_DOMAIN;
	const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

	function onRedirectCallback(appState){
		navigate(appState?.returnTo || window.location.pathname)
	}

	if (!(domain && clientId )) {
		return null
	}

	return	(
		<Auth0Provider 
			domain={domain}
			clientId={clientId}
			redirectUri={window.location.origin}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	)
}
