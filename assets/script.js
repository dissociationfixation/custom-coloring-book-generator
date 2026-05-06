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

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        // Response is now a binary image (PNG)
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        // Add image to gallery
        const imgContainer = document.createElement('div');
        imgContainer.style.cssText = 'text-align:center; margin:10px;';

        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.cssText = 'width:200px; height:auto; border:1px solid #ccc; border-radius:5px;';
        img.alt = `Page ${i}`;

        const label = document.createElement('p');
        label.textContent = `Page ${i}`;
        label.style.cssText = 'margin:5px 0; font-size:12px;';

        // Download single page button
        const dlBtn = document.createElement('a');
        dlBtn.href = imageUrl;
        dlBtn.download = `${childName}_coloring_page_${i}.png`;
        dlBtn.textContent = 'Download';
        dlBtn.style.cssText = 'font-size:11px; color:#4CAF50;';

        imgContainer.appendChild(img);
        imgContainer.appendChild(label);
        imgContainer.appendChild(dlBtn);
        gallery.appendChild(imgContainer);

        generatedImages.push(imageUrl);
      } catch (err) {
        console.error(`Error generating page ${i}:`, err);
        status.textContent = `Error on page ${i}. Try again.`;
        button.disabled = false;
        return;
      }
    }

    status.textContent = `Done! ${totalPages} pages generated for ${childName}. Click "Download" under each page to save.`;
    button.disabled = false;
  });
});
