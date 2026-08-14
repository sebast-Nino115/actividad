const $ = (s) => document.querySelector(s);

const els = {
  home: $("#homeScreen"),
  transition: $("#transitionScreen"),
  partial: $("#partialResultScreen"),
  playerInput: $("#playerNameInput"),
  playerLabel: $("#playerLabel"),
  begin: $("#beginGameButton"),
  continueButton: $("#continueButton"),
  transitionTitle: $("#transitionTitle"),
  transitionScore: $("#transitionScore"),
  transitionTotal: $("#transitionTotal"),
  transitionCopy: $("#transitionCopy"),
  hudLevelScore: $("#hudLevelScore"),
  hudTotalScore: $("#hudTotalScore"),
  hudLevel: $("#hudLevel"),
  levelEyebrow: $("#levelEyebrow"),
  levelTitle: $("#levelTitle"),
  levelDescription: $("#levelDescription"),
  track1: $("#track1"), track2: $("#track2"), track3: $("#track3"), track4: $("#track4"), track5: $("#track5"),
  level1View: $("#level1View"), level1Intro: $("#level1Intro"), level1Play: $("#level1Play"),
  l1Start: $("#startLevel1Button"), l1Timer: $("#l1Timer"), l1Combo: $("#l1Combo"),
  l1Toast: $("#l1Toast"), l1ToastMessage: $("#l1ToastMessage"),
  level2View: $("#level2View"), level2Intro: $("#level2Intro"), level2Play: $("#level2Play"),
  l2Start: $("#startLevel2Button"), l2Counter: $("#l2Counter"), l2Timer: $("#l2Timer"),
  l2Question: $("#l2Question"), l2Answers: $("#l2Answers"), l2Feedback: $("#l2Feedback"),
  l2FeedbackKicker: $("#l2FeedbackKicker"), l2FeedbackTitle: $("#l2FeedbackTitle"),
  l2FeedbackText: $("#l2FeedbackText"), l2Next: $("#l2NextButton"),
  level3View: $("#level3View"), level3Intro: $("#level3Intro"), level3Play: $("#level3Play"),
  l3Start: $("#startLevel3Button"), l3Progress: $("#l3Progress"), l3WordLength: $("#l3WordLength"),
  l3ClueNumber: $("#l3ClueNumber"), l3Clue: $("#l3Clue"), l3Cells: $("#l3Cells"),
  l3Keyboard: $("#l3Keyboard"), l3Hint: $("#l3HintButton"), l3Check: $("#l3CheckButton"),
  l3HintBox: $("#l3HintBox"), l3HintModal: $("#l3HintModal"), l3HintModalText: $("#l3HintModalText"), l3HintModalLabel: $("#l3HintModalLabel"),
  partialTotal: $("#partialTotal"), partialL1: $("#partialL1"), partialL2: $("#partialL2"), partialL3: $("#partialL3"),
  savePartial: $("#savePartialButton"),
  level4View: $("#level4View"), level4Intro: $("#level4Intro"), level4Play: $("#level4Play"),
  l4Start: $("#startLevel4Button"), l4Counter: $("#l4Counter"), l4Category: $("#l4Category"),
  l4Question: $("#l4Question"), l4Options: $("#l4Options"), l4Feedback: $("#l4Feedback"),
  l4FeedbackKicker: $("#l4FeedbackKicker"), l4FeedbackTitle: $("#l4FeedbackTitle"),
  l4FeedbackText: $("#l4FeedbackText"), l4FeedbackPoints: $("#l4FeedbackPoints"),
  l4Next: $("#l4NextButton"), l4SyncBar: $("#l4SyncBar"), l4SyncLabel: $("#l4SyncLabel"),
  heartLayer: $("#heartLayer"), partialL4: $("#partialL4"),
  level5View: $("#level5View"), level5Intro: $("#level5Intro"), level5Play: $("#level5Play"),
  l5Start: $("#startLevel5Button"), l5MissionLabel: $("#l5MissionLabel"),
  l5CodeDisplay: $("#l5CodeDisplay"), l5Mission: $("#l5Mission"), vaultParticles: $("#vaultParticles"),
  finalResult: $("#finalResultScreen"), finalPlayerName: $("#finalPlayerName"),
  finalGrandTotal: $("#finalGrandTotal"), finalL1: $("#finalL1"), finalL2: $("#finalL2"),
  finalL3: $("#finalL3"), finalL4: $("#finalL4"), finalL5: $("#finalL5")
};

const GAME = {
  player: "",
  currentLevel: 0,
  levelScores: {1:0, 2:0, 3:0, 4:0, 5:0},
  total: 0
};

function formatScore(v){ return String(Math.max(0,Math.round(v))).padStart(4,"0"); }
function recalcTotal(){ GAME.total = GAME.levelScores[1]+GAME.levelScores[2]+GAME.levelScores[3]+GAME.levelScores[4]+GAME.levelScores[5]; updateHud(); }
function updateHud(){
  els.hudLevelScore.textContent = formatScore(GAME.currentLevel ? GAME.levelScores[GAME.currentLevel] : 0);
  els.hudTotalScore.textContent = formatScore(GAME.total);
  els.hudLevel.textContent = `${String(GAME.currentLevel).padStart(2,"0")}/05`;
}
function hideAll(){
  [els.home,els.transition,els.partial,els.finalResult].forEach(x=>x.classList.remove("active"));
  [els.level1View,els.level2View,els.level3View,els.level4View,els.level5View].forEach(x=>x.hidden=true);
  [els.level1Intro,els.level2Intro,els.level3Intro,els.level4Intro,els.level5Intro].forEach(x=>x.classList.remove("active"));
}
function setTrack(level){
  [els.track1,els.track2,els.track3,els.track4,els.track5].forEach((el,i)=>{
    el.classList.remove("active","done");
    const n=i+1;
    if(n<level) el.classList.add("done");
    if(n===level) el.classList.add("active");
  });
}
function setHeader(level){
  const headers = {
    1:["NIVEL 01 / 05","Atrapa lo bueno.","Atrapa lo bueno, evita los errores y empieza a sumar puntos."],
    2:["NIVEL 02 / 05","¿Qué tanto nos conoces?","Cinco preguntas sobre nosotros. Aquí sí importa prestar atención."],
    3:["NIVEL 03 / 05","Palabras que veo en ti.","Cinco palabras bonitas que describen cómo te veo."],
    4:["NIVEL 04 / 05","¿Hacemos match?","Seis decisiones. Veamos qué tan sincronizados estamos."],
    5:["NIVEL 05 / 05","La caja fuerte.","Cuatro retos esconden un código que significa mucho más de lo que parece."]
  };
  const [e,t,d]=headers[level];
  els.levelEyebrow.textContent=e; els.levelTitle.textContent=t; els.levelDescription.textContent=d;
}
function showLevel(level){
  hideAll(); GAME.currentLevel=level;
  if(level===3){
    els.level3Intro.style.display="";
    els.level3Play.hidden=true;
  } setTrack(level); setHeader(level); updateHud();
  const view = level===1?els.level1View:level===2?els.level2View:level===3?els.level3View:level===4?els.level4View:els.level5View;
  const intro = level===1?els.level1Intro:level===2?els.level2Intro:level===3?els.level3Intro:level===4?els.level4Intro:els.level5Intro;
  view.hidden=false; intro.classList.add("active");
}
function showTransition(level, copy){
  hideAll();
  els.transitionTitle.textContent = `Nivel ${String(level).padStart(2,"0")} completado.`;
  els.transitionScore.textContent = formatScore(GAME.levelScores[level]);
  els.transitionTotal.textContent = formatScore(GAME.total);
  els.transitionCopy.textContent = copy;
  els.transition.dataset.next = String(level+1);
  els.transition.classList.add("active");
}
els.begin.addEventListener("click",()=>{
  GAME.player=els.playerInput.value.trim()||"JUGADOR";
  localStorage.setItem("coupleChallenge.playerName", GAME.player);
  els.playerLabel.textContent=`JUGADOR — ${GAME.player.toUpperCase()}`;
  showLevel(1);
});

// Recupera el nombre si ya había iniciado una partida anteriormente.
const savedPlayerName = localStorage.getItem("coupleChallenge.playerName");
if(savedPlayerName){
  els.playerInput.value = savedPlayerName;
  GAME.player = savedPlayerName;
  els.playerLabel.textContent=`JUGADOR — ${GAME.player.toUpperCase()}`;
}
els.continueButton.addEventListener("click",()=>{
  const next=Number(els.transition.dataset.next);
  if(next<=5) showLevel(next); else showPartial();
});

/* LEVEL 1 */
const L1_ITEMS=[
  {kind:"love",points:100,w:29,good:true},{kind:"kiss",points:150,w:20,good:true},
  {kind:"hug",points:200,w:15,good:true},{kind:"rare",points:500,w:6,good:true,rare:true},
  {kind:"bug",points:-150,w:16,good:false},{kind:"break",points:-250,w:14,good:false}
];
const L1_MESSAGES=[
  "Encontré a mi persona favorita.",
  "Contigo hasta los días normales tienen algo especial.",
  "Un abrazo tuyo vale más que cualquier power-up.",
  "Achievement unlocked: me encanta hacer equipo contigo.",
  "De todas las coincidencias, tú eres mi favorita.",
  "Rare item found: una sonrisa tuya.",
  "Lo mejor de este juego es tenerte en mi team.",
  "No todo tiene que estar perfecto para que estemos juntos."
];
let l1={score:0,time:30,combo:1,running:false},l1TimerId=null,l1SpawnId=null,l1ToastId=null;
function l1Weighted(){
  const total=L1_ITEMS.reduce((s,x)=>s+x.w,0); let p=Math.random()*total;
  for(const x of L1_ITEMS){p-=x.w;if(p<=0)return x;} return L1_ITEMS[0];
}
function l1Update(){GAME.levelScores[1]=l1.score;recalcTotal();els.l1Timer.textContent=l1.time;els.l1Combo.textContent=`x${l1.combo}`;}
function l1Spawn(){
  if(!l1.running)return;
  const item=l1Weighted(), token=document.createElement("button");
  token.className="game-token";token.dataset.kind=item.kind;token.type="button";
  const stage=els.level1Play, size=64;
  token.style.left=`${12+Math.random()*Math.max(20,stage.clientWidth-size-24)}px`;
  token.style.top=`${55+Math.random()*Math.max(50,stage.clientHeight-size-70)}px`;
  stage.appendChild(token);
  const life=l1.time<=8?650:l1.time<=18?850:1100;
  const expiry=setTimeout(()=>{if(token.isConnected){token.remove();if(item.good){l1.combo=1;l1Update();}}},life);
  token.addEventListener("pointerdown",(e)=>{
    e.preventDefault(); if(!l1.running||!token.isConnected)return; clearTimeout(expiry);
    let earned=item.points;
    if(item.good){earned*=l1.combo;l1.combo=Math.min(5,l1.combo+1);token.classList.add("hit-good");}
    else{l1.combo=1;token.classList.add("hit-bad");}
    if(item.rare){els.l1ToastMessage.textContent=L1_MESSAGES[Math.floor(Math.random()*L1_MESSAGES.length)];els.l1Toast.classList.add("show");clearTimeout(l1ToastId);l1ToastId=setTimeout(()=>els.l1Toast.classList.remove("show"),1500);}
    l1.score=Math.max(0,l1.score+earned);l1Update();
    const f=document.createElement("span");f.className=`score-float ${earned>=0?"good":"bad"}`;f.textContent=`${earned>0?"+":""}${earned}`;f.style.left=token.style.left;f.style.top=token.style.top;stage.appendChild(f);setTimeout(()=>f.remove(),700);setTimeout(()=>token.remove(),220);
  },{once:true});
}
els.l1Start.addEventListener("click",()=>{
  els.level1Intro.classList.remove("active");els.level1Play.hidden=false;
  l1={score:0,time:30,combo:1,running:true};l1Update();l1Spawn();
  l1SpawnId=setInterval(l1Spawn,560);l1TimerId=setInterval(()=>{l1.time--;l1Update();if(l1.time<=0)l1Finish();},1000);
});
function l1Finish(){
  l1.running=false;clearInterval(l1TimerId);clearInterval(l1SpawnId);
  els.level1Play.querySelectorAll(".game-token,.score-float").forEach(n=>n.remove());
  GAME.levelScores[1]=l1.score;recalcTotal();saveProgress();
  showTransition(1,"Buen comienzo. Ahora viene la parte en la que ya no bastan los reflejos.");
}

/* LEVEL 2 */
const QUESTIONS=[
  {q:"Cuando Sebastián está bravo, ¿qué suele hacer?",a:["Se queda callado","Habla muchísimo","Se pone a discutir","Actúa como si nada"],c:0,ok:"Sí. El silencio dice bastante.",fail:"Esta sí era básica."},
  {q:"¿Quién es el más mimado de los dos?",a:["Sebastián","Tú","Los dos por igual","Depende de quién quiera algo"],c:1,ok:"Correcto. Caso cerrado.",fail:"Respuesta bajo revisión por el comité de mimos."},
  {q:"Por hoy… ¿quién ama más a quién?",a:["Sebastián a ti","Tú a Sebastián","Empate técnico","Pregunta impugnada"],c:1,ok:"Hoy te dejo ganar también esa.",fail:"Respuesta rechazada. Hoy te toca amar más a ti."},
  {q:"Si uno de los dos necesita cariño, ¿qué probablemente termina pasando?",a:["Cada uno sigue en lo suyo","Se manda un mensaje y ya","Termina recibiendo mimos del otro","Se abre un ticket de soporte"],c:2,ok:"Exacto. Ese protocolo sí funciona.",fail:"No. Aquí el soporte sí incluye cariño."},
  {q:"¿Qué somos cuando las cosas no están tan fáciles?",a:["Dos personas resolviendo por separado","Un desastre","Un equipo","Depende del día"],c:2,ok:"Sí. Esa era la importante.",fail:"La respuesta que quiero cuidar: seguimos siendo equipo."}
];
let l2={i:0,score:0,streak:0,time:15,answered:false},l2TimerId=null;
els.l2Start.addEventListener("click",()=>{els.level2Intro.classList.remove("active");els.level2Play.hidden=false;l2={i:0,score:0,streak:0,time:15,answered:false};l2Render();});
function l2Render(){
  clearInterval(l2TimerId);l2.answered=false;l2.time=15;els.l2Feedback.classList.remove("show");
  const q=QUESTIONS[l2.i];els.l2Counter.textContent=`${String(l2.i+1).padStart(2,"0")} / 05`;els.l2Question.textContent=q.q;els.l2Answers.innerHTML="";
  q.a.forEach((txt,idx)=>{const b=document.createElement("button");b.className="answer";b.type="button";b.innerHTML=`<span class="answer-index">${String.fromCharCode(65+idx)}</span><span class="answer-text">${txt}</span>`;b.onclick=()=>l2Choose(idx);els.l2Answers.appendChild(b);});
  const start=performance.now();l2TimerId=setInterval(()=>{l2.time=Math.max(0,15-(performance.now()-start)/1000);els.l2Timer.textContent=`${l2.time.toFixed(1)}s`;if(l2.time<=0){clearInterval(l2TimerId);l2Timeout();}},100);
}
function l2Choose(idx){
  if(l2.answered)return;l2.answered=true;clearInterval(l2TimerId);const q=QUESTIONS[l2.i],buttons=[...els.l2Answers.children],correct=idx===q.c;
  buttons.forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add("correct");else if(i===idx)b.classList.add("wrong");else b.classList.add("dimmed");});
  if(correct){const speed=Math.round((l2.time/15)*300);l2.streak++;const streakBonus=Math.max(0,(l2.streak-1)*100),earned=500+speed+streakBonus;l2.score+=earned;l2Feedback("CORRECTO",`+${earned} points`,`${q.ok} Speed +${speed}${streakBonus?` · Streak +${streakBonus}`:""}`);}
  else{l2.streak=0;l2Feedback("ESA NO","Sin puntos",q.fail);}
  GAME.levelScores[2]=l2.score;recalcTotal();
}
function l2Timeout(){
  if(l2.answered)return;l2.answered=true;l2.streak=0;const q=QUESTIONS[l2.i],[...btns]=[...els.l2Answers.children];
  btns.forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add("correct");else b.classList.add("dimmed");});l2Feedback("SE ACABÓ EL TIEMPO","Se acabó el tiempo",`La correcta era: ${q.a[q.c]}`);
}
function l2Feedback(k,t,txt){els.l2FeedbackKicker.textContent=k;els.l2FeedbackTitle.textContent=t;els.l2FeedbackText.textContent=txt;els.l2Next.textContent=l2.i===4?"Ver puntuación":"Siguiente pregunta";els.l2Feedback.classList.add("show");}
els.l2Next.addEventListener("click",()=>{if(l2.i===4){GAME.levelScores[2]=l2.score;recalcTotal();saveProgress();showTransition(2,"Bien. Ya demostramos cuánto prestas atención. Ahora toca descubrir palabras que significan algo.");}else{l2.i++;l2Render();}});

/* LEVEL 3 */
const WORDS=[
  {
    word:"FUERTE",
    clue:"Hay momentos que te golpean, te cansan o te ponen a prueba, pero aun así sigues adelante. Para mí, eso demuestra lo ___ que eres.",
    hints:["Empieza por F y termina en E.","Se escribe así: F U _ R T E"]
  },
  {
    word:"TIERNO",
    clue:"Aunque a veces quieras hacerte el serio, conmigo tienes una forma muy dulce de dar cariño. Eso demuestra lo ___ que puedes ser.",
    hints:["Empieza por T y termina en O.","Se escribe así: T I E _ N O"]
  },
  {
    word:"DULCE",
    clue:"Tienes una forma de tratarme y darme cariño que, incluso en cosas pequeñas, demuestra lo ___ que puedes ser conmigo.",
    hints:["Empieza por D y termina en E.","Se escribe así: D U _ C E."]
  },
  {
    word:"MIMADO",
    clue:"Hay uno de los dos que recibe bastante cariño, consentimiento y atención… y ambos sabemos que eres el más ___.",
    hints:["Empieza por MI y termina en DO.","Se escribe así: M I M A _ O"]
  },
];

const LETTERS="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
let l3={i:0,score:0,input:"",hintUsed:false,hintStage:0,errors:0};
let l3ModalTimer=null;

function l3ShowModal(message,label="PISTA"){
  clearTimeout(l3ModalTimer);

  if(!els.l3HintModal || !els.l3HintModalLabel || !els.l3HintModalText){
    console.error("Modal de pistas del Nivel 3 no disponible.");
    return;
  }

  els.l3HintModalLabel.textContent=label;
  els.l3HintModalText.textContent=message;
  els.l3HintModal.classList.add("show");
  els.l3HintModal.setAttribute("aria-hidden","false");

  // La ventana desaparece automáticamente después de 4 segundos.
  l3ModalTimer=setTimeout(()=>{
    l3HideModal();
  },4000);
}

function l3HideModal(){
  clearTimeout(l3ModalTimer);

  if(!els.l3HintModal) return;

  els.l3HintModal.classList.remove("show");
  els.l3HintModal.setAttribute("aria-hidden","true");
}

if (els.l3HintModal) {
  els.l3HintModal.addEventListener("click",(event)=>{
    if(event.target===els.l3HintModal) l3HideModal();
  });
}

els.l3Start.addEventListener("click",()=>{
  els.level3Intro.classList.remove("active");
  els.level3Intro.style.display="none";
  els.level3Play.hidden=false;
  l3={i:0,score:0,input:"",hintUsed:false,hintStage:0,errors:0};
  l3Render();
});

function l3Render(){
  const item=WORDS[l3.i];

  l3.input="";
  l3.hintUsed=false;
  l3.hintStage=0;

  els.l3Hint.textContent="Dame una pista";
  els.l3Progress.textContent=`${l3.i+1} / ${WORDS.length}`;
  els.l3WordLength.textContent=`${item.word.length} letras`;
  els.l3ClueNumber.textContent=String(l3.i+1).padStart(2,"0");
  els.l3Clue.textContent=item.clue;

  renderCells();
  renderKeyboard();
}

function renderCells(){
  const word=WORDS[l3.i].word;
  els.l3Cells.innerHTML="";

  for(let i=0;i<word.length;i++){
    const c=document.createElement("div");
    c.className="word-cell";

    if(l3.input[i]){
      c.textContent=l3.input[i];
      c.classList.add("filled");
    }

    els.l3Cells.appendChild(c);
  }
}

function renderKeyboard(){
  els.l3Keyboard.innerHTML="";

  [...LETTERS].forEach(letter=>{
    const b=document.createElement("button");
    b.className="key";
    b.type="button";
    b.textContent=letter;

    b.addEventListener("click",()=>{
      if(l3.input.length<WORDS[l3.i].word.length){
        l3.input+=letter;
        renderCells();
      }
    });

    els.l3Keyboard.appendChild(b);
  });

  const del=document.createElement("button");
  del.className="key special-key";
  del.type="button";
  del.textContent="⌫";
  del.setAttribute("aria-label","Borrar letra");
  del.addEventListener("click",()=>{
    l3.input=l3.input.slice(0,-1);
    renderCells();
  });

  els.l3Keyboard.appendChild(del);
}

els.l3Hint.addEventListener("click",()=>{
  const item=WORDS[l3.i];

  if(l3.hintStage>=item.hints.length){
    l3ShowModal("Ya te di todas las pistas disponibles 👀");
    return;
  }

  l3.hintStage+=1;
  l3.hintUsed=true;
  l3.score=Math.max(0,l3.score-100);

  GAME.levelScores[3]=l3.score;
  recalcTotal();

  l3ShowModal(`Pista ${l3.hintStage}: ${item.hints[l3.hintStage-1]}`);

  els.l3Hint.textContent =
    l3.hintStage<item.hints.length ? "Otra pista" : "Sin más pistas";
});

els.l3Check.addEventListener("click",()=>{
  const target=WORDS[l3.i].word;

  if(l3.input.length!==target.length){
    l3ShowModal("Completa todas las letras antes de comprobar.","OJO");
    return;
  }

  if(l3.input===target){
    const gained=700+(l3.hintUsed?0:200);
    l3.score+=gained;

    GAME.levelScores[3]=l3.score;
    recalcTotal();

    [...els.l3Cells.children].forEach(c=>c.classList.add("correct"));

    l3ShowModal(`¡Correcto! +${gained} puntos.`,"PALABRA ENCONTRADA");

    setTimeout(()=>{
      if(l3.i===WORDS.length-1){
        saveProgress();
        showTransition(3,"Tres niveles completados. El marcador ya empieza a ponerse interesante.");
        els.transition.dataset.next="4";
      }else{
        l3.i++;
        l3Render();
      }
    },900);

  }else{
    l3.errors++;
    l3.score=Math.max(0,l3.score-50);

    GAME.levelScores[3]=l3.score;
    recalcTotal();

    l3ShowModal("Todavía no es esa. Inténtalo otra vez. -50 puntos.","CASI");
  }
});

/* LEVEL 4 — MATCH */
const MATCHES=[
  {
    category:"PLAN JUNTOS",
    q:"Tenemos todo un día libre solo para nosotros. ¿Qué preferirías?",
    a:[
      "Quedarnos en casa, cocinar algo juntos, molestar y terminar viendo algo abrazados.",
      "Salir sin demasiado plan y descubrir algún lugar o hacer algo diferente."
    ],
    sebastian:0
  },
  {
    category:"DESPUÉS DE DISCUTIR",
    q:"Cuando ya bajó un poco el enojo, ¿qué preferirías?",
    a:[
      "Hablar de una vez hasta solucionar lo que pasó.",
      "Acercarnos primero, bajar la tensión y después hablar con calma."
    ],
    sebastian:1
  },
  {
    category:"UN DÍA DIFÍCIL",
    q:"Si uno de los dos está teniendo un día horrible, ¿qué debería hacer el otro?",
    a:[
      "Darle su espacio y esperar a que quiera hablar.",
      "Estar pendiente, darle cariño y acompañarlo aunque no pueda solucionar lo que pasa."
    ],
    sebastian:1
  },
  {
    category:"NUESTROS MOMENTOS",
    q:"Si pudiéramos repetir una sola clase de momento juntos, ¿cuál escogerías?",
    a:[
      "Uno de esos momentos en los que nos reímos por cualquier bobada y terminamos molestándonos.",
      "Una de esas conversaciones largas donde terminamos hablando de nosotros, del futuro y de todo."
    ],
    sebastian:0
  },
  {
    category:"VIAJE SORPRESA",
    q:"Nos ganamos un viaje para mañana. Solo podemos escoger el tipo de plan.",
    a:[
      "Un lugar tranquilo, bonito, para descansar y estar juntos.",
      "Un lugar con cosas nuevas por hacer, conocer y explorar juntos."
    ],
    sebastian:0
  },
  {
    category:"LO QUE QUIERO CUIDAR",
    q:"Si tuvieras que escoger UNA cosa que nunca debería faltarnos, ¿cuál sería?",
    a:[
      "Seguir eligiéndonos incluso cuando las cosas no sean fáciles.",
      "Seguir sintiendo que somos un equipo incluso cuando pensemos diferente."
    ],
    sebastian:0
  }
];

let l4={i:0,score:0,matches:0,answered:false};
let heartInterval=null;

function startHeartRain(){
  stopHeartRain();
  heartInterval=setInterval(()=>{
    if(els.level4View.hidden) return;
    const heart=document.createElement("span");
    heart.className="floating-heart";
    heart.textContent=Math.random()>.22?"♥":"♡";
    heart.style.left=`${4+Math.random()*92}%`;
    heart.style.animationDuration=`${3.6+Math.random()*2.2}s`;
    heart.style.fontSize=`${10+Math.random()*10}px`;
    els.heartLayer.appendChild(heart);
    setTimeout(()=>heart.remove(),6500);
  },430);
}
function stopHeartRain(){
  clearInterval(heartInterval);
  heartInterval=null;
  els.heartLayer.querySelectorAll(".floating-heart").forEach(h=>h.remove());
}
function l4Burst(){
  for(let i=0;i<14;i++){
    const h=document.createElement("span");
    h.className="heart-burst";
    h.textContent=i%3===0?"♡":"♥";
    h.style.left="50%";
    h.style.top="48%";
    h.style.setProperty("--x",`${(Math.random()-.5)*220}px`);
    h.style.setProperty("--y",`${(Math.random()-.75)*180}px`);
    els.level4Play.appendChild(h);
    setTimeout(()=>h.remove(),900);
  }
}
els.l4Start.addEventListener("click",()=>{
  els.level4Intro.classList.remove("active");
  els.level4Play.hidden=false;
  l4={i:0,score:0,matches:0,answered:false};
  startHeartRain();
  l4Render();
});
function l4Render(){
  l4.answered=false;
  els.l4Feedback.classList.remove("show");
  const item=MATCHES[l4.i];
  els.l4Counter.textContent=`${String(l4.i+1).padStart(2,"0")} / 06`;
  els.l4Category.textContent=item.category;
  els.l4Question.textContent=item.q;
  els.l4Options.innerHTML="";
  item.a.forEach((txt,idx)=>{
    const b=document.createElement("button");
    b.type="button";
    b.className="match-option";
    b.innerHTML=`<span class="option-letter">${idx===0?"A":"B"}</span><p>${txt}</p>`;
    b.addEventListener("click",()=>l4Choose(idx));
    els.l4Options.appendChild(b);
  });
  l4UpdateSync();
}
function l4UpdateSync(){
  const completed=l4.i + (l4.answered?1:0);
  const pct=completed?Math.round((l4.matches/completed)*100):0;
  els.l4SyncBar.style.width=`${pct}%`;
  els.l4SyncLabel.textContent=`${pct}% sincronía`;
}
function l4Choose(choice){
  if(l4.answered)return;
  l4.answered=true;
  const item=MATCHES[l4.i];
  const buttons=[...els.l4Options.children];
  buttons.forEach(b=>b.disabled=true);
  buttons[choice].classList.add("selected");

  const isMatch=choice===item.sebastian;
  if(isMatch){
    l4.matches++;
    l4.score+=600;
    buttons[choice].classList.add("match");
    els.l4FeedbackKicker.textContent="MATCH ♥";
    els.l4FeedbackTitle.textContent="Pensamos igual.";
    els.l4FeedbackText.textContent="Sebastián también escogió esa opción.";
    els.l4FeedbackPoints.textContent="+600 puntos";
    l4Burst();
  }else{
    l4.score+=250;
    buttons[item.sebastian].classList.add("match");
    els.l4FeedbackKicker.textContent="NO MATCH 👀";
    els.l4FeedbackTitle.textContent="Esta vez pensamos diferente.";
    els.l4FeedbackText.textContent=`Sebastián habría escogido la opción ${item.sebastian===0?"A":"B"}. Igual sumas porque descubrirnos también cuenta.`;
    els.l4FeedbackPoints.textContent="+250 puntos";
  }

  GAME.levelScores[4]=l4.score;
  recalcTotal();
  l4UpdateSync();
  els.l4Next.textContent=l4.i===MATCHES.length-1?"Ver resultado":"Siguiente";
  els.l4Feedback.classList.add("show");
}
els.l4Next.addEventListener("click",()=>{
  if(l4.i===MATCHES.length-1){
    stopHeartRain();
    GAME.levelScores[4]=l4.score;
    recalcTotal();
    saveProgress();
    const pct=Math.round((l4.matches/MATCHES.length)*100);
    showTransition(
      4,
      `Sincronía: ${pct}%. ${l4.matches} de ${MATCHES.length} respuestas coincidieron. Solo queda el nivel final.`
    );
    els.transition.dataset.next="5";
  }else{
    l4.i++;
    l4Render();
  }
});


/* LEVEL 5 — LA CAJA FUERTE
   Código final: 2603.
   Cada reto revela automáticamente un dígito y lo coloca arriba.
*/
const VAULT_CODE=["2","6","0","3"];
let l5={mission:0,score:0,revealed:[],busy:false};

function l5UpdateCode(){
  [...els.l5CodeDisplay.children].forEach((cell,i)=>{
    if(l5.revealed[i]!==undefined){
      cell.textContent=l5.revealed[i];
      cell.classList.add("unlocked");
    }else{
      cell.textContent="_";
      cell.classList.remove("unlocked");
    }
  });
}
function vaultBurst(){
  for(let i=0;i<20;i++){
    const s=document.createElement("span");
    s.className="vault-particle";
    s.textContent=i%3===0?"♥":"✦";
    s.style.left="50%"; s.style.top="50%";
    s.style.setProperty("--x",`${(Math.random()-.5)*280}px`);
    s.style.setProperty("--y",`${(Math.random()-.5)*300}px`);
    els.vaultParticles.appendChild(s);
    setTimeout(()=>s.remove(),1000);
  }
}
els.l5Start.addEventListener("click",()=>{
  els.level5Intro.classList.remove("active");
  els.level5Play.hidden=false;
  l5={mission:0,score:0,revealed:[],busy:false};
  l5UpdateCode();
  l5RenderMission();
});
function l5Heading(kicker,title,copy){
  return `<div class="mission-heading"><span>${kicker}</span><h2>${title}</h2><p>${copy}</p></div>`;
}
function l5RenderMission(){
  els.l5MissionLabel.textContent=`RETO ${l5.mission+1} / 4`;
  if(l5.mission===0) missionHeart();
  else if(l5.mission===1) missionSimon();
  else if(l5.mission===2) missionMemory();
  else missionKey();
}
function l5RevealDigit(points){
  l5.score+=points;
  GAME.levelScores[5]=l5.score; recalcTotal();
  const digit=VAULT_CODE[l5.mission];
  l5.revealed[l5.mission]=digit;
  l5UpdateCode();
  vaultBurst();
  els.l5Mission.innerHTML=`
    <div class="digit-reveal">
      <span>NÚMERO ENCONTRADO</span>
      <strong>${digit}</strong>
      <p>Ya quedó guardado automáticamente en el código de arriba. No tienes que memorizarlo.</p>
      <button class="vault-button" id="digitContinue">${l5.mission===3?"Abrir caja fuerte":"Siguiente reto"}</button>
    </div>`;
  $("#digitContinue").onclick=()=>{
    if(l5.mission===3){ l5OpenVault(); }
    else { l5.mission++; l5RenderMission(); }
  };
}

/* Reto 1: encontrar único corazón lleno */
function missionHeart(){
  els.l5Mission.innerHTML=l5Heading("RETO 1","Encuentra el corazón","Entre todos los símbolos hay un solo corazón lleno ♥. Encuéntralo.");
  const grid=document.createElement("div");grid.className="symbol-grid";
  const target=Math.floor(Math.random()*20);
  const symbols=["♡","◇","○","✦","×"];
  for(let i=0;i<20;i++){
    const b=document.createElement("button");b.className="symbol-tile";b.type="button";
    if(i===target){b.textContent="♥";b.classList.add("target");b.onclick=()=>l5RevealDigit(700);}
    else {b.textContent=symbols[Math.floor(Math.random()*symbols.length)];b.onclick=()=>{b.style.opacity=".25";l5.score=Math.max(0,l5.score-25);GAME.levelScores[5]=l5.score;recalcTotal();};}
    grid.appendChild(b);
  }
  els.l5Mission.appendChild(grid);
}

/* Reto 2: Simon simple */
function missionSimon(){
  els.l5Mission.innerHTML=l5Heading("RETO 2","Repite la secuencia","Mira con atención. Se iluminarán cuatro posiciones; después repite el mismo orden.");
  const board=document.createElement("div");board.className="simon-board";
  for(let i=0;i<4;i++){const b=document.createElement("button");b.className="simon-pad";b.type="button";b.textContent=i+1;b.disabled=true;board.appendChild(b);}
  els.l5Mission.appendChild(board);
  const status=document.createElement("div");status.className="mission-status";status.textContent="Prepárate…";els.l5Mission.appendChild(status);
  const seq=Array.from({length:4},()=>Math.floor(Math.random()*4));
  let input=[],accept=false;
  setTimeout(async()=>{
    for(const n of seq){
      board.children[n].classList.add("lit");
      await new Promise(r=>setTimeout(r,430));
      board.children[n].classList.remove("lit");
      await new Promise(r=>setTimeout(r,180));
    }
    accept=true; status.textContent="Ahora tú. Repite la secuencia.";
    [...board.children].forEach((b,i)=>{b.disabled=false;b.onclick=()=>{
      if(!accept)return; input.push(i);b.classList.add("lit");setTimeout(()=>b.classList.remove("lit"),150);
      const pos=input.length-1;
      if(input[pos]!==seq[pos]){
        input=[];l5.score=Math.max(0,l5.score-50);GAME.levelScores[5]=l5.score;recalcTotal();
        status.textContent="Casi. Vuelve a intentarlo desde el inicio.";
      }else if(input.length===seq.length){
        accept=false;[...board.children].forEach(x=>x.disabled=true);l5RevealDigit(800);
      }
    };});
  },700);
}

/* Reto 3: memoria */
function missionMemory(){
  els.l5Mission.innerHTML=l5Heading("RETO 3","Encuentra las parejas","Destapa las seis cartas y encuentra las tres parejas.");
  const vals=["♥","♥","✦","✦","∞","∞"].sort(()=>Math.random()-.5);
  const grid=document.createElement("div");grid.className="memory-grid";els.l5Mission.appendChild(grid);
  let open=[],matched=0,locked=false,attempts=0;
  vals.forEach((v,i)=>{
    const b=document.createElement("button");b.className="memory-card";b.type="button";b.textContent=v;
    b.onclick=()=>{
      if(locked||b.classList.contains("matched")||b.classList.contains("open"))return;
      b.classList.add("open");open.push({b,v});
      if(open.length===2){
        attempts++;
        if(open[0].v===open[1].v){
          open.forEach(x=>x.b.classList.add("matched"));open=[];matched++;
          if(matched===3){const bonus=Math.max(450,900-(attempts-3)*75);setTimeout(()=>l5RevealDigit(bonus),400);}
        }else{
          locked=true;setTimeout(()=>{open.forEach(x=>x.b.classList.remove("open"));open=[];locked=false;},650);
        }
      }
    };grid.appendChild(b);
  });
}

/* Reto 4: atrapar llave */
function missionKey(){
  els.l5Mission.innerHTML=l5Heading("RETO 4","Atrapa la llave","La llave no piensa quedarse quieta. Tócala tres veces para desbloquear el último número.");
  const arena=document.createElement("div");arena.className="key-arena";els.l5Mission.appendChild(arena);
  const key=document.createElement("button");key.className="moving-key";key.type="button";key.textContent="🔑";arena.appendChild(key);
  const status=document.createElement("div");status.className="mission-status";status.textContent="Llaves atrapadas: 0 / 3";els.l5Mission.appendChild(status);
  let hits=0;
  const move=()=>{key.style.left=`${8+Math.random()*72}%`;key.style.top=`${8+Math.random()*70}%`;};
  move();let mover=setInterval(move,900);
  key.onclick=()=>{
    hits++;status.textContent=`Llaves atrapadas: ${hits} / 3`;move();
    if(hits>=3){clearInterval(mover);key.disabled=true;l5RevealDigit(900);}
  };
}

/* Apertura y significado de 2603 */
function l5OpenVault(){
  GAME.levelScores[5]=l5.score+1000; recalcTotal(); saveProgress(); vaultBurst();
  els.l5MissionLabel.textContent="CÓDIGO COMPLETO";
  els.l5Mission.innerHTML=`
    <div class="vault-open">
      <div class="open-icon">🔓</div>
      <h2>Caja abierta.</h2>
      <div class="date-code">2603</div>
      <div class="date-label">26 · 03</div>
      <div class="vault-message">
        Este número no está aquí por casualidad.<br><br>
        <strong>26/03</strong> fue el primer día en que me dijiste dónde estaba el aula especial XI.
        Algo tan sencillo hizo que interactuáramos por primera vez… y terminó convirtiéndose en el comienzo de algo que ninguno de los dos podía imaginar todavía. ♥
      </div>
      <button class="vault-button" id="seeFinalResult">Ver mi puntuación final</button>
    </div>`;
  $("#seeFinalResult").onclick=showFinalResult;
}
function showFinalResult(){
  hideAll(); GAME.currentLevel=5; setTrack(6); recalcTotal();
  els.finalPlayerName.textContent=GAME.player.toUpperCase();
  els.finalGrandTotal.textContent=formatScore(GAME.total);
  els.finalL1.textContent=GAME.levelScores[1];
  els.finalL2.textContent=GAME.levelScores[2];
  els.finalL3.textContent=GAME.levelScores[3];
  els.finalL4.textContent=GAME.levelScores[4];
  els.finalL5.textContent=GAME.levelScores[5];
  els.finalResult.classList.add("active");
  localStorage.setItem("coupleChallenge.finalResult",JSON.stringify({
    player:GAME.player, levelScores:GAME.levelScores, total:GAME.total,
    code:"2603", completedAt:new Date().toISOString()
  }));
}

function showPartial(){
  hideAll();
  GAME.currentLevel=4;
  setTrack(5);
  updateHud();
  els.partialTotal.textContent=formatScore(GAME.total);
  els.partialL1.textContent=GAME.levelScores[1];
  els.partialL2.textContent=GAME.levelScores[2];
  els.partialL3.textContent=GAME.levelScores[3];
  els.partialL4.textContent=GAME.levelScores[4];
  els.partial.classList.add("active");
}
function saveProgress(){
  localStorage.setItem("coupleChallenge.playerName", GAME.player); localStorage.setItem("coupleChallenge.progress",JSON.stringify({player:GAME.player,levelScores:GAME.levelScores,total:GAME.total,savedAt:new Date().toISOString()}));
}
els.savePartial.addEventListener("click",()=>{saveProgress();els.savePartial.textContent="Guardado ✓";setTimeout(()=>els.savePartial.textContent="Guardar puntuación",1200);});
