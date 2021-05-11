import { renderElement } from "../../assets/js/scripts.js";
import { githubData } from "./config.js";
import { query } from "./query.js";
import { projects } from "../utils/data.js";
import { techStack } from "../utils/tech-stack.js";

const headers = {
  "Content-Type": "application/json",
  Authorization: `bearer ${atob(githubData.token)}`,
};
const baseUrl = "https://api.github.com/graphql";

const queryRepo = query;
let cardDetails = "";
let projectDetails = "";
let stackDetails = "";

// Noteworthy projects
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
          <h3 class="heading-sm link">${name}</h3>
          <p class="text">${description}</p>
          <div class="project-card-meta">
            <div class="languages">
            <span class="text-sm">${languages}</span>
            </div>
            <div class="links">
            <a href="${homepageUrl}" target=_blank" rel="noopener" aria-label="share icon">
            ${
              !homepageUrl == ""
                ? `<svg baseProfile="tiny" width="24px" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M21.821,12.43c-0.083-0.119-2.062-2.944-4.793-4.875C15.612,6.552,13.826,6,12,6c-1.825,0-3.611,0.552-5.03,1.555  c-2.731,1.931-4.708,4.756-4.791,4.875c-0.238,0.343-0.238,0.798,0,1.141c0.083,0.119,2.06,2.944,4.791,4.875  C8.389,19.448,10.175,20,12,20c1.826,0,3.612-0.552,5.028-1.555c2.731-1.931,4.71-4.756,4.793-4.875  C22.06,13.228,22.06,12.772,21.821,12.43z M12,16.5c-1.934,0-3.5-1.57-3.5-3.5c0-1.934,1.566-3.5,3.5-3.5c1.93,0,3.5,1.566,3.5,3.5  C15.5,14.93,13.93,16.5,12,16.5z"/><g><path d="M14,13c0,1.102-0.898,2-2,2c-1.105,0-2-0.898-2-2c0-1.105,0.895-2,2-2C13.102,11,14,11.895,14,13z"/></g></svg>`
                : ""
            }
            </a>
            <a href="${url}" target=_blank" rel="noopener" aria-label="github icon">
            <svg enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 32 32" width="20px" height="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M16.003,0C7.17,0,0.008,7.162,0.008,15.997  c0,7.067,4.582,13.063,10.94,15.179c0.8,0.146,1.052-0.328,1.052-0.752c0-0.38,0.008-1.442,0-2.777  c-4.449,0.967-5.371-2.107-5.371-2.107c-0.727-1.848-1.775-2.34-1.775-2.34c-1.452-0.992,0.109-0.973,0.109-0.973  c1.605,0.113,2.451,1.649,2.451,1.649c1.427,2.443,3.743,1.737,4.654,1.329c0.146-1.034,0.56-1.739,1.017-2.139  c-3.552-0.404-7.286-1.776-7.286-7.906c0-1.747,0.623-3.174,1.646-4.292C7.28,10.464,6.73,8.837,7.602,6.634  c0,0,1.343-0.43,4.398,1.641c1.276-0.355,2.645-0.532,4.005-0.538c1.359,0.006,2.727,0.183,4.005,0.538  c3.055-2.07,4.396-1.641,4.396-1.641c0.872,2.203,0.323,3.83,0.159,4.234c1.023,1.118,1.644,2.545,1.644,4.292  c0,6.146-3.74,7.498-7.304,7.893C19.479,23.548,20,24.508,20,26c0,2,0,3.902,0,4.428c0,0.428,0.258,0.901,1.07,0.746  C27.422,29.055,32,23.062,32,15.997C32,7.162,24.838,0,16.003,0z" fill-rule="evenodd"/><g/><g/><g/><g/><g/><g/></svg>
            </a>
            </div>
          </div>
        </div>
  `;
    });
    renderElement("card", cardDetails);
  })
  .catch((err) => console.log(JSON.stringify(err)));

// Projects
projects.map((project) => {
  projectDetails += `
    <div class="mb-32">
      <h3 class="heading-sm">${project.title}</h3>
      <p class="text mb-4">${project.description}</p>
      <a href="${project.url}" target="_blank" rel="noopener">View project &nbsp;&nbsp;<svg viewBox="0 0 24 24" width="24px" height="16px" fill="#6096ba" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"/></g></svg></a>
    </div>
      `;
});
renderElement("projects", projectDetails);

// Tech stack
techStack.map((stack) => {
  stackDetails += `
    <div style="text-align: center; margin: 0 16px 16px 0">
      <object class="tech-stack-svg" data="${stack.icon}" type="image/svg+xml" alt="icon"></object>
      <p class="text-sm mt-8">${stack.stack}</p>
    </div>
  `;
});
renderElement("tech-stack", stackDetails);
