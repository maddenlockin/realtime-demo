/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getBookClubs } from './fetch-utils.js';
import { renderBookClub } from './render-utils.js';

/* Get DOM Elements */
const clubListEl = document.querySelector('.book-clubs-list');

/* State */

/* Events */
// window.addEventListener('load', async () => {
//     await fetchAndDisplayBookClubs();
// });

// /* Display Functions */
// async function fetchAndDisplayBookClubs() {
//     clubListEl.textContent = '';

//     const bookclubs = await getBookClubs();
//     for (let club of bookclubs) {
//         const clubEl = renderBookClub(club);
//         clubListEl.append(clubEl);
//     }
// }
