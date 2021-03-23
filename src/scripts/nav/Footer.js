const applicationElement = document.querySelector(".giffygram")

export const updatePostCounter = postNum => {
    document.querySelector("#postCount").innerHTML = postNum.length;

}

export const Footer = () => {

    // HTML to be returned to GiffyGram component
    return `
        <footer class="footer">
            <div class="footer__item">
                Posts since <select id="yearSelection">
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount"></span>
            </div>
        </footer>
    `;
}