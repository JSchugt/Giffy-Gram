
let name = []
export const getUser = (postUserId) => {
    return fetch(`http://localhost:8088/users?id=${postUserId}`)
        .then(response => response.json())
        .then(parsedResponse => {
            name = parsedResponse
            return parsedResponse
        })
}

export const useName = () =>{
    return [...name]
}