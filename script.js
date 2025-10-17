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
// FORMULÁRIOS
document.getElementById('formDoadores').addEventListener('submit', e => {
    e.preventDefault();
    cadastrar(e.target, 'backend/inserirDoador.php');
});

document.getElementById('formInstituicoes').addEventListener('submit', e => {
    e.preventDefault();
    cadastrar(e.target, 'backend/inserirInstituicao.php');
});

document.getElementById('formDoacoes').addEventListener('submit', e => {
    e.preventDefault();
    cadastrar(e.target, 'backend/inserirDoacao.php');
});
// LISTAGENS
async function carregarDoadores() {
    const resp = await fetch('backend/listarDoadores.php');
    const dados = await resp.json();
    const tbody = document.querySelector('#tabelaDoadores tbody');
    tbody.innerHTML = "";
    dados.forEach(d => tbody.innerHTML += <tr><td>${d.nome}</td><td>${d.email}</td><td>${d.telefone}</td></tr>);
}

async function carregarInstituicoes() {
    const resp = await fetch('backend/listarInstituicoes.php');
    const dados = await resp.json();
    const tbody = document.querySelector('#tabelaInstituicoes tbody');
    tbody.innerHTML = "";
    dados.forEach(d => tbody.innerHTML += <tr><td>${d.nome}</td><td>${d.responsavel}</td><td>${d.telefone}</td></tr>);
}

async function carregarDoacoes() {
    const resp = await fetch('backend/listarDoacoes.php');
    const dados = await resp.json();
    const tbody = document.querySelector('#tabelaDoacoes tbody');
    tbody.innerHTML = "";
    dados.forEach(d => tbody.innerHTML += <tr><td>${d.doador}</td><td>${d.instituicao}</td><td>${d.alimento}</td><td>${d.quantidade}</td></tr>);
}

// CONTADOR HOME
async function atualizarPainel() {
    const [d1, d2, d3] = await Promise.all([
        fetch('backend/listarDoadores.php').then(r => r.json()),
        fetch('backend/listarInstituicoes.php').then(r => r.json()),
        fetch('backend/listarDoacoes.php').then(r => r.json())
    ]);

    document.getElementById('qtdDoadores').textContent = d1.length;
    document.getElementById('qtdInstituicoes').textContent = d2.length;
    document.getElementById('qtdDoacoes').textContent = d3.length;
}