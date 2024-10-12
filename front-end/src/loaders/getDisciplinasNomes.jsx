export default async function getDisciplinas() {
    try {
        const res = await fetch("https://unishare-7vk2.onrender.com/cadeiras/buscar");
        
        if (!res.ok) {
            throw new Error('Erro no servidor');
        }

        const data = await res.json();
        return data.Cadeiras;
    } catch (err) {
        alert('Ocorreu um erro. Você será redirecionado para a página inicial.');
        window.location.href = '/'; // Redireciona para a página inicial
    }
}
