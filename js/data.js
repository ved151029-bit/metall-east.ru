// Каталог товаров: добавляйте/меняйте позиции здесь
const CATEGORIES = [
  {id:'truby',   name:'Трубы нержавеющие'},
  {id:'listy',   name:'Листы нержавеющие'},
  {id:'fitingi', name:'Фитинги и соединения'},
  {id:'krany',   name:'Запорная арматура'},
  {id:'flantsy', name:'Фланцы'},
];

const SECTIONS = {
  truby: {
    foldersOnly: true,
    image: 'img/tube-welded.webp',
    typeImages: {
      welded: 'img/tube-welded.webp',
      seamless: 'img/tube-seamless.webp',
      profile: 'img/tube-profile.webp',
    },
    types: { welded: 'Трубы круглые электросварные', seamless: 'Трубы бесшовные', profile: 'Трубы профильные' },
  },
  listy: {
    image: 'img/stainless-sheets.webp',
    types: {
      'cold-rolled': 'Холоднокатаные матовые листы',
      'hot-rolled': 'Горячекатаные листы',
      textured: 'Рифлёные листы',
      expanded: 'Листы ПВЛ',
    },
  },
  fitingi: {
    foldersOnly: true,
    image: 'img/cat-fittings.png',
    types: {
      elbows: 'Отводы',
      tees: 'Тройники',
      reducers: 'Переходы',
      'milk-union': 'Молочная муфта',
      'eccentric-reducers': 'Переход эксцентрический',
    },
  },
  krany: {
    foldersOnly: true,
    image: 'img/shutoff-valves-collage.webp',
    typeImages: {
      'ball-valves': 'img/p-ballvalve3.png',
      'butterfly-valves': 'img/butterfly-category-blue-handle.webp',
    },
    types: { 'ball-valves': 'Шаровые краны', 'butterfly-valves': 'Дисковые затворы' },
  },
  flantsy: {
    foldersOnly: true,
    image: 'img/cat-flanges.jpg',
    types: {
      'flat-din': 'Фланец плоский DIN',
      'weld-neck-din': 'Фланец воротниковый DIN',
      'flat-iso': 'Фланец плоский ISO',
      'weld-neck-iso': 'Фланец воротниковый ISO',
      'flat-gost': 'Фланец плоский ГОСТ',
      'weld-neck-gost': 'Фланец воротниковый ГОСТ',
      'loose-aluminium': 'Фланец свободный алюминиевый',
      'loose-stainless': 'Фланец свободный нержавеющий',
      'stub-end': 'Бортшайба',
      gasket: 'Уплотнение фланцевого соединения',
    },
  },
};

function catalogUrl(category, type) {
  const query = new URLSearchParams({ cat: category });
  if (type) query.set('type', type);
  return 'catalog.html?' + query;
}

const PRODUCTS = [
  {id:1, type:'seamless', cat:'truby', name:'Труба бесшовная 12Х18Н10Т', spec:'Размер и исполнение уточняются по запросу', unit:'м', img:'img/tube-seamless.webp', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:2, type:'welded', cat:'truby', name:'Труба электросварная AISI 304', spec:'Размер и исполнение уточняются по запросу', unit:'м', img:'img/tube-welded.webp', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:27, type:'welded', cat:'truby', name:'Труба электросварная AISI 316', spec:'Размер и исполнение уточняются по запросу', unit:'м', img:'img/tube-welded.webp', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:3, type:'seamless', cat:'truby', name:'Труба бесшовная 08Х17Н13М2', spec:'Размер и исполнение уточняются по запросу', unit:'м', img:'img/tube-seamless.webp', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:4, type:'profile', cat:'truby', name:'Труба профильная AISI 304', spec:'Размер и исполнение уточняются по запросу', unit:'м', img:'img/tube-profile.webp', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:28, type:'cold-rolled', cat:'listy', name:'Лист AISI 304, AISI 316 холоднокатаный (матовый)', spec:'Размер и исполнение уточняются по запросу', unit:'шт', img:'img/stainless-sheets.webp', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:29, type:'hot-rolled', cat:'listy', name:'Лист AISI 304, AISI 316 горячекатаный', spec:'Размер и исполнение уточняются по запросу', unit:'шт', img:'img/stainless-sheets.webp', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:30, type:'textured', cat:'listy', name:'Лист AISI 304 рифленый', spec:'Размер и исполнение уточняются по запросу', unit:'шт', img:'img/stainless-sheets-textured.webp', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:31, type:'expanded', cat:'listy', name:'Лист AISI 304 ПВЛ', spec:'Размер и исполнение уточняются по запросу', unit:'шт', img:'img/stainless-sheets-expanded.webp', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:8, type:'elbows', cat:'fitingi', name:'Отвод 90° AISI 304', spec:'57×3,0 мм · ГОСТ 17375-2001 · шовный', unit:'шт', img:'img/p-elbows.jpg', photo:true, stock:'на складе', desc:'Отвод крутоизогнутый 90° из нержавеющей стали AISI 304 для сварных трубопроводов. Толщина стенки равна толщине трубы — бесшовная геометрия.'},
  {id:16, type:'elbows', cat:'fitingi', name:'Отвод 90° AISI 316', spec:'57×3,0 мм', unit:'шт', img:'img/p-elbows.jpg', photo:true, stock:'уточняйте наличие', desc:'Отвод 90° из нержавеющей стали AISI 316. Стандарт и исполнение уточняются при запросе.'},
  {id:9, type:'tees', cat:'fitingi', name:'Тройник AISI 304', spec:'76,1×2,0 мм · равнопроходной, приварной', unit:'шт', img:'img/cat-fittings.png', stock:'на складе', desc:'Равнопроходной приварной тройник AISI 304 для разветвления трубопроводов под прямым углом. Под сварку встык или внахлест.'},
  {id:17, type:'tees', cat:'fitingi', name:'Тройник AISI 316', spec:'76,1×2,0 мм · равнопроходной, приварной', unit:'шт', img:'img/cat-fittings.png', stock:'уточняйте наличие', desc:'Равнопроходной приварной тройник из нержавеющей стали AISI 316.'},
  {id:10, type:'reducers', cat:'fitingi', name:'Переход концентрический AISI 304', spec:'89×57 мм · концентрический, приварной', unit:'шт', img:'img/cat-fittings.png', stock:'под заказ', desc:'Концентрический переход для соединения труб разного диаметра. Сохраняет осевую симметрию трубопровода, гидравлически эффективен.'},
  {id:18, type:'reducers', cat:'fitingi', name:'Переход концентрический AISI 316', spec:'89×57 мм · концентрический, приварной', unit:'шт', img:'img/cat-fittings.png', stock:'уточняйте наличие', desc:'Концентрический приварной переход из нержавеющей стали AISI 316.'},
  {id:19, type:'eccentric-reducers', cat:'fitingi', name:'Переход эксцентрический AISI 304', spec:'Размер и стандарт уточняются по запросу', unit:'шт', img:'img/cat-fittings.png', stock:'уточняйте наличие', desc:'Переход эксцентрический из нержавеющей стали AISI 304.'},
  {id:20, type:'eccentric-reducers', cat:'fitingi', name:'Переход эксцентрический AISI 316', spec:'Размер и стандарт уточняются по запросу', unit:'шт', img:'img/cat-fittings.png', stock:'уточняйте наличие', desc:'Переход эксцентрический из нержавеющей стали AISI 316.'},
  {id:21, type:'tees', cat:'fitingi', name:'Тройник переходной AISI 304', spec:'Размер и стандарт уточняются по запросу', unit:'шт', img:'img/cat-fittings.png', stock:'уточняйте наличие', desc:'Тройник переходной из нержавеющей стали AISI 304.'},
  {id:22, type:'tees', cat:'fitingi', name:'Тройник переходной AISI 316', spec:'Размер и стандарт уточняются по запросу', unit:'шт', img:'img/cat-fittings.png', stock:'уточняйте наличие', desc:'Тройник переходной из нержавеющей стали AISI 316.'},
  {id:11, type:'ball-valves', cat:'krany', name:'Кран шаровый 3-х составной', spec:'Размер и исполнение уточняются по запросу', unit:'шт', img:'img/p-ballvalve3.png', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:12, type:'ball-valves', cat:'krany', name:'Кран шаровый 2-х составной', spec:'Размер и исполнение уточняются по запросу', unit:'шт', img:'img/p-ballvalve.png', stock:'уточняйте наличие', desc:'Размер и исполнение уточняются по запросу.'},
  {id:23, type:'butterfly-valves', cat:'krany', name:'Затвор дисковый сварка-сварка', spec:'Размер и исполнение уточняются по запросу', unit:'шт', img:'img/butterfly-weld-weld.png', stock:'уточняйте наличие', desc:'Дисковый затвор. Размер и исполнение уточняются при запросе.'},
  {id:24, type:'butterfly-valves', cat:'krany', name:'Затвор дисковый резьба-сварка', spec:'Размер и исполнение уточняются по запросу', unit:'шт', img:'img/butterfly-thread-weld.png', stock:'уточняйте наличие', desc:'Дисковый затвор. Размер и исполнение уточняются при запросе.'},
  {id:25, type:'butterfly-valves', cat:'krany', name:'Затвор дисковый резьба-резьба', spec:'Размер и исполнение уточняются по запросу', unit:'шт', img:'img/butterfly-thread-thread.png', stock:'уточняйте наличие', desc:'Дисковый затвор. Размер и исполнение уточняются при запросе.'},
  {id:26, type:'butterfly-valves', cat:'krany', name:'Затвор дисковый межфланцевый', spec:'Размер и исполнение уточняются по запросу', unit:'шт', img:'img/butterfly-wafer.png', stock:'уточняйте наличие', desc:'Дисковый затвор. Размер и исполнение уточняются при запросе.'},
  {id:14, type:'flat-gost', cat:'flantsy', name:'Фланец плоский Ду50', spec:'AISI 304 · PN16 · ГОСТ 33259-2015, тип 01', unit:'шт', img:'img/cat-flanges.jpg', photo:true, stock:'на складе', desc:'Плоский приварной фланец AISI 304 по ГОСТ 33259-2015 (тип 01). Качественная обработка уплотнительной поверхности — надёжная герметичность.'},
  {id:15, type:'weld-neck-gost', cat:'flantsy', name:'Фланец воротниковый Ду100', spec:'AISI 304 · PN16 · ГОСТ 33259-2015, тип 11', unit:'шт', img:'img/cat-flanges.jpg', photo:true, stock:'на складе', desc:'Воротниковый фланец AISI 304 для высоких нагрузок и циклических режимов. Концентрация напряжений снижена за счёт плавного перехода в трубу.'},
];
