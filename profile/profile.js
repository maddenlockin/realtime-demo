import {
    createMessage,
    decrementStars,
    getProfile,
    getProfileById,
    getUser,
    incrementStars,
    onMessage,
} from '../fetch-utils.js';
import { renderMessagesEl } from '../render-utils.js';

const form = document.querySelector('form');
const usernameEl = document.querySelector('.username');
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

    onMessage(id, async (payload) => {
        console.log('payload', payload);
        fetchAndDisplayProfile();
    });
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const user = await getUser();
    const senderProfile = await getProfile(user.id);
    if (!senderProfile) {
        //  No profile associated with this id, alert & redirect
        alert('You must make your profile before you can message anyone');
        location.assign('/');
    } else {
        await createMessage({
            text: data.get('message'),
            from_user: senderProfile.data.username,
            recipient_id: id,
            user_id: user.id,
        });

        form.reset();
    }

    // await fetchAndDisplayProfile();
});

async function fetchAndDisplayProfile() {
    profileDetailEl.textContent = '';

    const profile = await getProfileById(id);
    // const data = profile.data;
    console.log('profile', profile);
    imgEl.src = profile.avatar_url;
    usernameHeaderEl.textContent = profile.username;
    usernameEl.textContent = profile.username;

    const profileStars = renderStars(profile);
    const messagesEl = renderMessagesEl(profile);

    profileDetailEl.append(messagesEl, profileStars);
}

function renderStars({ stars, username, id }) {
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
        await decrementStars(id);

        await fetchAndDisplayProfile();
    });

    upButton.addEventListener('click', async () => {
        await incrementStars(id);

        await fetchAndDisplayProfile();
    });

    return profileStars;
}
