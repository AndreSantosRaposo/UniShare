export default function Info() {
  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-4">Informação sobre o UniShare</h1>
      <div className="row">

        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title text-center">Sobre o Sistema</h2>
            </div>
            <div className="card-body">
              <p>O UniShare foi criado para facilitar o percurso dos estudanted de licenciatura informática da Universidade de Coimbra. Com ele, os utilizadores podem fazer o upload, download e visualização de ficheiros de forma rápida e segura. A nossa prioridade é garantir uma experiência fluida e intuitiva para todos os utilizadores.</p>
            </div>
          </div>
        </div>

        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h2 className="card-title text-center">Como Usar</h2>
            </div>
            <div className="card-body">
              <p>Para começar a utilizar o sistema, siga os passos abaixo:</p>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li><strong>Cadastro e Login:</strong> Diversas páginas só são acessíveis para utilizadores cadastrados, por isso começe por criar uma conta e faça login para acessar todas as funcionalidades.</li>
                <li><strong>Upload de Ficheiros:</strong> Acesse a seção de upload para enviar ficheiros (PDF, DOCX, imagens, etc.). Verifique as restrições de tamanho e tipo.</li>
                <li><strong>Download de Ficheiros:</strong> Faça o download de ficheiros diretamente da plataforma quando necessário.</li>
                <li><strong>Organização:</strong> Utilize as opções de categorização para organizar os ficheiros por curso, tipo de conteúdo, entre outros critérios.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-header bg-warning text-white">
              <h2 className="card-title text-center">Erros Comuns</h2>
            </div>
            <div className="card-body">
              <p>Em alguns casos, os utilizadores podem encontrar erros durante o uso do sistema. Aqui estão alguns erros comuns e como resolvê-los:</p>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li><strong>Erro ao fazer upload:</strong> Verifique se o ficheiro respeita os limites de tamanho e tipo. Caso o erro persista, tente utilizar outro formato.</li>
                <li><strong>Problemas de Conectividade:</strong> Verifique a sua conexão à internet e tente recarregar a página.</li>
              </ul>
              <p>Se os problemas persistirem, por favor entre em contato com o suporte.</p>
            </div>
          </div>
        </div>

        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h2 className="card-title text-center">Contacte-nos</h2>
            </div>
            <div className="card-body">
              <p>Para qualquer dúvida ou suporte adicional, contacte-nos através do email:</p>
              <p><strong>Email:</strong> andresantosraposo@gmail.com</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
