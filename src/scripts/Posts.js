export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <h4>${postObject.userId}</h4>
        <img class="post__image" src="${postObject.imageURL}" />
        <p>${postObject.description}</p>
      </section>
    `
}