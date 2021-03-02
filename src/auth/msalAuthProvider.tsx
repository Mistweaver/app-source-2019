import { Component } from "react";
import { msalApp, requiresInteraction, fetchMsGraph, isIE, GRAPH_ENDPOINTS, GRAPH_REQUESTS } from "./authUtils";
import { SET_NEW_MSAL_TOKEN, SET_NEW_ACCESS_TOKEN } from "../redux/types/ApplicationTypes";
import store from "../redux/Store";

export default function msalAuth(AuthComponent: any) {
	// If you support IE, our recommendation is that you sign-in using Redirect APIs
	const useRedirectFlow = isIE();
	// const useRedirectFlow = true;

	interface msalAuthProviderState {
		account: any;
		error: any;
		emailMessages: any;
		graphProfile: any;
		loggedIn: boolean;
		accessToken: string;
		msalToken: string;
	}

	return class msalAuthProvider extends Component<{}, msalAuthProviderState> {
		constructor(props: {}) {
			super(props);

			this.state = {
				account: null,
				error: null,
				emailMessages: null,
				graphProfile: null,
				loggedIn: false,
				accessToken: "",
				msalToken: ""
			};
		}

		async acquireToken(request: any, redirect?: any) {
			return msalApp.acquireTokenSilent(request).then(res => {
				this.setState({ loggedIn: true, accessToken: res.accessToken, msalToken: res.idToken.rawIdToken });
				store.dispatch({ type: SET_NEW_ACCESS_TOKEN, payload: res.accessToken});

			//@ts-ignore
			}).catch(error => {
				// Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure
				// due to consent or interaction required ONLY
				this.setState({ loggedIn: false });
				if (requiresInteraction(error.errorCode)) {
					return redirect
						? msalApp.acquireTokenRedirect(request)
						: msalApp.acquireTokenPopup(request);
				}
			});
		}

		async onSignIn(redirect: any) {
			this.setState({ loggedIn: false });
			if (redirect) {
				return msalApp.loginRedirect(GRAPH_REQUESTS.LOGIN);
			}

			const loginResponse = await msalApp
				.loginPopup(GRAPH_REQUESTS.LOGIN)
				.catch(error => {
					this.setState({
						error: error.message
					});
				});

			if (loginResponse) {
				this.setState({
					account: loginResponse.account,
					error: null,
					loggedIn: true
				});

				store.dispatch({ type: SET_NEW_MSAL_TOKEN, payload: loginResponse.idToken.rawIdToken});

				const tokenResponse = await this.acquireToken(
					GRAPH_REQUESTS.LOGIN
				).catch(error => {
					this.setState({
						error: error.message
					});
				});

				if(tokenResponse !== null) {
					const graphProfile = await fetchMsGraph(
						GRAPH_ENDPOINTS.ME,
						//@ts-ignore
						tokenResponse.accessToken
					).catch(() => {
						this.setState({
							error: "Unable to fetch Graph profile."
						});
					});

					if (graphProfile) {
						this.setState({
							graphProfile
						});
					}
				}
			}
		}

		onSignOut() {
			msalApp.logout();
			this.setState({ loggedIn: false });
		}


		async componentDidMount() {
			msalApp.handleRedirectCallback(error => {
				if (error) {
					const errorMessage = error.errorMessage ? error.errorMessage : "Unable to acquire access token.";
					// setState works as long as navigateToLoginRequestUrl: false
					this.setState({
						error: errorMessage
					});
				}
			});

			const account = msalApp.getAccount();

			this.setState({
				account
			});

			if (account) {
				const tokenResponse = await this.acquireToken(
					GRAPH_REQUESTS.LOGIN,
					useRedirectFlow
				);

				if (tokenResponse !== null) {
					const graphProfile = await fetchMsGraph(
						GRAPH_ENDPOINTS.ME,
						//@ts-ignore
						tokenResponse.accessToken
					).catch(() => {
						this.setState({
							error: "Unable to fetch Graph profile."
						});
					});

					if (graphProfile) {
						this.setState({
							graphProfile
						});
					}

				}
			}
		}

		public render() {
			return (
				<AuthComponent
					{...this.props}
					account={this.state.account}
					emailMessages={this.state.emailMessages}
					error={this.state.error}
					graphProfile={this.state.graphProfile}
					accessToken={this.state.accessToken}
					msalToken={this.state.msalToken}
					loggedIn={this.state.loggedIn}
					onSignIn={() => this.onSignIn(useRedirectFlow)}
					onSignOut={() => this.onSignOut()}
				/>
			);
		}
	};

}

