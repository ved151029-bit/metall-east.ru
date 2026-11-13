document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('cartRoot');

  function render(){
    const cart = Cart.get();
    const entries = Object.entries(cart);
    if (!entries.length){
      root.innerHTML = `<div class="cart-empty">
        <h2>Корзина пуста</h2>
        <p>Перейдите в каталог, чтобы добавить товары.</p>
        <a href="catalog.html" class="btn btn-blue" style="margin-top:24px">Перейти в каталог →</a>
      </div>`;
      return;
    }
    let rows = '', positions = 0;
    entries.forEach(([id, q]) => {
      const p = PRODUCTS.find(x => x.id == id);
      if (!p) return;
      positions++;
      rows += `<div class="cart-item" data-id="${p.id}">
        <a class="ci-img" href="product.html?id=${p.id}">${p.img ? `<img src="${p.img}" alt="${p.name}">` : 'Фото по запросу'}</a>
        <div>
          <a class="ci-name" href="product.html?id=${p.id}">${p.name}</a>
          <p class="ci-spec">${p.spec}</p>
          <p class="ci-price">Цена по запросу</p>
          <button class="ci-remove" data-remove>Удалить</button>
        </div>
        <div class="ci-controls">
          <div class="qty">
            <button type="button" data-q="-1">−</button>
            <input value="${q}" inputmode="numeric">
            <button type="button" data-q="1">+</button>
          </div>
        </div>
      </div>`;
    });

    root.innerHTML = `<div class="cart-layout">
      <div class="cart-items">${rows}</div>
      <div class="cart-summary">
        <h3>Итого</h3>
        <div class="sum-row"><span>Позиций</span><span>${positions}</span></div>
        <div class="sum-row"><span>Товаров</span><span>${Cart.count()} шт</span></div>
        <div class="sum-row total"><span>Стоимость заказа</span><span>По запросу</span></div>
        <form id="checkoutForm" style="margin-top:18px">
          <div class="field"><input type="text" name="name" placeholder="Ваше имя / компания" required></div>
          <div class="field"><input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required></div>
          <button type="submit" class="btn btn-blue" style="width:100%;justify-content:center">Открыть письмо</button>
          <p class="form-note">Откроется черновик письма. Отправьте его из почтового приложения на ag@metall-east.ru.</p>
        </form>
      </div>
    </div>`;

    root.querySelectorAll('.cart-item').forEach(item => {
      const id = +item.dataset.id;
      const input = item.querySelector('input');
      item.querySelectorAll('[data-q]').forEach(b => b.addEventListener('click', () => {
        const v = Math.max(0, (parseInt(input.value) || 0) + (+b.dataset.q));
        Cart.setQty(id, v); render();
      }));
      input.addEventListener('change', () => {
        Cart.setQty(id, Math.max(0, parseInt(input.value) || 0)); render();
      });
      item.querySelector('[data-remove]').addEventListener('click', () => { Cart.remove(id); render(); });
    });

    root.querySelector('#checkoutForm').addEventListener('submit', event => {
      event.preventDefault();
      const lines = entries.flatMap(([id, quantity]) => {
        const product = PRODUCTS.find(item => item.id === Number(id));
        return product ? [`${product.name} · ${product.spec} · ${quantity} ${product.unit}`] : [];
      });
      openRequestEmail(event.currentTarget, 'Запрос КП по корзине', lines);
    });
  }
  render();
});
