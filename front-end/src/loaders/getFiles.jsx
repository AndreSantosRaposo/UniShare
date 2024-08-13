export default async function getFiles(cadeiraId, category,page){
    page = page || 1
    const res = await fetch(`http://localhost:3000/api/v1/files/view?cadeiraId=${cadeiraId}&category=${category}&page=${page}`);
    const data = await res.json();
    console.log(data)
    return data;
}
