import { getUser } from "./auth/Users.js";
import { getLoggedInUser } from "./data/DataManager.js"
export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="user_post">${postObject.user.name} </h2>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <h4>${postObject.userId}</h4>
        <img class="post__image" src="${postObject.imageURL}" />
        <p>${postObject.description}</p>
        <div><button id="edit__${postObject.id}">Edit</button></div>
        <div><button id="delete__${postObject.id}">Delete</button></div>
      </section>
    `
}

export const showUserPost = (postObject) => {
  console.log("User",getUser(postObject.id))
  let loggedInUser = getLoggedInUser();
  console.log("post object",postObject.user.name)
  if (loggedInUser.id === postObject.userId) {
    return `
      <section class="post">
        <header>
            <h2 class="user_post">${postObject.user.name} </h2>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <h4>${postObject.userId}</h4>
        <img class="post__image" src="${postObject.imageURL}" />
        <p>${postObject.description}</p>
        <div><button id="edit__${postObject.id}">Edit</button></div>
        <div><button id="delete__${postObject.id}">Delete</button></div>
      </section>
    `} else {
    return false
  }
}