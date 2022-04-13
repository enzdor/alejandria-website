import {withAuthenticationRequired} from "@auth0/auth0-react";
import React from "react";
import Redirecting from "../Components/Redirecting";

export function ProtectedRoute({ component }){
	const Component = withAuthenticationRequired(component, {
		onRedirecting: () => <Redirecting/>,
	})

	return <Component />
}
