const form = document.getElementById('form');
const item = document.getElementById('item');
const list = document.getElementById('list');
const span = document.querySelector('.alert span');
const footer = document.querySelector('footer');
const mensagemVazia = document.getElementById('mensagem-vazia');

const onlyLettersRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

// Limita caracteres a apenas letras
item.addEventListener("input", () => {
  const invalidChars = /[^a-zA-ZÀ-ÿ\s]/g;
  item.value = item.value.replace(invalidChars, '');
});

form.onsubmit = (event) => {
  event.preventDefault();
  const valor = item.value.trim();

  if (onlyLettersRegex.test(valor)) {
    criarItemNaLista(valor);
    item.value = '';
    addFooter('Item adicionado com sucesso!', '#28a745');
  } else {
    addFooter('Por favor, insira apenas letras.', '#C93847');
  }
};

function criarItemNaLista(texto) {
  const li = document.createElement('li');
  li.className = 'lista';

  li.innerHTML = `
    <label class="checkbox-container">
      <input type="checkbox">
      <span class="checkmark"></span>
      <span class="item-text">${texto}</span>
    </label>
    <a href="#" onclick="excluindoItem(this)">
      <img src="./assets/lixeira.svg" alt="icon">
    </a>
  `;

  list.appendChild(li);

  list.style.display = 'flex';
  mensagemVazia.style.display = 'none';
}

function excluindoItem(el) {
  const li = el.closest('li');
  if (li) li.remove();

  if (list.children.length === 0) {
    list.style.display = 'none';
    mensagemVazia.style.display = 'block';
  }

  addFooter('O item foi removido da lista', '#C93847');
}

function addFooter(mensagem, cor) {
  footer.classList.add("show-result");
  footer.style.backgroundColor = cor;
  span.textContent = mensagem;
}

function closet() {
  footer.classList.remove("show-result");
}
