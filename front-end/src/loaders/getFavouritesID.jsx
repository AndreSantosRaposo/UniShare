export default async function getFavourite(){
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("No token found. Please log in.");
        return;
    }
    const res = await fetch("http://localhost:3000/api/v1/users/getFavourite",{
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await res.json();
    return data.favourites;
}