export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

export const getPosts = () => {
    console.log("getPosts")
    return fetch("http://localhost:8088/Posts")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

const loggedInUser = {
	id: 1,
	name: "Bryan",
	email: "bryan@bn.com"
}

export const getLoggedInUser = () => {
	return loggedInUser;
}