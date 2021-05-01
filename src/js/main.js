import { renderElement } from "../../assets/js/scripts.js";
import { githubData } from "./config.js";
import { query } from "./query.js";

const headers = {
  "Content-Type": "application/json",
  Authorization: `bearer ${atob(githubData.token)}`,
};
const baseUrl = "https://api.github.com/graphql";

const queryRepo = query;
let cardDetails = "";

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(queryRepo),
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network unavailable");
    }
    return res.json();
  })
  .then((data) => {
    let avatar = data.data.user.avatarUrl;
    document.getElementById("ava").setAttribute("src", avatar);

    data = data.data.user.pinnedItems.nodes;

    data.map((repo) => {
      const { name, description, url, homepageUrl } = repo;
      const languages = repo.languages.nodes
        .map((language) => language.name)
        .join("&nbsp;&nbsp;&nbsp;");

      cardDetails += `
        <div class="project-card">
          <h3 class="heading-sm">${name}</h3>
          <p class="text">${description}</p>
          <div class="project-card-meta">
            <div class="languages">
            <span class="text-sm">${languages}</span>
            </div>
            <div class="links">
            <a href="${homepageUrl}" target=_blank" rel="noopener" aria-label="share icon">
            <svg fill="#6096ba" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="20px" height="20px"><path d="M 41.470703 4.9863281 A 1.50015 1.50015 0 0 0 41.308594 5 L 27.5 5 A 1.50015 1.50015 0 1 0 27.5 8 L 37.878906 8 L 22.439453 23.439453 A 1.50015 1.50015 0 1 0 24.560547 25.560547 L 40 10.121094 L 40 20.5 A 1.50015 1.50015 0 1 0 43 20.5 L 43 6.6894531 A 1.50015 1.50015 0 0 0 41.470703 4.9863281 z M 12.5 8 C 8.3754991 8 5 11.375499 5 15.5 L 5 35.5 C 5 39.624501 8.3754991 43 12.5 43 L 32.5 43 C 36.624501 43 40 39.624501 40 35.5 L 40 25.5 A 1.50015 1.50015 0 1 0 37 25.5 L 37 35.5 C 37 38.003499 35.003499 40 32.5 40 L 12.5 40 C 9.9965009 40 8 38.003499 8 35.5 L 8 15.5 C 8 12.996501 9.9965009 11 12.5 11 L 22.5 11 A 1.50015 1.50015 0 1 0 22.5 8 L 12.5 8 z"/></svg>
            </a>
            <a href="${url}" target=_blank" rel="noopener" aria-label="github icon">
            <svg fill="#6096ba" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="20px" height="20px"><path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 31.66536 35.956939 38.122519 29 40.251953 L 29 35.136719 C 29 33.226635 27.899316 31.588619 26.308594 30.773438 A 10 8 0 0 0 32.4375 18.720703 C 32.881044 17.355414 33.376523 14.960672 32.199219 13.076172 C 29.929345 13.076172 28.464667 14.632086 27.765625 15.599609 A 10 8 0 0 0 24 15 A 10 8 0 0 0 20.230469 15.59375 C 19.529731 14.625773 18.066226 13.076172 15.800781 13.076172 C 14.449711 15.238817 15.28492 17.564557 15.732422 18.513672 A 10 8 0 0 0 21.681641 30.779297 C 20.3755 31.452483 19.397283 32.674042 19.097656 34.15625 L 17.783203 34.15625 C 16.486203 34.15625 15.98225 33.629234 15.28125 32.740234 C 14.58925 31.851234 13.845172 31.253859 12.951172 31.005859 C 12.469172 30.954859 12.144453 31.321484 12.564453 31.646484 C 13.983453 32.612484 14.081391 34.193516 14.650391 35.228516 C 15.168391 36.160516 16.229687 37 17.429688 37 L 19 37 L 19 40.251953 C 12.043061 38.122519 7 31.66536 7 24 C 7 14.593391 14.593385 7 24 7 z"/></svg>
            </a>
            </div>
          </div>
        </div>
  `;
    });
    renderElement("card", cardDetails);
  })
  .catch((err) => console.log(JSON.stringify(err)));
