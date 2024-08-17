// Função para exibir ou ocultar seções
function toggleSection(event, sectionId) {
  event.preventDefault();
  const sections = [
    "services",
    "portfolio",
    "evaluation",
    "detalhes",
    "agenda",
  ]; // IDs de todas as seções

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (sectionId !== id) {
      section.style.display = "none";
    } else {
      const selectedSection = document.getElementById(sectionId);
      selectedSection.style.display =
        selectedSection.style.display === "none" ? "block" : "none";
    }
  });
}

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

// Evento de clique no botão de navegação
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

// Evento de clique no botão "curtir"
document.getElementById("curtir").addEventListener("click", function () {
  if (this.src.includes("coracao.png")) {
    this.src = "./images/coracaopreenchido.png";
  } else {
    this.src = "./images/coracao.png";
  }
});

document.getElementById("compartilhar").addEventListener("click", function () {
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`;

  window.open(whatsappUrl, "_blank");
});

// Função para fechar o modal de agendamento
function closeModal() {
  document.querySelector("#scheduleModal").style.display = "none";
  // Reabre o elemento de serviços quando o modal é fechado
  document.getElementById("services").style.display = "block";
}

// Evento de clique no ícone do menu mobile para exibir/ocultar o menu
const mobileMenu = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list li a");

mobileMenu.addEventListener("click", () => {
  navList.classList.toggle("active");
});

// Evento de clique nos links do menu para marcar o link ativo
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");
  });
});

// Inicializar o mapa assim que o documento estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  initMap();
});

// Função para enviar os dados do formulário para a rota Flask
function parseDuration(durationString) {
  if (!durationString) {
    console.error("durationString is null or undefined");
    return 0; // Retorna 0 ou outro valor padrão se a string estiver vazia
  }

  let hours = 0;
  let minutes = 0;

  // Expressão regular para encontrar horas e minutos
  const hoursMatch = durationString.match(/(\d+)\s*h/);
  const minutesMatch = durationString.match(/(\d+)\s*m/);

  if (hoursMatch) {
    hours = parseInt(hoursMatch[1], 10);
  }
  if (minutesMatch) {
    minutes = parseInt(minutesMatch[1], 10);
  }

  return hours * 60 + minutes;
}

let isSubmitting = false;
