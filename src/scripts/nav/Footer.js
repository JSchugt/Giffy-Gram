const applicationElement = document.querySelector(".giffygram")

// applicationElement.addEventListener("change", event => {
//     if (event.target.id === "yearSelection") {
//         const yearAsNumber = parseInt(event.target.value)

//         console.log(`User wants to see posts since ${yearAsNumber}`)
//     }
// })

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