const dropList = document.querySelectorAll("form select"),
  dariMataUang = document.querySelector(".from select"),
  keMataUang = document.querySelector(".to select"),
  getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (let kodeMataUang in daftar_negara) {
    let selected = i == 0 ? (kodeMataUang == "USD" ? "selected" : "") : kodeMataUang == "IDR" ? "selected" : "";
    let optionTag = `<option value="${kodeMataUang}" ${selected}>${kodeMataUang}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    tukarBendera(e.target);
  });
}

function tukarBendera(element) {
  for (let kode in daftar_negara) {
    if (kode == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${daftar_negara[kode].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", () => {
  getNilaiTukar();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getNilaiTukar();
});

const tukarIcon = document.querySelector("form .icon");
tukarIcon.addEventListener("click", () => {
  let kodeSementara = dariMataUang.value;
  dariMataUang.value = keMataUang.value;
  keMataUang.value = kodeSementara;
  tukarBendera(dariMataUang);
  tukarBendera(keMataUang);
  getNilaiTukar();
});

function getNilaiTukar() {
  const jumlah = document.querySelector("form input");
  const nilaiTukarTxt = document.querySelector("form .exchange-rate");
  let jumlahNilai = jumlah.value;
  if (jumlahNilai == "" || jumlahNilai == "0") {
    jumlah.value = "1";
    jumlahNilai = 1;
  }
  nilaiTukarTxt.innerText = "Mendapatkan nilai tukar...";
  let apiKey = "fe4e52059eeb81f211dac145";
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${dariMataUang.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let nilaiTukar = result.conversion_rates[keMataUang.value];
      let totalExRate = (jumlahNilai * nilaiTukar).toFixed(2);
      nilaiTukarTxt.innerText = `${jumlahNilai} ${dariMataUang.value} = ${totalExRate} ${keMataUang.value}`;
    })
    .catch(() => {
      nilaiTukarTxt.innerText = "Ada beberapa kesalahan";
    });
}
