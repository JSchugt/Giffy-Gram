import { Post,showUserPost } from "./Posts.js";

export const PostList = (allPosts) => {
    let postHTML = '<button id="userFilter">Show My Posts</button>';
    //Loop over the array of posts and for each one, invoke the Post component which returns HTML representation
    for (const postObject of allPosts) {
        //what is a postObject?
        postHTML += Post(postObject)
    }
    return postHTML;

}

export const FilteredPostList = (allPosts) => {
    let postHTML = '<button id="userFilter">Show My Posts</button>';
    //Loop over the array of posts and for each one, invoke the Post component which returns HTML representation
    for (const postObject of allPosts) {
        //what is a postObject?
        postHTML += showUserPost(postObject)
    }
    return postHTML;

}