export default async function getDisciplinas(){
    const res = await fetch("http://localhost:3000/api/v1/cadeiras/buscar");
    const data = await res.json();
    return data.Cadeiras;
}