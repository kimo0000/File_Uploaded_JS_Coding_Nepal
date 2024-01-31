const form = document.querySelector("form"),
  inputFile = form.querySelector('input[type="file"]'),
  progressArea = document.querySelector(".progress_area"),
  uploadArea = document.querySelector(".upload_area");

// console.log(progressArea, uploadArea);

form.addEventListener("click", () => inputFile.click());
inputFile.addEventListener("change", ({ target }) => {
  let file = target.files[0];
  if (!file) return;

  let fileName = file.name;
  let splitFile = fileName.split(".");
  // console.log(splitFile);
  fileName = `${splitFile[0].substring(0, 10)}... .${splitFile[1]}`;

  uploadFile(fileName);
});

const uploadFile = (fileName) => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/upload.php");
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    uploadArea.classList.add("show");
    // console.log(loaded, total);
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    fileTotal < 1024
      ? (fileSize = fileTotal + " KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");
    // console.log(fileSize);
    let progressHtml = `<div class="progress_box">
                              <i class="fa-solid fa-file-lines"></i>
                              <div class="row percent_progress">
                                  <div class="percent_file">
                                      <span>${fileName}</span>
                                      <span>${fileLoaded}%</span>
                                  </div>
                                  <div class="progress_bar">
                                      <div class="bar" style="width: ${fileLoaded}%"></div>
                                  </div>
                              </div>
                            </div> `;

    progressArea.innerHTML = progressHtml;

    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadFile = `<div class="upload_box">
                                <i class="fa-solid fa-file-lines"></i>
                                <div class="upload_file">
                                    <span>${fileName}</span>
                                    <span class="size_file">${fileSize}</span>
                                </div>
                                <div class="check">
                                    <i class="fa-solid fa-check"></i>
                                </div>
                              </div>`;

      uploadArea.insertAdjacentHTML("afterbegin", uploadFile);
    }
  });

  let formData = new FormData(form);
  xhr.send(formData);
};
