// Can you explain what is being imported here?
import { getPosts, getUsers, usePostCollection } from "./data/DataManager.js"
import { PostList } from "./PostsList.js"
import { NavBar } from "./NavBar.js"
import { Footer } from "./nav/Footer.js";

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
const showFooter = () => {
    footerElement.innerHTML = Footer();
}
const showNavBar = () => {
    navElement.innerHTML = NavBar();
}
const startGiffyGram = () => {
    showNavBar();
    showPostList();
    showFooter();
}
// EVEN Listeners
applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        console.log("You clicked on logout")
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "directMessageIcon") {
        console.log("Sending message to The President")
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("edit")) {
        console.log("Post clicked", event.target.id.split("--"));
        console.log("The id is", event.target.id.split("--")[1]);
    }

})

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value);
        console.log("year as a number",yearAsNumber)
        showFilteredPosts(yearAsNumber);
    }
})

const showFilteredPosts = (year) => {
    const epoch = Date.parse(`01/01/${year}`);
    console.log("epock", epoch)
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost;
        }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
}
startGiffyGram();