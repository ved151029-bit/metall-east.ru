// Общая логика: корзина, меню, модалка
const Cart = {
  key: 'mi_cart',
  get(){ try { const cart = JSON.parse(localStorage.getItem(this.key)) || {}; return Object.fromEntries(Object.entries(cart).filter(([id]) => PRODUCTS.some(product => String(product.id) === id))); } catch(e){ return {}; } },
  set(cart){ localStorage.setItem(this.key, JSON.stringify(cart)); updateCartBadge(); },
  add(id, qty = 1){ const c = this.get(); c[id] = (c[id] || 0) + qty; this.set(c); },
  setQty(id, qty){ const c = this.get(); if (qty <= 0) delete c[id]; else c[id] = qty; this.set(c); },
  remove(id){ const c = this.get(); delete c[id]; this.set(c); },
  clear(){ this.set({}); },
  count(){ return Object.values(this.get()).reduce((a, b) => a + b, 0); },
};

function updateCartBadge(){
  document.querySelectorAll('.cart-count').forEach(el => {
    const n = Cart.count();
    el.textContent = n > 0 ? n : '';
  });
}

function showToast(msg){
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2200);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // Модалка заявки
  const modal = document.getElementById('modal');
  if (modal){
    document.addEventListener('click', event => {
      const trigger = event.target.closest('[data-modal]');
      if (!trigger) return;
      if (trigger.dataset.request) modal.querySelector('[name=msg]').value = trigger.dataset.request;
      event.preventDefault();
      modal.classList.add('open');
      modal.querySelector('input').focus();
    });
    modal.querySelectorAll('[data-close]').forEach(button => {
      button.addEventListener('click', () => modal.classList.remove('open'));
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') modal.classList.remove('open');
    });
    modal.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      openRequestEmail(event.currentTarget, 'Запрос счёта и КП');
    });
  }

  document.querySelector('#contactForm')?.addEventListener('submit', event => {
    event.preventDefault();
    openRequestEmail(event.currentTarget, 'Запрос в МЕТАЛЛ-ИСТ');
  });
});

function openRequestEmail(form, subject, items = []) {
  const values = new FormData(form);
  if (values.get('personalDataConsent') !== 'yes') {
    form.reportValidity();
    return;
  }
  const lines = [
    `Имя / компания: ${values.get('name')}`,
    `Телефон: ${values.get('phone')}`,
  ];
  if (values.get('email')) lines.push(`Email: ${values.get('email')}`);
  if (values.get('msg')) lines.push('', values.get('msg'));
  if (items.length) lines.push('', ...items);
  lines.push('', 'Даю ООО «МЕТАЛЛ-ИСТ» согласие на обработку персональных данных для ответа на заявку. Текст согласия: редакция 2026-11-13.');
  location.href = `mailto:ag@metall-east.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
