export default function decorate(block) {
  const slides = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach((slide, i) => {
    const slideEl = document.createElement('div');
    slideEl.className = 'carousel-slide';
    slideEl.innerHTML = slide.innerHTML;
    if (i === 0) slideEl.classList.add('active');
    track.appendChild(slideEl);
  });

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn prev';
  prevBtn.textContent = '❮';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn next';
  nextBtn.textContent = '❯';

  wrapper.appendChild(prevBtn);
  wrapper.appendChild(track);
  wrapper.appendChild(nextBtn);
  block.innerHTML = '';
  block.appendChild(wrapper);

  let current = 0;
  const updateSlides = () => {
    const allSlides = block.querySelectorAll('.carousel-slide');
    allSlides.forEach((s, i) => {
      s.classList.toggle('active', i === current);
    });
  };

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlides();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateSlides();
  });
}
