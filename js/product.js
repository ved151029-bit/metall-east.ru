document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('productRoot');
  const id = +new URLSearchParams(location.search).get('id');
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) {
    root.innerHTML = '<p>Товар не найден.</p><a class="back-link" href="catalog.html">← Назад в каталог</a>';
    return;
  }
  const cat = CATEGORIES.find(c => c.id === p.cat);

  root.innerHTML = `
    <a class="back-link" href="catalog.html?cat=${p.cat}">← Назад в каталог</a>
    <div class="product-layout">
      ${p.img ? `<div class="product-gallery">
        <img class="${p.photo ? 'photo' : ''}" src="${p.img}" alt="${p.name}">
      </div>` : '<div class="product-gallery">Фото по запросу</div>'}
      <div class="product-info">
        <span class="p-cat">${cat.name}</span>
        <h1>${p.name}</h1>
        <p>${p.desc}</p>
        <table class="spec-table">
          <tr><td>Артикул</td><td>МИ-${String(p.id).padStart(4, '0')}</td></tr>
          <tr><td>Характеристики</td><td>${p.spec}</td></tr>
          <tr><td>Категория</td><td>${cat.name}</td></tr>
          <tr><td>Наличие</td><td>${p.stock}</td></tr>
          <tr><td>Доставка</td><td>по Москве — от 1 дня, по РФ — от 3 дней</td></tr>
        </table>
        <div class="buy-row">
          <span class="product-price">Цена по запросу</span>
          <div class="qty">
            <button type="button" data-q="-1">−</button>
            <input id="qty" value="1" inputmode="numeric">
            <button type="button" data-q="1">+</button>
          </div>
          <button class="btn btn-blue" id="addToCart">В корзину</button>
        </div>
        <p style="margin-top:20px;color:var(--muted);font-size:14px">Нужен другой размер или марка стали? <a href="#" data-modal style="color:var(--accent);font-weight:700">Оставьте заявку</a> — подберём аналог.</p>
      </div>
    </div>`;

  const qty = root.querySelector('#qty');
  root.querySelectorAll('[data-q]').forEach(b => b.addEventListener('click', () => {
    qty.value = Math.max(1, (parseInt(qty.value) || 1) + (+b.dataset.q));
  }));
  root.querySelector('#addToCart').addEventListener('click', () => {
    Cart.add(p.id, Math.max(1, parseInt(qty.value) || 1));
    showToast('Товар добавлен в корзину');
  });
  document.title = p.name + ' — МЕТАЛЛ-ИСТ';
});
