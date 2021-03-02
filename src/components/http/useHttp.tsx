import { useEffect, useState } from 'react';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';
import axiosInterceptor from '../../utilities/AxiosInterceptor';

/**
 * Sources : https://dev.to/omarmoataz/react-using-custom-hooks-to-reuse-stateful-logic-11a7
 * https://www.robinwieruch.de/react-hooks-fetch-data
 */


interface Props {
	url: string;
	method: METHOD_TYPES;
	data: any
	isDelayedRequest: boolean;
}

type METHOD_TYPES = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;

export const useHttp = (props: Props) => {
	const { url, method, data, isDelayedRequest } = props;

	const [ isLoading, setLoading ] = useState(true);
	const [ response, setResponse ] = useState({});
	const [ error, setError ] = useState(null);

	useEffect(() => {
		if(data) {
			triggerRequest();
		}
	}, [data]);

	useEffect(() => {
		if (!isDelayedRequest) {
		  triggerRequest();
		}
	  }, []);

	const triggerRequest = () => {
		setLoading(true);
		axiosInterceptor({
			method: method,
			url: url,
			data: data
		}).then(response => {
			setLoading(false);
			if(validateHTMLResponse(response)) {
				setResponse(response);
			} else {
				setError(error);
			}
		})
		.catch((error) => {
			setError(error);
			setLoading(false);
		});

		return { response, error, isLoading };

	}




}