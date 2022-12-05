export function renderBookClub(clubObject) {
    const clubEl = document.createElement('div');
    const nameEl = document.createElement('h3');
    clubEl.href = `./club/?id=${clubObject.id}`;
    nameEl.textContent = clubObject.name;

    clubEl.append(nameEl);

    return clubEl;
}
