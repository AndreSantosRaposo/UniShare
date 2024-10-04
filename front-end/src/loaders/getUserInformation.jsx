export default async function getUserInformation(){
    const token = localStorage.getItem('token');
    const res= await fetch("http://localhost:3000/api/v1/users/getInfo",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await res.json();
    return data
}
