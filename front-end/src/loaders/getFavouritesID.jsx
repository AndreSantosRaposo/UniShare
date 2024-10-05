export default async function getFavourite(){
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("No token found. Please log in.");
        return;
    }
    const res = await fetch("https://unishare-7vk2.onrender.com/users/getFavourite",{
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await res.json();
    return data.favourites;
}