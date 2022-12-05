import { getBookClubs } from '../fetch-utils.js';

window.addEventListener('load', async () => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    //Error Handling!!
    if (!id) {
        //  No id found, redirect back to room list
        location.assign('/');
        // don't run the rest of the code in the function
        return;
    }

    const club = await getBookClubs(id);
    // error = response.error;
    // room = response.data;

    // if (error) {
    //     displayError();
    // }

    // if (!room) {
    //     //  No room associated with this id, redirect
    //     location.assign('/');
    // } else {
    //     displayRoom();
    //     displayMessages();
    // }

    onMessage(room.id, async (payload) => {
        const messageId = payload.new.id;
        const messageResponse = await getMessage(messageId);
        error = messageResponse.error;
        if (error) {
            displayError();
        } else {
            const message = messageResponse.data;
            room.messages.unshift(message);
            displayMessages();
        }
    });
});
