window.addEventListener("DOMContentLoaded", async () => {
  const currentURL = window.location.pathname;

  const projectId = currentURL.match(/my_projects\/(\d+)/)[1];
  console.log(projectId);

  const data = {
    project_id: projectId,
  };

  await fetch("/project_images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      return JSZip.loadAsync(blob);
    })
    .then((zip) => {
      console.log(zip);
      const fileDisplay = document.querySelector(".imageDisplay");
      fileDisplay.innerHTML = "";

      const filePromises = [];

      zip.forEach((relativePath, zipEntry) => {
        if (zipEntry.name.match(/\.(jpg|jpeg|png)$/i)) {
          filePromises.push(
            zipEntry.async("blob").then((fileData) => {
              const imgURL = URL.createObjectURL(fileData);

              const listItem = document.createElement("li");

              // Создаем изображение
              const imgElement = document.createElement("img");
              imgElement.src = imgURL;
              imgElement.style.width = "200px";
              imgElement.style.height = "150px";
              imgElement.style.marginBottom = "10px";

              const textElement = document.createElement("p");
              textElement.textContent = zipEntry.name;

              listItem.appendChild(imgElement);
              listItem.appendChild(textElement);

              fileDisplay.appendChild(listItem);
            })
          );
        }
      });
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      alert("Ошибка при загрузке файлов");
    });
});