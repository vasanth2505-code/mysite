
import { loadScript } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
  await loadScript('https://cdn.jsdelivr.net/npm/chart.js');

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xlsx';
  input.style.margin = '20px 0';
  block.appendChild(input);

  const canvas = document.createElement('canvas');
  canvas.id = 'salesChart';
  canvas.width = 600;
  canvas.height = 300;
  block.appendChild(canvas);

  let chart;

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      const deptSales = {};

      json.forEach(row => {
        const dept = row['Department'];
        const sales = parseFloat(row['Sales']);
        if (dept && !isNaN(sales)) {
          deptSales[dept] = (deptSales[dept] || 0) + sales;
        }
      });

      if (chart) chart.destroy();

      chart = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: Object.keys(deptSales),
          datasets: [{
            label: 'Total Sales',
            data: Object.values(deptSales),
            backgroundColor: '#3498db'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    };

    reader.readAsArrayBuffer(file);
  });
}
