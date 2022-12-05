import {
    decrementStars,
    getProfile,
    getProfileById,
    getUser,
    incrementStars,
} from '../fetch-utils.js';
import { renderMessagesEl } from '../render-utils.js';

const imgEl = document.querySelector('#avatar-img');
const usernameHeaderEl = document.querySelector('.username-header');
const profileDetailEl = document.querySelector('.profile-detail');

const params = new URLSearchParams(location.search);
const id = params.get('id');

window.addEventListener('load', async () => {
    //Error Handling!!
    if (!id) {
        //  No id found, redirect back to room list
        location.assign('/');
        // don't run the rest of the code in the function
        return;
    }
    fetchAndDisplayProfile();
});

async function fetchAndDisplayProfile() {
    profileDetailEl.textContent = '';

    const profile = await getProfileById(id);
    // const data = profile.data;
    console.log('profile', profile);
    imgEl.src = profile.avatar_url;
    usernameHeaderEl.textContent = profile.username;

    const profileStars = renderStars(profile);

    profileDetailEl.append(profileStars);
}

function renderStars({ stars, username, user_id }) {
    const p = document.createElement('p');
    const downButton = document.createElement('button');
    const upButton = document.createElement('button');

    const profileStars = document.createElement('div');

    profileStars.classList.add('profile-stars');
    profileStars.append(p, upButton, downButton);

    downButton.textContent = 'downvote user ⬇️';
    upButton.textContent = 'upvote user ⬆️';
    p.classList.add('profile-name');
    p.textContent = `${username} has ${stars} ⭐️`;

    downButton.addEventListener('click', async () => {
        await decrementStars(user_id);

        await fetchAndDisplayProfile();
    });

    upButton.addEventListener('click', async () => {
        await incrementStars(user_id);

        await fetchAndDisplayProfile();
    });

    return profileStars;
}
