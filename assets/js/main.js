// Simple mock products database
const PRODUCTS = [
  {id:1, name:"Camiseta Orgânica Unissex", price:89.90, brand:"EcoWear", cat:"roupas", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop", badges:["Orgânico","Novo"]},
  {id:2, name:"Kit Skincare Natural", price:139.90, brand:"GreenLife", cat:"beleza", img:"https://images.unsplash.com/photo-1614859325002-4d658e3845b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", badges:["Vegano"]},
  {id:3, name:"Garrafa Reutilizável Inox 750ml", price:119.90, brand:"PureHome", cat:"casa", img:"https://images.unsplash.com/photo-1544003484-3cd181d17917?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", badges:["BPA Free"]},
  {id:4, name:"Painel Solar Portátil 20W", price:399.90, brand:"SunTech", cat:"tech", img:"https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop", badges:["Selo A+"]},
  {id:5, name:"Shorts de Linho", price:129.90, brand:"EcoWear", cat:"roupas", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop", badges:["Orgânico"]},
  {id:6, name:"Sabonete Artesanal Vegano", price:19.90, brand:"GreenLife", cat:"beleza", img:"https://plus.unsplash.com/premium_photo-1677776519079-184fdc8f5c6d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", badges:["Vegano","Natural"]},
  {id:7, name:"Escova de Dente Bambu", price:14.90, brand:"PureHome", cat:"casa", img:"https://images.unsplash.com/photo-1589365252845-092198ba5334?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", badges:["Biodegradável"]},
  {id:8, name:"Lanterna Solar USB", price:159.90, brand:"SunTech", cat:"tech", img:"https://images.unsplash.com/photo-1494947665470-20322015e3a8?q=80&w=1200&auto=format&fit=crop", badges:["Reciclável"]},
  {id:9, name:"Jaqueta Reciclada", price:249.90, brand:"EcoWear", cat:"roupas", img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop", badges:["Reciclado"]},
  {id:10,name:"Difusor de Ambiente Natural", price:69.90, brand:"PureHome", cat:"casa", img:"https://images.unsplash.com/photo-1515419682769-91a8a6bdaf5a?q=80&w=1200&auto=format&fit=crop", badges:["Natural"]},
  {id:11,name:"Serum Facial Orgânico", price:89.90, brand:"GreenLife", cat:"beleza", img:"https://images.unsplash.com/photo-1512203492609-8fca5e4b5dcf?q=80&w=1200&auto=format&fit=crop", badges:["Cruelty-free"]},
  {id:12,name:"Carregador Solar de Janela", price:299.90, brand:"SunTech", cat:"tech", img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop", badges:["Ecoeficiente"]}
];

// LocalStorage helpers
const CART_KEY = "eco_cart_v1";
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
const setCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const formatBRL = (n) => n.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});

function addToCart(id){
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if(item) item.qty += 1; else cart.push({id, qty:1});
  setCart(cart);
  renderCart();
}

function removeFromCart(id){
  let cart = getCart().filter(i => i.id !== id);
  setCart(cart);
  renderCart();
}

function changeQty(id, delta){
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) return removeFromCart(id);
  setCart(cart);
  renderCart();
}

function renderCart(){
  const cart = getCart();
  const container = document.getElementById('cartItems');
  const count = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  if(!container || !count || !totalEl) return;
  container.innerHTML = '';
  let total = 0, itemsCount = 0;
  cart.forEach(({id, qty}) => {
    const p = PRODUCTS.find(x => x.id === id);
    const lineTotal = p.price * qty;
    total += lineTotal;
    itemsCount += qty;
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
        <span class="px-2">${qty}</span>
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

document.addEventListener('DOMContentLoaded', () => {
  // Featured products on index
  const featured = document.getElementById('featuredProducts');
  if(featured){
    const picks = PRODUCTS.slice(0,8);
    featured.innerHTML = picks.map(renderCard).join('');
  }

  // Categories page rendering
  const grid = document.getElementById('productsGrid');
  if(grid){
    const urlParams = new URLSearchParams(location.search);
    const initialCat = urlParams.get('cat') || 'all';
    let state = {
      cat: initialCat,
      maxPrice: 500,
      brands: new Set(),
      sort: 'relevance',
      page: 1,
      perPage: 8
    };

    const applyBtn = document.getElementById('applyFilters');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const sortSelect = document.getElementById('sortSelect');
    const resultsCount = document.getElementById('resultsCount');
    const pagination = document.getElementById('pagination');

    priceRange.addEventListener('input', () => priceValue.textContent = `R$ ${priceRange.value}`);

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.cat = btn.dataset.value;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      if(btn.dataset.value === initialCat) btn.classList.add('active');
      if(initialCat === 'all' && btn.dataset.value === 'all') btn.classList.add('active');
    });

    applyBtn.addEventListener('click', () => {
      state.maxPrice = Number(priceRange.value);
      state.brands = new Set(Array.from(document.querySelectorAll('.brand-check:checked')).map(i => i.value));
      render();
    });

    sortSelect.addEventListener('change', () => {
      state.sort = sortSelect.value;
      render();
    });

    function render(){
      let items = PRODUCTS.filter(p => (state.cat==='all' || p.cat===state.cat) && p.price <= state.maxPrice);
      if(state.brands.size) items = items.filter(p => state.brands.has(p.brand));

      switch(state.sort){
        case 'priceAsc': items.sort((a,b)=>a.price-b.price); break;
        case 'priceDesc': items.sort((a,b)=>b.price-a.price); break;
        case 'nameAsc': items.sort((a,b)=>a.name.localeCompare(b.name)); break;
        case 'nameDesc': items.sort((a,b)=>b.name.localeCompare(a.name)); break;
        default: break;
      }

      resultsCount.textContent = `${items.length} resultado(s)`;

      const start = (state.page-1)*state.perPage;
      const paginated = items.slice(start, start+state.perPage);
      grid.innerHTML = paginated.map(renderCard).join('');

      // Pagination
      const totalPages = Math.ceil(items.length / state.perPage) || 1;
      pagination.innerHTML = '';
      for(let i=1;i<=totalPages;i++){
        const li = document.createElement('li');
        li.className = 'page-item' + (i===state.page ? ' active' : '');
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener('click', (e)=>{
          e.preventDefault();
          state.page = i;
          render();
          window.scrollTo({top:0, behavior:'smooth'});
        });
        pagination.appendChild(li);
      }
    }

    render();
  }

  // Product detail page
  const pd = document.getElementById('productDetail');
  if(pd){
    const url = new URLSearchParams(location.search);
    const id = Number(url.get('id')) || PRODUCTS[0].id;
    const product = PRODUCTS.find(p=>p.id===id) || PRODUCTS[0];
    pd.innerHTML = renderProductDetail(product);

    // Related
    const related = document.getElementById('relatedProducts');
    const rel = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0,4);
    related.innerHTML = rel.map(renderCard).join('');
  }

  // Contact form validation
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }else{
        event.preventDefault();
        alert('Mensagem enviada com sucesso!');
        form.reset();
      }
      form.classList.add('was-validated');
    }, false);
  }

  // Checkout
  const checkoutBtn = document.getElementById('checkoutBtn');
  if(checkoutBtn){
    checkoutBtn.addEventListener('click', () => {
      const cart = getCart();
      if(cart.length === 0) return alert('Seu carrinho está vazio.');
      alert('Compra finalizada! (simulação)');
      setCart([]);
      renderCart();
    });
  }

  // Always render cart on load
  renderCart();
});

function renderCard(p){
  const badges = p.badges?.map(b => `<span class="badge badge-eco me-1">${b}</span>`).join('') || '';
  return `
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="card h-100 shadow-sm">
        <img src="${p.img}" class="card-img-top" alt="${p.name}" style="height:200px;object-fit:cover">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${p.name}</h6>
          <div class="mb-2">${badges}</div>
          <div class="price mb-3">${formatBRL(p.price)}</div>
          <div class="mt-auto d-flex gap-2">
            <a class="btn btn-outline-success w-50" href="produto.html?id=${p.id}">Detalhes</a>
            <button class="btn btn-success w-50" onclick="addToCart(${p.id})">
              <i class="fa-solid fa-cart-plus me-1"></i>Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProductDetail(p){
  return `
    <div class="col-12 col-lg-6">
      <div class="ratio ratio-1x1 rounded-4 overflow-hidden shadow-sm">
        <img id="mainImage" src="${p.img}" alt="${p.name}" style="object-fit:cover;">
      </div>
      <div class="d-flex gap-3 mt-3">
        ${[p.img, p.img, p.img].map((src,i)=>`
          <img class="product-thumb rounded" src="${src}" onclick="document.getElementById('mainImage').src='${src}'" style="width:90px;height:90px;object-fit:cover;">
        `).join('')}
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <h2 class="h3">${p.name}</h2>
      <div class="mb-2">${(p.badges||[]).map(b=>`<span class="badge badge-eco me-1">${b}</span>`).join('')}</div>
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
