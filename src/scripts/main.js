// Can you explain what is being imported here?
import { getPosts, getUsers } from "./data/DataManager.js"
import {PostList} from "./PostsList.js"
import {NavBar} from "./NavBar.js"
import {Footer} from "./nav/Footer.js";

/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

//Get a reference to the location on the DOM where the app will display
let footerElement = document.querySelector("footer")
let navElement = document.querySelector("nav");
let entryElement = document.querySelector(".entryForm")
const applicationElement = document.querySelector(".giffygram");
/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/
// const startGiffyGram = () => {
// 	postElement.innerHTML = "Hello Cohort 47"
// }

// startGiffyGram();
const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts);
    })
}
const showFooter = () =>{
    footerElement.innerHTML = Footer();
}
const showNavBar = () => {
    navElement.innerHTML = NavBar();
}
const startGiffyGram = () => {
    console.log("1")
    showNavBar();
    showPostList();
    showFooter();
}

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})
startGiffyGram();