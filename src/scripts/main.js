// Can you explain what is being imported here?
import {
    deletePost, getLoggedInUser, getPosts,
    getSinglePost, getUsers, logoutUser,
    updatePost, usePostCollection, loginUser,
    registerUser, setLoggedInUser, getUserPosts
} from "./data/DataManager.js"
import { PostList, FilteredPostList } from "./PostsList.js"
import { NavBar } from "./NavBar.js"
import { Footer, updatePostCounter } from "./nav/Footer.js";
import { PostEntry } from "./feed/postEntry.js";
import { createPost } from "./data/DataManager.js";
import { PostEdit } from "./feed/postEdit.js"
import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";


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
const showFilteredPostList = () => {
    let userId = getLoggedInUser();
    console.log(getUserPosts(),"user posts")
    getUserPosts().then((allPosts)=> {
        postElement.innerHTML = FilteredPostList(allPosts)
    })
}
const showFooter = () => {
    footerElement.innerHTML = Footer();
}
const showNavBar = () => {
    navElement.innerHTML = NavBar();
}
const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry(postObj);
}

// EVENT Listeners
applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        console.log("You clicked on logout")
        logoutUser();
        console.log("user id in code", getLoggedInUser());
    }
})
applicationElement.addEventListener("click", event => {
    if (event.target.id === "directMessageIcon") {
        console.log("Sending message to The President")
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
/**
 * Main logic module for what should happen on initial page load for Giffygram
 */
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
        console.log("post object", postObject);
        createPost(postObject).then(showPostList());
        document.getElementById("newPostId").reset();

        /// This will reload the whole page, only use if you want to reload the entire. PAGE!!!
        // window.location.reload();
    } else if (event.target.id === "newPost__cancel") {
        entryElement.innerHTML = PostEntry()
    }

})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("delete")) {
        // the [] after split call is to index into the portion of the array that contains the id
        const postId = event.target.id.split("__")[1];
        deletePost(postId).then(response => showPostList());
    } else if (event.target.id.startsWith("edit")) {
        const postId = event.target.id.split("__")[1];
        getSinglePost(postId)
            .then(response => showEdit(response));
    } else if (event.target.id.startsWith("update")) {
        const postId = event.target.id.split("__")[1];
        const title = document.querySelector("input[name='postTitle']").value;
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        const timestamp = document.querySelector("input[name='postTime']").value
        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: getLoggedInUser().id,
            timestamp: parseInt(timestamp),
            id: parseInt(postId)
        }
        updatePost(postObject).then(response => { showPostList() })
    }
})

const showLoginRegister = () => {
    showNavBar();
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = `${LoginForm()}<hr/> </hr> ${RegisterForm()}`;
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = "";
}

const checkForUser = () => {
    if (sessionStorage.getItem("user")) {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
        startGiffyGram();
    } else {
        showLoginRegister();
        console.log("Show Login")
    }
}
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "login__submit") {
        //collect all the details into an object
        const userObject = {
            name: document.querySelector("input[name='name']").value,
            email: document.querySelector("input[name='email']").value
        }
        loginUser(userObject)
            .then(dbUserObj => {
                if (dbUserObj) {
                    sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                    startGiffyGram();
                } else {
                    //got a false value - no user
                    const entryElement = document.querySelector(".entryForm");
                    entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
                }
            })
    }
})
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "register__submit") {
        //collect all the details into an object
        const userObject = {
            name: document.querySelector("input[name='registerName']").value,
            email: document.querySelector("input[name='registerEmail']").value
        }
        registerUser(userObject)
            .then(dbUserObj => {
                sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                startGiffyGram();
            })
    }
})
applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        logoutUser();
        console.log(getLoggedInUser());
        sessionStorage.clear();
        checkForUser();
    }
})

applicationElement.addEventListener("click",event =>{
    if(event.target.id === "userFilter"){
        showFilteredPostList();
    }
})
checkForUser()