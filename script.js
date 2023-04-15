// const form = document.getElementById("upload-form");
// const fileInput = document.getElementById("pdf-upload");
// const preview = document.getElementById("preview");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const file = fileInput.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       const dataURL = reader.result;
//       const pdf = new jsPDF();
//       pdf.addImage(dataURL, "JPEG", 0, 0);
//       const img = pdf.output("datauristring");
//       preview.innerHTML = `<img src="${img}" alt="JPG preview">`;
//     };
//   }
// });

// Select the input file input element
const input = document.querySelector('input[type="file"]');

// Add an event listener for when a file is selected
input.addEventListener("change", async () => {
  // Select the PDF file
  const file = input.files[0];

  // Load the PDF file
  const pdf = await pdfjsLib.getDocument(await file.arrayBuffer()).promise;

  // Select the first page of the PDF
  const page = await pdf.getPage(1);

  // Render the page as a JPEG image
  const viewport = page.getViewport({ scale: 1 });
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext, viewport }).promise;
  const jpegDataUrl = canvas.toDataURL("image/jpeg");

  // Create a new JPEG image element
  const img = document.createElement("img");

  // Set the src attribute to the JPEG image data URL
  img.src = jpegDataUrl;

  // Append the image element to the preview div
  const preview = document.querySelector("#preview");
  preview.innerHTML = "";
  preview.appendChild(img);
});
