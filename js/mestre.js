const inventario = document.getElementById("inventario");
const armas = document.getElementById("armas");

let fichas = JSON.parse(localStorage.getItem("fichas")) || [];
let fichaAtual = null;

const lista = document.getElementById("listaFichas");

function atualizarLista() {
    lista.innerHTML = "";
    fichas.forEach((f, i) => {
        const li = document.createElement("li");
        li.textContent = f.nome || "Sem nome";
        li.onclick = () => abrirFicha(i);
        lista.appendChild(li);
    });
}

function novaFicha() {
    fichaAtual = null;
    limparCampos();
}

function salvarFicha() {
    const ficha = {
  nome: nome.value,
  jogador: jogador.value,

  atributos: {
    forca: forca.value,
    destreza: destreza.value,
    constituicao: constituicao.value,
    inteligencia: inteligencia.value,
    sabedoria: sabedoria.value,
    carisma: carisma.value
  },

 pericias: Object.fromEntries(
  pericias.map(p => [
    p,
    {
      base: document.getElementById(p+"Base").value,
      treinada: document.getElementById(p+"Treinada").checked,
      prof: document.getElementById(p+"Prof").value,
      total: document.getElementById(p+"Total").value
    }
  ])
),


  pv: pv.value,
  sanidade: sanidade.value,
  xp: xp.value,
  resistencia: resistencia.value,

  origem: origem.value,
  raca: raca.value,
  anotacoes: anotacoes.value,

  inventario: inventario.value,
  armas: armas.value
};


    if (fichaAtual === null) {
        fichas.push(ficha);
    } else {
        fichas[fichaAtual] = ficha;
    }

    localStorage.setItem("fichas", JSON.stringify(fichas));
    atualizarLista();
}

function abrirFicha(index) {
    fichaAtual = index;
    const f = fichas[index];

    nome.value = f.nome || "";
    jogador.value = f.jogador || "";

    forca.value = f.atributos.forca || 0;
    destreza.value = f.atributos.destreza || 0;
    constituicao.value = f.atributos.constituicao || 0;
    inteligencia.value = f.atributos.inteligencia || 0;
    sabedoria.value = f.atributos.sabedoria || 0;
    carisma.value = f.atributos.carisma || 0;

    pericias.forEach(p => {
  const dados = f.pericias?.[p];
  if (!dados) return;

  document.getElementById(p+"Base").value = dados.base || 0;
  document.getElementById(p+"Treinada").checked = dados.treinada || false;
  document.getElementById(p+"Prof").value = dados.prof || 0;
  document.getElementById(p+"Total").value = dados.total || 0;
});

    

    crimeBase.value = f.pericias.crime.base || 0;
    crimeTreinada.checked = f.pericias.crime.treinada || false;
    crimeProf.value = f.pericias.crime.prof || 0;
    crimeTotal.value = f.pericias.crime.total || 0;


    

    pv.value = f.pv || 0;
    sanidade.value = f.sanidade || 0;
    xp.value = f.xp || 0;

    resistencia.value = f.resistencia || "";
    origem.value = f.origem || "";
    raca.value = f.raca || "";
    anotacoes.value = f.anotacoes || "";

    inventario.value = f.inventario || "";
    armas.value = f.armas || "";
}


function removerFicha() {
    if (fichaAtual === null) return;

    fichas.splice(fichaAtual, 1);
    localStorage.setItem("fichas", JSON.stringify(fichas));
    fichaAtual = null;
    limparCampos();
    atualizarLista();
}

function limparCampos() {
    document.querySelectorAll("input, textarea").forEach(el => {
        if (el.type === "checkbox") el.checked = false;
        else el.value = "";
    });
}

function calcular(base, treinada, prof, total) {
  const b = Number(document.getElementById(base).value) || 0;
  const t = document.getElementById(treinada).checked;
  const p = Number(document.getElementById(prof).value);
  document.getElementById(total).value = t ? b + p : b;
}

const pericias = [
   "acrobacia",
  "mira",
  "atletismo",
  "luta",
  "sobrevivencia",
  "engano",
  "percepcao",
  "pilotagem",
  "intimidacao",
  "historia",
  "investigacao",
  "medicina",
  "persuasao",
  "religiao",
  "manipulacao",
  "iniciativa",
    "crime",
    "adestramento",
    "diplomacia",
    "furtividade",
  "tecnologia",
  "reflexos",
];

pericias.forEach(p => {
  ["Base","Treinada","Prof"].forEach(s => {
    document.getElementById(p+s)
      .addEventListener("input", () =>
        calcular(p+"Base", p+"Treinada", p+"Prof", p+"Total")
      );
  });
});

function exportarFicha() {
  const data = JSON.stringify(fichas, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "ficha-rpg.json";
  link.click();
}

function importarFicha(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    fichas = JSON.parse(e.target.result);
    localStorage.setItem("fichas", JSON.stringify(fichas));
    atualizarLista();
  };
  reader.readAsText(file);
}



atualizarLista();
