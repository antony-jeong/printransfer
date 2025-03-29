function generateMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  const paperWidthMM = 210
  const paperHeightMM = 297
  const marginMM = 5
  const MMperInch = 25.4
  const printWidthInch = (paperWidthMM-2*marginMM)/MMperInch
  const printHeightInch = (paperHeightMM-2*marginMM)/MMperInch
  const dpi = 600
  const printWidthPX = printWidthInch*dpi
  const printHeightPX = printHeightInch*dpi
  canvas.width = printWidthPX;
  canvas.height = printHeightPX;
  console.log(canvas.width, canvas.height)

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const arr = [100, 200, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410];
  // const arr = [100];
  let y = 0;
  for (let mult of arr) {
    const a = Math.floor(canvas.width / mult);
    let start = true;
    for (let row = 0; row < 20; row++) {
      let bit = start;
      for (let idx = 0; idx < mult; idx++) {
        const x = idx * a;
        ctx.fillStyle = bit ? 'black' : 'white';
        ctx.fillRect(x, y, a, a);
        bit = !bit;
      }
      y += a;
      start = !start;
    }
    y += 120;
  }
}
generateMatrix();

function downloadPNG() {
  const canvas = document.getElementById('matrixCanvas');
  const link = document.createElement('a');
  link.download = 'encoded_image.png';
  link.href = canvas.toDataURL();
  link.click();
}

function printImage() {
  const canvas = document.getElementById('matrixCanvas');
  const img = new Image();
  img.src = canvas.toDataURL();

  img.onload = function() {
    const w = window.open("", "", "width=800,height=600");
    const d = w.document;
    d.body.style.margin = String(800 / 200 * 15) + "px";
    const printImg = d.createElement("img");
    printImg.src = canvas.toDataURL();;
    printImg.style.maxWidth = "100%";
    printImg.style.height = "auto";
    d.body.appendChild(printImg);
    d.close();
    w.print();
  };
}
