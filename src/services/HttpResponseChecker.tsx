/**
 *	A downright hideous function, this checks the HTTP response from the API.
 *  This ensures that no null values, undefined values, or undefined/empty data is being returned.
 *  Prevents a fatal crash of the application when data does not return expectedly.
 *  Error handling must still be dealt with separately  
 **/
export function validateHTMLResponse(res: any) {
	// check that the response is not undefined (token expiration, server error, etc)
	if(res !== undefined && res !== null) {
		// check that the status returned is not undefined
		if(res.status !== undefined && res !== null) {
			// check that the response is in valid range
			if(res.status >= 200 && res.status < 300) {
				// check that the data is not undefined
				if(res.data !== undefined && res !== null) {
					// check that the data is not empty
					if(res.data !== "") {
						return true;
					} else if(res.status === 204) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}