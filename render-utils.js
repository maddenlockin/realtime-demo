export function renderProfile(profileObject) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const a = document.createElement('a');
    //<img id="preview" class="avatar" alt="avatar preview" src="/assets/avatar.jpeg" />

    div.classList.add('profile-list-item');
    img.classList.add('avatar');
    a.classList.add('profile-link');

    img.src = profileObject.avatar_url;
    img.alt = 'avatar';
    p.textContent = `⭐️${profileObject.stars}`;
    a.textContent = `${profileObject.username}`;
    a.href = `../profile/?id=${profileObject.id}`;

    div.append(img, a, p);
    return div;
}

export function renderMessagesEl(profile) {
    const ul = document.createElement('ul');
    const header = document.createElement('h3');

    header.textContent = `Message Feed for ${profile.username}`;

    ul.classList.add('messages');

    ul.append(header);
    //for (let message of profile.messages)
    // substitute "message" for "profile.messages[i]"
    for (let i = 0; i < profile.messages.length; i++) {
        console.log('i', profile.messages[i]);
        const li = document.createElement('p');
        li.classList.add('message');

        const div = document.createElement('div');
        div.classList.add('message-info');

        // const img = document.createElement('img');
        // img.classList.add('avatar');
        // img.src = profile.avatar_url;
        // img.alt = `${profile.messages[i].from_user} avatar`;

        const senderSpan = document.createElement('span');
        senderSpan.classList.add('from');
        senderSpan.textContent = profile.messages[i].from_user;

        const dateSpan = document.createElement('span');
        dateSpan.classList.add('created-date');
        dateSpan.textContent = new Date(profile.messages[i].created_at).toLocaleString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });

        const text = document.createElement('p');
        text.classList.add('text');
        text.textContent = profile.messages[i].text;

        div.append(senderSpan, dateSpan);

        li.append(div, text);

        ul.append(li);
    }

    return ul;
}
