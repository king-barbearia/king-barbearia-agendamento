const mobileMenu = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list li a");

mobileMenu.addEventListener("click", () => {
  navList.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");
  });
});

//alteraçoes de visualização de menu visto não visto

function toggleSection(event, sectionId) {
  event.preventDefault();
  const sections = [
    "services",
    "portfolio",
    "evaluation",
    "detalhes",
    "agenda",
  ]; // IDs of all sections
  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (sectionId !== id) {
      section.style.display = "none";
    }
  });
  const selectedSection = document.getElementById(sectionId);
  selectedSection.style.display =
    selectedSection.style.display === "none" ? "block" : "none";
}

//iteração do icone curtir
document.getElementById("curtir").addEventListener("click", function () {
  if (this.src.includes("coracao.png")) {
    this.src = "./images/coracaopreenchido.png";
  } else {
    this.src = "./images/coracao.png";
  }
});

// Função para inicializar o mapa
function initMap() {
  // Coordenadas de exemplo (São Paulo, Brasil)
  const location = [-23.612242436593856, -46.594654991394556];

  // Verificar se o contêiner do mapa está visível
  const mapContainer = document.getElementById("map");
  if (
    mapContainer.style.display === "none" ||
    mapContainer.offsetWidth === 0 ||
    mapContainer.offsetHeight === 0
  ) {
    // Aguardar até que o contêiner do mapa esteja visível
    setTimeout(initMap, 100);
    return;
  }

  // Inicializar o mapa
  const map = L.map("map").setView(location, 13);

  // Adicionar camada de mapa do OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/export#map=19/-23.61312/-46.59401">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Adicionar um marcador na localização
  L.marker(location).addTo(map).bindPopup("São Paulo, Brasil").openPopup();
}

document
  .getElementById("navigate-button")
  .addEventListener("click", function () {
    const lat = -23.612242436593856; // Latitude de destino
    const lng = -46.594654991394556; // Longitude de destino
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  });

initMap();

