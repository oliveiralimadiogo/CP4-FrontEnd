// Mock de produtos
const PRODUCTS = [
  {id:1, name:"Camiseta Orgânica Unissex", price:89.90, brand:"EcoWear", cat:"roupas", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop", badges:["Orgânico","Novo"]},
  {id:2, name:"Kit Skincare Natural", price:139.90, brand:"GreenLife", cat:"beleza", img:"https://images.unsplash.com/photo-1614859325002-4d658e3845b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", badges:["Vegano"]},
  {id:3, name:"Garrafa Reutilizável Inox 750ml", price:119.90, brand:"PureHome", cat:"casa", img:"https://images.unsplash.com/photo-1544003484-3cd181d17917?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", badges:["BPA Free"]},
  {id:4, name:"Painel Solar Portátil 20W", price:399.90, brand:"SunTech", cat:"tech", img:"https://images.unsplash.com/photo-1662601653123-23023131511a?q=80&w=1170&auto=format&fit=crop", badges:["Selo A+"]},
  {id:5, name:"Shorts de Linho", price:129.90, brand:"EcoWear", cat:"roupas", img:"https://images.unsplash.com/photo-1719473466836-ff9f5ebe0e1b?q=80&w=687&auto=format&fit=crop", badges:["Orgânico"]},
  {id:6, name:"Sabonete Artesanal Vegano", price:19.90, brand:"GreenLife", cat:"beleza", img:"https://plus.unsplash.com/premium_photo-1677776519079-184fdc8f5c6d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", badges:["Vegano","Natural"]},
  {id:7, name:"Escova de Dente Bambu", price:14.90, brand:"PureHome", cat:"casa", img:"https://images.unsplash.com/photo-1589365252845-092198ba5334?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", badges:["Biodegradável"]},
  {id:8, name:"Lanterna Solar USB", price:159.90, brand:"SunTech", cat:"tech", img:"https://images.unsplash.com/photo-1561917181-7441b9a74ce7?q=80&w=687&auto=format&fit=crop", badges:["Reciclável"]},
  {id:9, name:"Jaqueta Reciclada", price:249.90, brand:"EcoWear", cat:"roupas", img:"https://images.unsplash.com/photo-1638984849715-8984a7f95ee1?q=80&w=1170&auto=format&fit=crop", badges:["Reciclado"]},
  {id:10, name:"Difusor de Ambiente Natural", price:69.90, brand:"PureHome", cat:"casa", img:"https://images.unsplash.com/photo-1623120781531-dd55cfac57b5?q=80&w=764&auto=format&fit=crop", badges:["Natural"]},
  {id:11, name:"Serum Facial Orgânico", price:89.90, brand:"GreenLife", cat:"beleza", img:"https://plus.unsplash.com/premium_photo-1721961589694-6afd6050463e?q=80&w=687&auto=format&fit=crop", badges:["Cruelty-free"]},
  {id:12, name:"Controle de tv solar", price:299.90, brand:"SunTech", cat:"tech", img:"https://www.portalsolar.com.br/_next/image?url=https%3A%2F%2Fportalsolar-images.s3.us-east-2.amazonaws.com%2Finfosolar-production%2Fimages%2F566fe8da-88f9-4fbf-b69b-873b3eb47ef2%2Fmodel-novo_blog-post_infosolar_v2.jpg&w=828&q=100", badges:["Ecoeficiente"]}
];

// Helpers para o carrinho
const CART_KEY = "eco_cart_v1";

function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
}

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatBRL(n) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Funções do carrinho
function addToCart(id) {
  let cart = getCart();
  let item = cart.find(i => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id: id, qty: 1 });
  }
  setCart(cart);
  renderCart();
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  setCart(cart);
  renderCart();
}

function changeQty(id, delta) {
  let cart = getCart();
  let item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  setCart(cart);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItems');
  const count = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  if (!container || !count || !totalEl) return;

  container.innerHTML = '';
  let total = 0;
  let itemsCount = 0;

  cart.forEach(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    const lineTotal = p.price * item.qty;
    total += lineTotal;
    itemsCount += item.qty;

    const div = document.createElement('div');
    div.className = "d-flex align-items-center justify-content-between py-2 border-bottom";
    div.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img src="${p.img}" style="width:56px;height:56px;object-fit:cover;border-radius:.5rem" alt="${p.name}">
        <div>
          <div class="fw-semibold">${p.name}</div>
          <div class="small text-muted">${formatBRL(p.price)}</div>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${p.id}, -1)">-</button>
        <span class="px-2">${item.qty}</span>
        <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${p.id}, 1)">+</button>
        <span class="ms-3 fw-semibold">${formatBRL(lineTotal)}</span>
        <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${p.id})"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = formatBRL(total);
  count.textContent = itemsCount;
}

// Renderização dos cards de produto
function renderCard(product) {
  let badges = "";
  if (product.badges && product.badges.length > 0) {
    badges = product.badges.map(b => `<span class="badge badge-eco me-1">${b}</span>`).join('');
  }
  return `
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="card h-100 shadow-sm">
        <img src="${product.img}" class="card-img-top" alt="${product.name}" style="height:200px;object-fit:cover">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${product.name}</h6>
          <div class="mb-2">${badges}</div>
          <div class="price mb-3">${formatBRL(product.price)}</div>
          <div class="mt-auto d-flex flex-column gap-2">
            <a class="btn btn-outline-success w-100 mb-2" href="produto.html?id=${product.id}">Detalhes</a>
            <button class="btn btn-success w-100" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-cart-plus me-1"></i>Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Renderização do detalhe do produto
function renderProductDetail(p) {
  let badges = "";
  if (p.badges && p.badges.length > 0) {
    badges = p.badges.map(b => `<span class="badge badge-eco me-1">${b}</span>`).join('');
  }
  return `
    <div class="col-12 col-lg-6">
      <div class="ratio ratio-4x3 rounded-4 overflow-hidden shadow-sm">
        <img id="mainImage" src="${p.img}" alt="${p.name}" style="object-fit:cover;">
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <h2 class="h3">${p.name}</h2>
      <div class="mb-2">${badges}</div>
      <p class="text-muted">Produto sustentável selecionado com critérios de impacto ambiental reduzido.</p>
      <div class="h4 text-success mb-3">${formatBRL(p.price)}</div>
      <div class="d-flex gap-2 mb-4">
        <button class="btn btn-success" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-plus me-1"></i>Adicionar ao carrinho</button>
        <a class="btn btn-outline-success" href="categorias.html?cat=${p.cat}"><i class="fa-solid fa-list me-1"></i>Ver mais de ${p.cat}</a>
      </div>
      <ul class="list-unstyled small text-muted">
        <li><i class="fa-solid fa-recycle me-2 text-success"></i>Materiais certificados</li>
        <li><i class="fa-solid fa-truck me-2 text-success"></i>Envio neutro em carbono</li>
        <li><i class="fa-solid fa-shield-heart me-2 text-success"></i>Garantia de 90 dias</li>
      </ul>
    </div>
  `;
}

// Evento principal
document.addEventListener('DOMContentLoaded', function() {
  // Produtos em destaque na index
  const featured = document.getElementById('featuredProducts');
  if (featured) {
    const picks = PRODUCTS.slice(0, 4);
    featured.innerHTML = picks.map(renderCard).join('');
  }

  // Página de categorias
  const grid = document.getElementById('productsGrid');
  if (grid) {
    const urlParams = new URLSearchParams(location.search);
    const initialCat = urlParams.get('cat') || 'all';
    let state = {
      cat: initialCat,
      maxPrice: 500,
      brands: new Set(),
      page: 1,
      perPage: 8
    };

    const applyBtn = document.getElementById('applyFilters');
    const clearBtn = document.getElementById('clearFilters'); // Adicionado
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const resultsCount = document.getElementById('resultsCount');
    const pagination = document.getElementById('pagination');

    priceRange.addEventListener('input', function() {
      priceValue.textContent = `R$ ${priceRange.value}`;
    });

    document.querySelectorAll('.filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.cat = btn.dataset.value;
        document.querySelectorAll('.filter-btn').forEach(function(b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
      if (btn.dataset.value === initialCat) btn.classList.add('active');
      if (initialCat === 'all' && btn.dataset.value === 'all') btn.classList.add('active');
    });

    applyBtn.addEventListener('click', function() {
      state.maxPrice = Number(priceRange.value);
      state.brands = new Set(Array.from(document.querySelectorAll('.brand-check:checked')).map(function(i) {
        return i.value;
      }));
      render();
    });

    clearBtn.addEventListener('click', function() {
      // Resetar categoria
      state.cat = 'all';
      document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.value === 'all') btn.classList.add('active');
      });

      // Resetar preço
      priceRange.value = 500;
      priceValue.textContent = 'R$ 500';
      state.maxPrice = 500;

      // Resetar marcas
      document.querySelectorAll('.brand-check').forEach(function(chk) {
        chk.checked = false;
      });
      state.brands = new Set();

      render();
    });

    function render() {
      let items = PRODUCTS.filter(function(p) {
        let catOk = (state.cat === 'all' || p.cat === state.cat);
        let priceOk = p.price <= state.maxPrice;
        let brandOk = (state.brands.size === 0 || state.brands.has(p.brand));
        return catOk && priceOk && brandOk;
      });

      resultsCount.textContent = `${items.length} resultado(s)`;

      const start = (state.page - 1) * state.perPage;
      const paginated = items.slice(start, start + state.perPage);
      grid.innerHTML = paginated.map(renderCard).join('');

      // Paginação
      const totalPages = Math.ceil(items.length / state.perPage) || 1;
      pagination.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (i === state.page ? ' active' : '');
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener('click', function(e) {
          e.preventDefault();
          state.page = i;
          render();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(li);
      }
    }

    render();
  }

  // Página de detalhe do produto
  const pd = document.getElementById('productDetail');
  if (pd) {
    const url = new URLSearchParams(location.search);
    const id = Number(url.get('id')) || PRODUCTS[0].id;
    const product = PRODUCTS.find(function(p) { return p.id === id; }) || PRODUCTS[0];
    pd.innerHTML = renderProductDetail(product);
  }

  // Validação do formulário de contato
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        alert('Mensagem enviada com sucesso!');
        form.reset();
      }
      form.classList.add('was-validated');
    }, false);
  }

  // Finalizar compra
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      const cart = getCart();
      if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
      }
      alert('Compra finalizada! (simulação)');
      setCart([]);
      renderCart();
    });
  }

  // Renderizar carrinho ao carregar
  renderCart();
});
