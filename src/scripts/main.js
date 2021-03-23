// Can you explain what is being imported here?
import { getPosts, getUsers, usePostCollection } from "./data/DataManager.js"
import { PostList } from "./PostsList.js"
import { NavBar } from "./NavBar.js"
import { Footer, updatePostCounter } from "./nav/Footer.js";
import { PostEntry } from "./feed/postEntry.js";
import {createPost} from "./data/DataManager.js";

/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

//Get a reference to the location on the DOM where the app will display
let footerElement = document.querySelector("footer")
let navElement = document.querySelector("nav");
let entryElement = document.querySelector(".entryForm")
let applicationElement = document.querySelector(".giffygram");
let postElement = document.querySelector(".postList");

// Filters Post based upon Year
//
const showFilteredPosts = (year) => {
    const epoch = Date.parse(`01/01/${year}`);

    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost;
        }
    })
    postElement.innerHTML = PostList(filteredData);
    updatePostCounter(filteredData);
}
// Shows post loaded in data base
const showPostList = () => {
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


// EVENT Listeners
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
        showFilteredPosts(yearAsNumber);
    }
})
const showPostEntry = () => { 
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
  }
// Calls functions to start Giffy Gram
const startGiffyGram = () => {
    showNavBar();
    showPostEntry();
    showPostList();
    showFooter();
}
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
      const title = document.querySelector("input[name='postTitle']").value
      const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      //we have not created a user yet - for now, we will hard code `1`.
      //we can add the current time as well
      const postObject = {
          title: title,
          imageURL: url,
          description: description,
          userId: 1,
          timestamp: Date.now()
      }
  
    // be sure to import from the DataManager
      console.log("post object",postObject);
        createPost(postObject).then(showPostList());
        document.getElementById("newPostId").reset();

        /// This will reload the whole page, only use if you want to reload the entire. PAGE!!!
       // window.location.reload();
    }else if(event.target.id === "newPost__cancel"){    
        // document.getElementById("newPostId").reset();
        //window.location.reload();
    }

  })
startGiffyGram();