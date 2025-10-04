// ===========================
    // Array de Estados do Brasil
    // ===========================
    const estadosBR = [
      { name: 'Acre', uf: 'AC', lat: -9.97499, lon: -67.8243 },
      { name: 'Alagoas', uf: 'AL', lat: -9.649847, lon: -35.708949 },
      { name: 'Amapá', uf: 'AP', lat: 0.034934, lon: -51.0694 },
      { name: 'Amazonas', uf: 'AM', lat: -3.119028, lon: -60.021731 },
      { name: 'Bahia', uf: 'BA', lat: -12.977749, lon: -38.50163 },
      { name: 'Ceará', uf: 'CE', lat: -3.731862, lon: -38.526669 },
      { name: 'Distrito Federal', uf: 'DF', lat: -15.793889, lon: -47.882778 },
      { name: 'Espírito Santo', uf: 'ES', lat: -20.3155, lon: -40.3128 },
      { name: 'Goiás', uf: 'GO', lat: -16.686891, lon: -49.2648 },
      { name: 'Maranhão', uf: 'MA', lat: -2.529, lon: -44.302 },
      { name: 'Mato Grosso', uf: 'MT', lat: -15.601, lon: -56.097 },
      { name: 'Mato Grosso do Sul', uf: 'MS', lat: -20.4497, lon: -54.6469 },
      { name: 'Minas Gerais', uf: 'MG', lat: -19.9167, lon: -43.9345 },
      { name: 'Pará', uf: 'PA', lat: -1.455833, lon: -48.504444 },
      { name: 'Paraíba', uf: 'PB', lat: -7.11532, lon: -34.8631 },
      { name: 'Paraná', uf: 'PR', lat: -25.4284, lon: -49.2733 },
      { name: 'Pernambuco', uf: 'PE', lat: -8.047562, lon: -34.876964 },
      { name: 'Piauí', uf: 'PI', lat: -5.08921, lon: -42.8013 },
      { name: 'Rio de Janeiro', uf: 'RJ', lat: -22.9068, lon: -43.1729 },
      { name: 'Rio Grande do Norte', uf: 'RN', lat: -5.7945, lon: -35.211 },
      { name: 'Rio Grande do Sul', uf: 'RS', lat: -30.0346, lon: -51.2177 },
      { name: 'Rondônia', uf: 'RO', lat: -8.76077, lon: -63.8999 },
      { name: 'Roraima', uf: 'RR', lat: 2.8235, lon: -60.6758 },
      { name: 'Santa Catarina', uf: 'SC', lat: -27.5954, lon: -48.5480 },
      { name: 'São Paulo', uf: 'SP', lat: -23.55052, lon: -46.633309 },
      { name: 'Sergipe', uf: 'SE', lat: -10.9472, lon: -37.07308 },
      { name: 'Tocantins', uf: 'TO', lat: -10.1846, lon: -48.3336 }
    ];

    // Preenche o <select>
    const select = document.getElementById("estadoSelect");
    estadosBR.forEach(est => {
      const option = document.createElement("option");
      option.value = `${est.lat},${est.lon}`;
      option.textContent = est.name;
      select.appendChild(option);
    });

function getWeatherCard(code, temp) {
  let card = { class: "cloudy", titulo: "☁️ Nublado", descricao: "Céu encoberto." };

  if (code === 0) {
    card = { class: "sunny", titulo: "☀️ Ensolarado", descricao: "Dia limpo e ensolarado." };
  } else if ([1,2].includes(code)) {
    card = { class: "partly-cloudy", titulo: "🌤️ Parcialmente Nublado", descricao: "Algumas nuvens no céu." };
  } else if (code === 3) {
    card = { class: "cloudy", titulo: "☁️ Nublado", descricao: "Céu totalmente encoberto." };
  } else if ([45,48].includes(code)) {
    card = { class: "foggy", titulo: "🌫️ Névoa", descricao: "Visibilidade reduzida." };
  } else if ((code >= 51 && code <= 67) || (code >= 61 && code <= 65)) {
    card = { class: "rainy", titulo: "🌦️ Chuva", descricao: "Chuvas previstas." };
  } else if ((code >= 71 && code <= 77) || [85,86].includes(code)) {
    card = { class: "snowy", titulo: "❄️ Neve", descricao: "Neve caindo, cuidado nas estradas." };
  } else if (code >= 80 && code <= 82) {
    card = { class: "rainy", titulo: "🌧️ Pancadas de Chuva", descricao: "Chuvas rápidas e fortes." };
  } else if (code >= 95 && code <= 99) {
    card = { class: "stormy", titulo: "🌩️ Tempestade", descricao: "Trovoadas intensas, cuidado!" };
  }

  // Temperatura extrema sobrepõe se frio intenso
  if (temp <= 10) {
    card = { class: "cold", titulo: "🧊 Frio Intenso", descricao: "Agasalhe-se bem!" };
  }

  return card;
}


    // ===========================
    // Buscar clima
    // ===========================
    async function buscarClima() {
      const coords = select.value.split(",");
      const lat = coords[0];
      const lon = coords[1];

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        const code = data.current_weather.weathercode;

        const card = getWeatherCard(code, temp);

        document.getElementById("Weather-result").innerHTML = `
          <div class="weather-card ${card.class}">
            <h2>${card.titulo}</h2>
            <p>Temperatura: ${temp}°C</p>
            <p>Vento: ${wind} km/h</p>
            <p>${card.descricao}</p>
          </div>
        `;
      } catch (error) {
        console.error("Erro ao buscar clima:", error);
        document.getElementById("Weather-result").innerHTML = `<p>Erro ao buscar clima. Tente novamente.</p>`;
      }
    }


