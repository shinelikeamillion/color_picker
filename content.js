let position = [0, 0];
let num = 17;
let size = 170;
let center = parseInt(num / 2);
let scale = 4;
let active = false;

document.addEventListener("mousemove", async (e) => {
  position = [e.clientX, e.clientY];
  canvas = document.getElementById("picker");

  const x = position[0];
  const y = position[1];
  if (!tempCanvas) return;
  const tempSize = size / scale;
  const centerTemp = tempSize / 2;
  const tempCtx = tempCanvas.getContext("2d", {alpha: false, willReadFrequently: true});
  // Setup the pixelation of the source image on the canvas.
  tempCtx.drawImage(
    image,
    x - centerTemp,
    y - centerTemp,
    tempSize,
    tempSize,
    0,
    0,
    size,
    size
  );

  const ctx = canvas.getContext("2d", {alpha: false, willReadFrequently: true});
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  // second way
  // // const small = 17;
  // const ctx = canvas.getContext("2d", {alpha: false, willReadFrequently: true});
  // ctx.mozImageSmoothingEnabled = false;
  // ctx.webkitImageSmoothingEnabled = false;
  // ctx.imageSmoothingEnabled = false;

  // ctx.drawImage(
  //   image,
  //   x - centerTemp,
  //   y - centerTemp,
  //   tempSize,
  //   tempSize,
  //   0,
  //   0,
  //   small,
  //   small
  // );
  // ctx.rect(0, 0, size, size);
  // ctx.drawImage(canvas, 0, 0, small, small, 0, 0, size, size);

  // let mi = parseInt(170 / 2);
  // const color = ctx.getImageData(mi, mi, 1, 1).data;
  // seletedColor = rgbToHex(color[0], color[1], color[2]);
  // document.getElementById("wrapper_p").innerText = seletedColor;

  // const s = size / small;
  // for (i = 0; i < small; i++) {
  //   ctx.strokeStyle = "#000";
  //   ctx.lineWidth = 0.2;
  //   ctx.beginPath();
  //   ctx.moveTo(0, i * s + 0.5);
  //   ctx.lineTo(size, s * i + 0.5);
  //   ctx.moveTo(i * s + 0.5, 0);
  //   ctx.lineTo(s * i + 0.5, size);
  //   ctx.stroke();
  // }
  // let m = parseInt(17 / 2);
  // ctx.lineWidth = 1;
  // ctx.strokeStyle = "#000";
  // ctx.strokeRect(s * m + 0.5, s * m + 0.5, s, s);
  // ctx.strokeStyle = "#fff";
  // ctx.strokeRect(s * m - 0.5, s * m - 0.5, s + 1.5, s + 1.5);

  let seletedColor = "";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < num; i++) {
    for (j = 0; j < num; j++) {
      const cx = map(i, 0, num, 0, size) + 5
      const cy = map(j, 0, num, 0, size) + 5
      const color = tempCtx.getImageData(cx, cy, 1, 1).data;
      let rbgColor = `rgb(${color[0]} ${color[1]} ${color[2]})`;
      ctx.fillStyle = rbgColor;
      ctx.fillRect(10 * i, 10 * j, 10, 10);
      if (i == center && j == center) {
        seletedColor = rgbToHex(color[0], color[1], color[2]);
        document.getElementById("wrapper_p").innerText = seletedColor;
      }
    }
  }
  for (i = 0; i < num; i++) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 0.2;
    ctx.beginPath();
    ctx.moveTo(0, i * 10 + 0.5);
    ctx.lineTo(size, 10 * i + 0.5);
    ctx.moveTo(i * 10 + 0.5, 0);
    ctx.lineTo(10 * i + 0.5, size);
    ctx.stroke();
  }
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000";
  ctx.strokeRect(10 * center + 0.5, 10 * center + 0.5, 10, 10);
  ctx.strokeStyle = "#fff";
  ctx.strokeRect(10 * center - 0.5, 10 * center - 0.5, 11.5, 11.5);
});
let tempCanvas;
let image;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  image = new Image();
  image.src = message.image;
  image.onload = () => {
    wrapper = document.createElement("div");
    wrapper.setAttribute("id", "wrapper");
    document.body.appendChild(wrapper);

    tempCanvas = document.createElement("canvas");
    tempCanvas.width = size;
    tempCanvas.height = size;
    tempCanvas.style.borderRadius = `${size / 2}px`;
    tempCanvas.setAttribute("id", "temp");

    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "picker");
    canvas.width = size;
    canvas.height = size;
    canvas.style.borderRadius = `${size / 2}px`;
    wrapper.appendChild(canvas);
    // wrapper.appendChild(tempCanvas);
    // img = document.createElement("img");
    // img.src = message.image;
    // document.body.appendChild(img);

    text = document.createElement("p");
    text.setAttribute("id", "wrapper_p");
    text.innerText = "#fffff";
    wrapper.appendChild(text);
  };
});

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function map(value, f1, t1, f2, t2) {
  return f2 + ((value - f1) / (t1 - f1)) * (t2 - f2);
}
