function mostrarAba(aba) {
    document.querySelectorAll('.aba').forEach(div => div.classList.remove('ativa'));
    document.getElementById(aba).classList.add('ativa');
  
    if (aba === 'doadores') carregarDoadores();
    if (aba === 'instituicoes') carregarInstituicoes();
    if (aba === 'doacoes') carregarDoacoes();
    if (aba === 'home') atualizarPainel();
  }
  