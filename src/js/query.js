import { githubData } from "./config.js";

export const query = {
  query: `
       query {
           user(login: "${githubData.username}"){
             avatarUrl
             pinnedItems(first: 3){
               nodes{
                 ... on Repository{
                   name
                   description
                   languages(first: 3){
                     nodes{
                       name
                     }
                   }
                   url
                   homepageUrl
                 }
               }
             }
           }
         }
       `,
};
