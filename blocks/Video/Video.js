export default function decorate(block) {
  const url = block.textContent.trim();

  // Clear the block contents
  block.innerHTML = '';

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const embedUrl = url
      .replace('watch?v=', 'embed/')
      .replace('youtu.be/', 'youtube.com/embed/');

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', embedUrl);
    iframe.setAttribute('width', '560');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    block.appendChild(iframe);
  } else {
    block.innerText = '⚠️ Unsupported video format or link';
  }
}
