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

// Seleciona todos os botões de agendamento
const agendarButtons = document.querySelectorAll("#agendar-btn");

// Adiciona um evento de clique para cada botão
agendarButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    // Evita o comportamento padrão do botão (enviar formulário)
    event.preventDefault();

    // Obtém os dados do serviço, valor e tempo da mesma div do botão clicado
    const service = button.parentNode.querySelector("span").textContent.trim();
    const value = button.parentNode.querySelector("#valor").textContent.trim();
    const time = button.parentNode.querySelector("#tempo").textContent.trim();

    // Preenche o modal com os dados do serviço selecionado
    document.querySelector("#scheduleModal").style.display = "block";
    document.querySelector('#scheduleForm input[type="text"]').value = ""; // Limpa os campos de texto (nome e whatsapp)
    document.querySelector("#barber").selectedIndex = 0; // Reseta o dropdown de barbeiros
    document.querySelector("#date").value = ""; // Limpa o campo de data
    document.querySelector("#time").value = ""; // Limpa o campo de horário

    // Preenche os campos ocultos no formulário com os dados do serviço selecionado
    document.querySelector('#scheduleForm input[name="service"]').value =
      service;
    document.querySelector('#scheduleForm input[name="value"]').value = value;
    document.querySelector('#scheduleForm input[name="time"]').value = time;
  });
});

// Função para fechar o modal de agendamento
function closeModal() {
  document.querySelector("#scheduleModal").style.display = "none";
}

// Função para enviar os dados do formulário para a rota Flask
function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById('scheduleForm');
  const formData = new FormData(form);

  fetch('/schedule', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Booking confirmed:', data.message);
    // Aqui você pode adicionar lógica adicional após o agendamento ser confirmado
    closeModal(); // Fecha o modal após o agendamento ser confirmado
  })
  .catch(error => {
    console.error('Error:', error);
    // Aqui você pode tratar erros de requisição, se necessário
  });
}

// Seleciona todos os botões de agendamento
const agendarButtons = document.querySelectorAll('#agendar-btn');

// Adiciona um evento de clique para cada botão
agendarButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    // Evita o comportamento padrão do botão (enviar formulário)
    event.preventDefault();

    // Obtém os dados do serviço, valor e tempo da mesma div do botão clicado
    const service = button.parentNode.querySelector('span').textContent.trim();
    const value = button.parentNode.querySelector('#valor').textContent.trim();
    const time = button.parentNode.querySelector('#tempo').textContent.trim();

    // Preenche o modal com os dados do serviço selecionado
    document.querySelector('#scheduleModal').style.display = 'block';
    document.querySelector('#scheduleForm input[name="service"]').value = service;
    document.querySelector('#scheduleForm input[name="value"]').value = value;
    document.querySelector('#scheduleForm input[name="time"]').value = time;
  });
});

// Função para fechar o modal de agendamento
function closeModal() {
  document.querySelector('#scheduleModal').style.display = 'none';
}
