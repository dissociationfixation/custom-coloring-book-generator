document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.getElementById('gallery');
  const status = document.getElementById('status');
  const form = document.getElementById('input-form');
  const button = form.querySelector('button');
  let generatedImages = [];

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    button.disabled = true;
    gallery.innerHTML = '';
    generatedImages = [];

    const childName = document.getElementById('childName').value || 'Friend';
    const theme = document.getElementById('theme').value;
    const totalPages = parseInt(document.getElementById('pages').value);

    status.textContent = `Generating ${totalPages} pages for ${childName}...`;

    for (let i = 1; i <= totalPages; i++) {
      status.textContent = `Generating page ${i} of ${totalPages}...`;

      try {
        const response = await fetch('/ai', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            childName: childName,
            theme: theme,
            pageNumber: i
          })
        });

        const data = await response.json();

        // Add image to gallery
        const imgContainer = document.createElement('div');
        imgContainer.style.cssText = 'text-align:center; margin:10px;';

        const img = document.createElement('img');
        img.src = data.image;
        img.style.cssText = 'width:200px; height:auto; border:1px solid #ccc; border-radius:5px;';
        img.alt = `Page ${i}`;

        const label = document.createElement('p');
        label.textContent = `Page ${i}`;
        label.style.cssText = 'margin:5px 0; font-size:12px;';

        // Download single page button
        const dlBtn = document.createElement('a');
        dlBtn.href = data.image;
        dlBtn.download = `${childName}_coloring_page_${i}.png`;
        dlBtn.textContent = 'Download';
        dlBtn.style.cssText = 'font-size:11px; color:#4CAF50;';

        imgContainer.appendChild(img);
        imgContainer.appendChild(label);
        imgContainer.appendChild(dlBtn);
        gallery.appendChild(imgContainer);

        generatedImages.push(data.image);
      } catch (err) {
        console.error(`Error generating page ${i}:`, err);
        status.textContent = `Error on page ${i}. Try again.`;
        button.disabled = false;
        return;
      }
    }

    status.textContent = `Done! ${totalPages} pages generated for ${childName}. Right-click images to save, or use the download links below each page.`;
    button.disabled = false;
  });
});
