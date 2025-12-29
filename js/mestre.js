const inventario = document.getElementById("inventario");
const armas = document.getElementById("armas");

const portraitInput = document.getElementById("portraitInput");
const portraitPreview = document.getElementById("portraitPreview");

let portraitData = "";


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
  xpTotal = 0;
  atualizarXP();
}

portraitInput.addEventListener("change", () => {
  const file = portraitInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    portraitData = e.target.result;
    portraitPreview.src = portraitData;
  };
  reader.readAsDataURL(file);
});


function removerPortrait() {
  portraitData = "";
  portraitPreview.src = "";
  portraitInput.value = ""; 
}




function salvarFicha() {
  const ficha = {
    nome: nome.value,
    jogador: jogador.value,

    portrait: portraitData,

    atributos: {
      forca: forca.value,
      destreza: destreza.value,
      constituicao: constituicao.value,
      inteligencia: inteligencia.value,
      sabedoria: sabedoria.value,
      carisma: carisma.value
    },

    xp: {
      total: xpTotal
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
    portraitData = f.portrait || "";
portraitPreview.src = portraitData;
    if (!f.xp) f.xp = { total: 0 };

    xpTotal = f.xp.total;
    atualizarXP();



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

    resistencia.value = f.resistencia || "";
    origem.value = f.origem || "";
    raca.value = f.raca || "";
    anotacoes.value = f.anotacoes || "";

    inventario.value = f.inventario || "";
    armas.value = f.armas || "";
}

let xpTotal = 0;
let nivel = 1;

const niveisXP = [
  { nivel: 1, min: 0, max: 300 },
  { nivel: 2, min: 300, max: 900 },
  { nivel: 3, min: 900, max: 2700 },
  { nivel: 4, min: 2700, max: 6200 }
];

function calcularNivel() {
  for (let i = niveisXP.length - 1; i >= 0; i--) {
    if (xpTotal >= niveisXP[i].min) {
      return niveisXP[i].nivel;
    }
  }
  return 1;
}

function atualizarXP() {
  const nivelAnterior = nivel;
  nivel = calcularNivel();

  const infoNivel = niveisXP.find(n => n.nivel === nivel);
  const progressoAtual = xpTotal - infoNivel.min;
  const progressoMax = infoNivel.max - infoNivel.min;

  const porcentagem = Math.min((progressoAtual / progressoMax) * 100, 100);

  document.getElementById("xpAtual").innerText = xpTotal;
  document.getElementById("nivelAtual").innerText = nivel;
  document.getElementById("xpBar").style.width = porcentagem + "%";

  const aviso = document.getElementById("xpAviso");

  if (nivel > nivelAnterior) {
    const bar = document.getElementById("xpBar");
    bar.classList.add("level-up");

    setTimeout(() => bar.classList.remove("level-up"), 2000);

    aviso.innerText = `Nível ${nivel} alcançado!`;
  } else if (nivel === 4) {
    aviso.innerText = "Nível máximo atingido.";
  } else {
    aviso.innerText = "";
  }

   if (fichaAtual !== null) {
    fichas[fichaAtual].xp.total = xpTotal;
    localStorage.setItem("fichas", JSON.stringify(fichas));
  }
}


function adicionarXP() {
  const valor = Number(document.getElementById("xpInput").value);
  if (!valor || valor <= 0) return;

  xpTotal += valor;
  if (xpTotal > 6200) xpTotal = 6200;

  document.getElementById("xpInput").value = "";
  atualizarXP();
}

function removerXP() {
  const valor = Number(document.getElementById("xpRemoverInput").value);
  if (!valor || valor <= 0) return;

  xpTotal -= valor;
  if (xpTotal < 0) xpTotal = 0;

  document.getElementById("xpRemoverInput").value = "";

  const bar = document.getElementById("xpBar");
  bar.classList.add("loss");
  setTimeout(() => bar.classList.remove("loss"), 1200);

  atualizarXP();
}


function salvarXP() {
  localStorage.setItem("xpFicha", JSON.stringify({ xpTotal }));
}

function carregarXP() {
  const dados = JSON.parse(localStorage.getItem("xpFicha"));
  if (!dados) return;

  xpTotal = dados.xpTotal || 0;
  atualizarXP();
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
      portraitData = "";
portraitPreview.src = "";
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
