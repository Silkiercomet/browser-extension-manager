function changeTheme() {
  const themeContainer = document.querySelector(".theme_container");
  const navbar = document.querySelector(".navbar");
  const extensionListItems = document.querySelectorAll(".extension_list_item");

  themeContainer.classList.toggle("dark_theme");
  navbar.classList.toggle("dark_navbar");

  extensionListItems.forEach(item => {
    item.classList.toggle("dark_item");
  });
}

const themeButton = document.getElementById("navbar_theme_btn");
themeButton.addEventListener("click", changeTheme);


async function populateExtensionList() {
  const extensionListContainer = document.querySelector(".extension_list");

  if (!extensionListContainer) {
    console.error("Extension list container not found!");
    return;
  }

  try {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach(e => {
      const listItem = document.createElement("li");
      listItem.classList.add("extension_list_item");

      listItem.innerHTML = `
        <div class="extension_list_item_top">
          <img src="${e.logo}" alt="${e.name}">
          <div>
            <h3>${e.name}</h3>
            <p>${e.description}</p>
          </div>
        </div>
        <div class="extension_list_item_bottom">
          <button class="remove">Remove</button>
          <input type="checkbox" id="switch-toggle-${e.name}" ${e.isActive ? "checked='true'" : ""}>
          <label for="switch-toggle-${e.name}" class="switch">
            <span class="slider round"></span>
          </label>
        </div>
      `;

      extensionListContainer.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    const noExtensionsElement = document.createElement("li");
    noExtensionsElement.textContent = "No hay extensiones";
    extensionListContainer.appendChild(noExtensionsElement);
  }
}

// Call the function to populate the list when the page loads
window.addEventListener("load", populateExtensionList);

