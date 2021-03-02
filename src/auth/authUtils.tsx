import { UserAgentApplication } from 'msal';

export const requiresInteraction = (errorMessage: any) => {
	if(!errorMessage || !errorMessage.length) {
		return false;
	}

	return(
		errorMessage.indexOf("consent_required") > -1 ||
		errorMessage.indexOf("interaction_required") > -1 ||
		errorMessage.indexOf("login_required") > -1
	);
};

export const fetchMsGraph = async(url: string, accessToken: string) => {
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return response.json();
}

export const isIE = () => {
	const ua = window.navigator.userAgent;
	const msie = ua.indexOf("MSIE ") > -1;
	const msie11 = ua.indexOf("Trident/") > -1;

	return msie || msie11;
};

export const GRAPH_SCOPES = {
    OPENID: "openid",
    PROFILE: "profile",
    USER_READ: "User.Read",
    MAIL_READ: "Mail.Read"
};

export const GRAPH_ENDPOINTS = {
    ME: "https://graph.microsoft.com/v1.0/me",
    MAIL: "https://graph.microsoft.com/v1.0/me/messages"
};

export const GRAPH_REQUESTS = {
    LOGIN: {
        scopes: [
            GRAPH_SCOPES.OPENID,
            GRAPH_SCOPES.PROFILE,
            GRAPH_SCOPES.USER_READ
        ]
    },
    EMAIL: {
        scopes: [GRAPH_SCOPES.MAIL_READ]
    }
};

export const msalApp = new UserAgentApplication({
    auth: {
        clientId: "your client id",
        authority: "your app authority",
        validateAuthority: true,
        postLogoutRedirectUri: window.location.origin,
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE()
    },
    system: {
        navigateFrameWait: 0
    }
});