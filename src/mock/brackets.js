const check = (string) => {
	const mock = {
		'{': '}',
		'[': ']',
		'(': ')'
	}    

	const stack = [];

	for(let char of string) {
        
		if(mock[char]) {
			stack.push(char);
		} else {
			const char2 = stack.pop();
			if(mock[char2] !== char) {
				return false;
			}
		}
	}


	return stack.length === 0;
}

console.log(check('[{{{}}}]'));