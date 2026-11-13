const tubeStandards = [
  { id: 'din', name: 'DIN' },
  { id: 'iso', name: 'ISO 2037:1992 · пищевые трубы', source: 'https://cdn.standards.iteh.ai/samples/6810/6143377103c7447ab2e8f109086be035/ISO-2037-1992.pdf' },
  { id: 'gost-welded', name: 'ГОСТ 11068-81 · электросварные', source: 'https://base.garant.ru/3924220/1cafb24d049dcd1e7707a22d98e9858f/' },
  { id: 'gost-cold', name: 'ГОСТ 9941-2022 · бесшовные холоднодеформированные', source: 'https://meganorm.ru/mega_doc/norm/gost_gosudarstvennyj-standart/0/gost_9941-2022_mezhgosudarstvennyy_standart_truby_besshovnye.html' },
  { id: 'gost-hot', name: 'ГОСТ 9940-81 · бесшовные горячедеформированные', source: 'https://meganorm.ru/Data2/1/4294848/4294848734.htm' },
];

const standardSelect = document.getElementById('tubeStandard');
const diameterSelect = document.getElementById('tubeDiameter');
const wallSelect = document.getElementById('tubeWall');
const quoteButton = document.getElementById('tubeRequest');
const rows = document.getElementById('tubeRows');
const formatTubeSize = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 3 });

const dinDiameterGroups = [[12], [18, 19], [22, 23], [28, 29], [34, 35], [40, 41],
  [52, 53], [70], [85, 84], [104], [129], [154], [204], [254]];

function updateTubeQuote() {
  const needsWall = !wallSelect.disabled;
  quoteButton.disabled = !diameterSelect.value || (needsWall && !wallSelect.value);
  const standard = tubeStandards[standardSelect.selectedIndex];
  const diameter = formatTubeSize.format(Number(diameterSelect.value));
  const wall = formatTubeSize.format(Number(wallSelect.value));
  quoteButton.dataset.request = !quoteButton.disabled
    ? `Нержавеющая труба ${diameter}${needsWall ? `×${wall}` : ''} мм · ${standard.name}\n${needsWall ? '' : 'Толщина стенки:\n'}Марка стали:\nДлина и количество:`
    : '';
}

function updateTubeDiameter() {
  const dimensions = TUBE_SIZES[standardSelect.value];
  const selected = dimensions.find(([diameter]) => String(diameter) === diameterSelect.value);
  const walls = selected?.slice(1) ?? [];
  wallSelect.replaceChildren(new Option(selected && !walls.length ? 'Уточняется по запросу' : 'Выберите толщину', ''), ...walls
    .map(wall => new Option(formatTubeSize.format(wall), wall)));
  wallSelect.disabled = !walls.length;
  const groups = selected ? [[selected[0]]] : standardSelect.value === 'din'
    ? dinDiameterGroups
    : dimensions.map(([diameter]) => [diameter]);
  const byDiameter = new Map(dimensions.map(([diameter, ...sizes]) => [diameter, sizes]));
  rows.innerHTML = groups.map(([diameter, alternate]) => {
    const label = alternate ? `${diameter}(${alternate})` : formatTubeSize.format(diameter);
    const sizes = byDiameter.get(diameter);
    const wallText = sizes.length ? sizes.map(wall => formatTubeSize.format(wall)).join(' · ') : 'По запросу';
    const detail = alternate ? `${diameter}: ${wallText} · ${alternate}: ${byDiameter.get(alternate).map(wall => formatTubeSize.format(wall)).join(' · ') || 'По запросу'}` : wallText;
    return `<tr><th scope="row">${label}</th><td>${detail}</td></tr>`;
  }).join('');
  updateTubeQuote();
}

function updateTubeStandard() {
  const standard = tubeStandards[standardSelect.selectedIndex];
  diameterSelect.replaceChildren(new Option('Все диаметры', ''), ...TUBE_SIZES[standard.id]
    .map(([diameter]) => new Option(formatTubeSize.format(diameter), diameter)));
  document.getElementById('tubeCaption').textContent = standard.name;
  const source = document.getElementById('tubeSource');
  source.parentElement.hidden = !standard.source;
  if (standard.source) source.href = standard.source;
  updateTubeDiameter();
}

standardSelect.replaceChildren(...tubeStandards.map(standard => new Option(standard.name, standard.id)));
standardSelect.addEventListener('change', updateTubeStandard);
diameterSelect.addEventListener('change', updateTubeDiameter);
wallSelect.addEventListener('change', updateTubeQuote);
updateTubeStandard();
