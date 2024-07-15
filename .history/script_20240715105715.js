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

document.addEventListener("DOMContentLoaded", () => {
  const scheduleButtons = document.querySelectorAll("#agendar-btn");
  const modal = document.getElementById("scheduleModal");
  const closeModalButton = document.querySelector(".close");
  const confirmScheduleButton = document.getElementById("confirmSchedule");
  const scheduledServices = document.getElementById("scheduledServices");

  let selectedService = null;

  scheduleButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      selectedService = event.target.dataset.servico;
      showModal();
    });
  });

  closeModalButton.addEventListener("click", closeModal);
  confirmScheduleButton.addEventListener("click", confirmSchedule);

  function showModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function confirmSchedule() {
    const barber = document.getElementById("barber").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (date && time) {
      const serviceElement = document.createElement("div");
      serviceElement.innerHTML = `
        <p>Serviço: ${selectedService}</p>
        <p>Barbeiro: ${barber}</p>
        <p>Data: ${date}</p>
        <p>Hora: ${time}</p>
      `;
      scheduledServices.appendChild(serviceElement);
      closeModal();
    }
  }
});

function confirmSchedule() {
  const barber = document.getElementById("barber").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (date && time) {
    const data = {
      name: "Cliente", // Placeholder, replace with actual name input
      phone: "123456789", // Placeholder, replace with actual phone input
      service: selectedService,
      barber: barber,
      date: date,
      time: time,
      duration: getServiceDuration(selectedService), // Function to get the duration
    };

    fetch("http://127.0.0.1:8000/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Booking confirmed!") {
          const serviceElement = document.createElement("div");
          serviceElement.innerHTML = `
          <p>Serviço: ${selectedService}</p>
          <p>Barbeiro: ${barber}</p>
          <p>Data: ${date}</p>
          <p>Hora: ${time}</p>
        `;
          scheduledServices.appendChild(serviceElement);
          closeModal();
        }
      });
  }
}

function getServiceDuration(service) {
  switch (service) {
    case "Corte Simples":
      return "30m";
    case "Barba":
      return "30m";
    case "Pezinho":
      return "15m";
    case "Corte + Barba":
      return "50m";
    case "Corte + Sobrancelha":
      return "45m";
    case "Corte + Sobrancelha + Barba":
      return "60m";
    default:
      return "30m";
  }
}
