export const getPosts = (paramsString = '') => {
	return fetch(`https://jsonplaceholder.typicode.com/comments${paramsString}`)
		.then((response) => {
			return Promise.all([
				response.json(),
				response.headers.get('x-total-count'),
			])
		})
		.then((response) => response);
}