import { redirectApexRequest } from '../src/lib/apex-redirect';

export default {
	fetch(request: Request): Response {
		return redirectApexRequest(request);
	}
};
