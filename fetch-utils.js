const SUPABASE_URL = 'https://vmhclpevfecxhpxwubhs.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtaGNscGV2ZmVjeGhweHd1YmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI5Nzk4MzgsImV4cCI6MTk2ODU1NTgzOH0.pWvGlCrbKNRZWBKDRsPR8rGxu8nodj7nq8cY1rPNglI';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
// PROFILES DATA
// export async function getProfiles() {
//     return await client.from('profiles').select();
// }

export async function getProfile(user_id) {
    const response = await client.from('profiles').select().match({ user_id }).maybeSingle();
    return response;
}

export async function upsertProfile(userId, profile) {
    const response = await client.from('profiles').upsert(profile).single();

    return checkError(response);
}
//----------//

// export async function getBookClubs() {
//     const response = await client.from('book_clubs').select('*, members(*)');
//     return checkError(response);
// }

// export async function getClubRoom(id) {
//     return await client
//         .from('book_clubs')
//         .select(
//             `
//             *,
//             messages (
//                 *,
//                 profiles(
//                     id,
//                     username,
//                     avatar_url
//                 )
//             )
//         `
//         )
//         .eq('id', id)
//         .order('created_at', { foreignTable: 'messages', ascending: false })
//         .single();
// }

function checkError(response) {
    return response.error ? console.error(response.error) : response.data;
}

export async function uploadImage(imagePath, imageFile) {
    // we can use the storage bucket to upload the image,
    // then use it to get the public URL
    const bucket = client.storage.from('avatars');

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        // in this case, we will _replace_ any
        // existing file with same name.
        upsert: true,
    });

    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        return null;
    }

    // Construct the URL to this image:
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    // URL Looks like:
    // https://nwxkvnsiwauieanvbiri.supabase.co/storage/v1/object/public/images/rooms/984829079656/Franky.jpeg

    return url;
}

// export function onMessage(roomId, handleMessage) {
//     client
//         // what table and what rows are we interested in?
//         .from(`messages:room_id=eq.${roomId}`)
//         // what type of changes are we interested in?
//         .on('INSERT', handleMessage)
//         .subscribe();
// }
