
export default async function getDisciplinas(){
    const res = await fetch("https://unishare-7vk2.onrender.com/cadeiras/buscar");
    const data = await res.json();
    return data.Cadeiras;
}