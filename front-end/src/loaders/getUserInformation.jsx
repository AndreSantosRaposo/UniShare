export default async function getUserInformation(){
    const token = localStorage.getItem('token');
    const res= await fetch("https://unishare-7vk2.onrender.com/users/getInfo",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await res.json();
    return data
}
