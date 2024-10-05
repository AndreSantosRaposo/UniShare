import getFavourites from "./getFavouritesID";
import getUserInformation from "./getUserInformation";

export default async function getDisciplinasComID(currentPage = 1, limit = 6) {
    //Load das cadeiras favoritas
    const idsFavourites = await getFavourites();
    const res = await fetch(`https://unishare-7vk2.onrender.com/cadeiras/buscarFavourites/${idsFavourites}?page=${currentPage}&limit=${limit}`); 
    const data = await res.json();
    // Verifica se a resposta é válida
    if (!data || !data.cadeiras) {
        throw new Error("Dados inválidos recebidos da API");
    }


    //Load da informação do user
    const dataUser = await getUserInformation();
    return {data,dataUser}; // Isso deve retornar { cadeiras: [], totalPages: number }
    //return data
}
