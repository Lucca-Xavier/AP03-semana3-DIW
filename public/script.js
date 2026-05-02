const data = {
    produtos: [
        { id: 1, nome: "iPhone 13", preco: 5000, categoria: "Celulares", imagem: "https://picsum.photos/200/100", descricao: "Apple smartphone", emEstoque: true },
        { id: 2, nome: "Galaxy S21", preco: 4000, categoria: "Celulares", imagem: "https://picsum.photos/200/100", descricao: "Samsung smartphone", emEstoque: true },
        { id: 3, nome: "Notebook Dell", preco: 3500, categoria: "Notebooks", imagem: "https://picsum.photos/200/100", descricao: "Notebook potente", emEstoque: false },
        { id: 4, nome: "Mouse Gamer", preco: 150, categoria: "Acessórios", imagem: "https://picsum.photos/200/100", descricao: "Mouse RGB", emEstoque: true },
        { id: 5, nome: "Teclado Mecânico", preco: 300, categoria: "Acessórios", imagem: "https://picsum.photos/200/100", descricao: "Teclado gamer", emEstoque: true },
        { id: 6, nome: "PlayStation 5", preco: 4500, categoria: "Games", imagem: "https://picsum.photos/200/100", descricao: "Console Sony", emEstoque: false },
        { id: 7, nome: "Xbox Series X", preco: 4200, categoria: "Games", imagem: "https://picsum.photos/200/100", descricao: "Console Microsoft", emEstoque: true },
        { id: 8, nome: "MacBook Air", preco: 7000, categoria: "Notebooks", imagem: "https://picsum.photos/200/100", descricao: "Notebook Apple", emEstoque: true }
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
    return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.setAttribute("data-id", produto.id);
    card.classList.add("card");
    card.style.background = "#f9f9f9";

    const title = document.createElement("h3");
    title.textContent = produto.nome;

    const img = document.createElement("img");
    img.src = produto.imagem;
    img.style.width = "100%";

    const price = document.createElement("p");
    price.textContent = formatPrice(produto.preco);

    const category = document.createElement("p");
    category.textContent = produto.categoria;

    const btnDetails = document.createElement("button");
    btnDetails.textContent = "Ver detalhes";
    btnDetails.addEventListener("click", () => showProductDetails(produto));

    const btnHighlight = document.createElement("button");
    btnHighlight.textContent = "Destacar";
    btnHighlight.addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(btnDetails);
    card.appendChild(btnHighlight);

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";
    produtos.forEach(p => {
        const card = createProductCard(p);
        productList.appendChild(card);
    });

    const cards = document.querySelectorAll(".card");
    cards.forEach(c => {
        console.log(c.getAttribute("data-id"));
    });
}

function renderCategories() {
    const categorias = [...new Set(data.produtos.map(p => p.categoria))];
    categorySelect.innerHTML = '<option value="">Todas</option>';
    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}
function showProductDetails(produto) {
    productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <p>${produto.emEstoque ? "Em estoque" : "Sem estoque"}</p>
    <p>${produto.descricao}</p>`
        ;
}

function filterProducts() {
    const text = searchInput.value.toLowerCase();
    const category = categorySelect.value;

    return data.produtos.filter(p => {
        const matchText = p.nome.toLowerCase().includes(text);
        const matchCategory = category === "" || p.categoria === category;
        return matchText && matchCategory;
    });
}

searchInput.addEventListener("input", () => {
    renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
    renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);