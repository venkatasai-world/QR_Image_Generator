function generateQr() {
  const urlInput = document.getElementById("url").value.trim();

  if (!urlInput) {
    alert("Please enter a valid URL");
    return;
  }

  fetch(`/generate-qr?url=${encodeURIComponent(urlInput)}`)
    .then(response => response.blob())
    .then(blob => {
      const qrUrl = URL.createObjectURL(blob);

      const qrBox = document.getElementById("qr-box");
      qrBox.innerHTML = "";
      const img = document.createElement("img");
      img.src = qrUrl;
      img.alt = "QR Code";
      img.style.width = "180px";
      img.style.height = "180px";
      qrBox.appendChild(img);

      const downloadBtn = document.getElementById("downloadBtn");
      downloadBtn.style.display = "inline-block";
      downloadBtn.onclick = () => {
        const a = document.createElement("a");
        a.href = qrUrl;
        a.download = "QRCode.png";
        a.click();
      };
    })
    .catch(err => console.error(err));
}
