function mostrarAba(aba) {
    document.querySelectorAll('.aba').forEach(div => div.classList.remove('ativa'));
    document.getElementById(aba).classList.add('ativa');
  
    if (aba === 'doadores') carregarDoadores();
    if (aba === 'instituicoes') carregarInstituicoes();
    if (aba === 'doacoes') carregarDoacoes();
    if (aba === 'home') atualizarPainel();
  }
  async function cadastrar(form, url) {
    const formData = new FormData(form);
    const resposta = await fetch(url, { method: 'POST', body: formData });
    const texto = await resposta.text();
    alert(texto);
    form.reset();
    atualizarPainel();
  }