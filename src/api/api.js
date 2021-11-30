export const getPosts = (paramsString = '') => {
	return fetch(`https://jsonplaceholder.typicode.com/users${paramsString}`)
		.then(response => response.json())
}