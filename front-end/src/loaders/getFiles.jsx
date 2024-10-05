export default async function getFiles(cadeiraId, category,page){
    page = page || 1
    const res = await fetch(`https://unishare-7vk2.onrender.com/files/view?cadeiraId=${cadeiraId}&category=${category}&page=${page}`);
    const data = await res.json();
    console.log(data)
    return data;
}
