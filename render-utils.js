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
    const messagesEl = document.createElement('div');
    const messagesHeader = document.createElement('h3');

    messagesHeader.textContent = `Message Feed for ${profile.email}`;

    messagesEl.classList.add('messages');

    messagesEl.append(messagesHeader);

    for (let message of profile.messages) {
        const messageEl = document.createElement('p');
        const fromContainer = document.createElement('p');
        const fromEl = document.createElement('p');
        const atEl = document.createElement('p');
        const textEl = document.createElement('p');

        fromEl.textContent = `${message.from_email}`;
        atEl.textContent = formatDate(message.created_at);
        textEl.textContent = message.text;

        fromEl.classList.add('from');
        textEl.classList.add('text');
        atEl.classList.add('at');
        messageEl.classList.add('message');

        fromContainer.append(fromEl, atEl);

        messageEl.append(fromContainer, textEl);

        messagesEl.append(messageEl);
    }

    return messagesEl;
}
