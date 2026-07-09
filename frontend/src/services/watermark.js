// Watermark Service - Dynamic watermarking for secure reader

export const createWatermark = (canvas, userName, userPhone, userEmail) => {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Semi-transparent overlay
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = '#999999';
  ctx.font = 'bold 24px Arial';

  const watermarkText = `${userName} | ${userPhone} | ${userEmail}`;
  const spacing = 200;

  // Draw diagonal watermark pattern
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 4);

  for (let y = -height; y < height; y += spacing) {
    for (let x = -width; x < width; x += spacing) {
      ctx.fillText(watermarkText, x, y);
    }
  }

  ctx.restore();
  ctx.globalAlpha = 1.0;
};

export const disableContentCopy = () => {
  // Disable right-click
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Disable keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+S or Cmd+S - Save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') e.preventDefault();
    // Ctrl+C or Cmd+C - Copy
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') e.preventDefault();
    // Ctrl+P or Cmd+P - Print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') e.preventDefault();
    // F12 - DevTools
    if (e.key === 'F12') e.preventDefault();
  });

  // Disable text selection
  document.body.style.userSelect = 'none';
};
