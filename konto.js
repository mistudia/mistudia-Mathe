// ============================================================
// konto.js – VocabBoss-Konto in der Mathe-App (9 Sprachen)
// ------------------------------------------------------------
// Wer die Mathe-App mit dem Code aus VocabBoss koppelt (Menü „Mathe-App
// koppeln“, klappt auch für Gäste) oder sich mit dem VocabBoss-Konto
// (E-Mail + Passwort, gleiches Supabase-Projekt) anmeldet, bekommt in VocabBoss für jeden Tag, an dem
// er hier mindestens eine Aufgabe richtig löst, eine Dogdex-Karte.
// Server: vocabboss/math_dogdex.sql (math_mark_solved / math_my_days),
// abgeholt wird in VocabBoss (mathBonus.js).
//
// - Startseite: MS_KONTO.box(container, lang) zeigt Anmeldung bzw. Stand.
// - Jede Unter-App (geladen über home-button.js): erkennt richtige
//   Antworten an den Rückmeldungen (Klassen „gut“, „u-ok“, „richtig“ …,
//   nur direkt nach einer Eingabe und nicht zusammen mit „falsch“).
//   Apps ohne solche Klassen rufen window.msRichtig() selbst auf.
// - Die Supabase-Bibliothek wird nur geladen, wenn sie gebraucht wird.
// ============================================================
(function(){
  if(window.MS_KONTO) return;
  var URL_ = "https://bquxcyjcybpfwujtovng.supabase.co", KEY = "sb_publishable_OyNRNaYaf3EqrY9fHoKHrA_mmR1Lby_";
  var LIB = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  var TOKEN = "sb-bquxcyjcybpfwujtovng-auth-token";
  var VB = "https://vocabboss.com";
  var T = {
    de: { titel: "Dogdex-Karten sammeln", info: "Melde dich mit deinem VocabBoss-Konto an: Für jeden Tag, an dem du hier mindestens eine Aufgabe richtig löst, bekommst du in VocabBoss eine Dogdex-Karte.", mail: "E-Mail", pw: "Passwort", login: "Anmelden", logout: "Abmelden", als: "Angemeldet als {m}", tage: "Mathe-Tage: {n}", offen: "{n} Karte(n) warten in VocabBoss", heute: "Heute schon verdient ✓", nochNicht: "Heute noch keine richtige Aufgabe", oeffnen: "VocabBoss öffnen", neu: "Noch kein Konto? Auf vocabboss.com registrieren", fehler: "E-Mail oder Passwort stimmt nicht.", fehlerNetz: "Keine Verbindung – bitte später nochmal.", bestaetigen: "Bitte bestätige zuerst deine E-Mail-Adresse.", toastOk: "✓ Richtig! Dafür gibt es heute eine Dogdex-Karte in VocabBoss.", toastAbholen: "Abholen", toastHinweis: "Mit deinem VocabBoss-Konto (Startseite) gäbe es dafür eine Dogdex-Karte." },
    en: { titel: "Collect Dogdex cards", info: "Log in with your VocabBoss account: for every day you solve at least one task correctly here, you get a Dogdex card in VocabBoss.", mail: "Email", pw: "Password", login: "Log in", logout: "Log out", als: "Logged in as {m}", tage: "Math days: {n}", offen: "{n} card(s) waiting in VocabBoss", heute: "Earned today ✓", nochNicht: "No correct task yet today", oeffnen: "Open VocabBoss", neu: "No account yet? Sign up on vocabboss.com", fehler: "Email or password is wrong.", fehlerNetz: "No connection – please try again later.", bestaetigen: "Please confirm your email address first.", toastOk: "✓ Correct! That earns you a Dogdex card in VocabBoss today.", toastAbholen: "Collect", toastHinweis: "With your VocabBoss account (start page) this would earn you a Dogdex card." },
    es: { titel: "Colecciona cartas Dogdex", info: "Inicia sesión con tu cuenta de VocabBoss: por cada día que resuelvas bien al menos un ejercicio aquí, recibes una carta Dogdex en VocabBoss.", mail: "Correo", pw: "Contraseña", login: "Iniciar sesión", logout: "Cerrar sesión", als: "Sesión iniciada: {m}", tage: "Días de mate: {n}", offen: "{n} carta(s) esperan en VocabBoss", heute: "Hoy ya ganada ✓", nochNicht: "Hoy aún ningún ejercicio correcto", oeffnen: "Abrir VocabBoss", neu: "¿Aún sin cuenta? Regístrate en vocabboss.com", fehler: "El correo o la contraseña no son correctos.", fehlerNetz: "Sin conexión, inténtalo más tarde.", bestaetigen: "Primero confirma tu correo electrónico.", toastOk: "✓ ¡Correcto! Hoy te llevas una carta Dogdex en VocabBoss.", toastAbholen: "Recoger", toastHinweis: "Con tu cuenta de VocabBoss (página de inicio) ganarías una carta Dogdex." },
    zh: { titel: "收集 Dogdex 卡片", info: "用你的 VocabBoss 账号登录：每天只要在这里做对至少一道题，就能在 VocabBoss 得到一张 Dogdex 卡片。", mail: "邮箱", pw: "密码", login: "登录", logout: "退出", als: "已登录：{m}", tage: "数学天数：{n}", offen: "VocabBoss 里有 {n} 张卡片等你领取", heute: "今天已获得 ✓", nochNicht: "今天还没有做对的题", oeffnen: "打开 VocabBoss", neu: "还没有账号？在 vocabboss.com 注册", fehler: "邮箱或密码不正确。", fehlerNetz: "没有网络连接——请稍后再试。", bestaetigen: "请先确认你的邮箱地址。", toastOk: "✓ 答对了！今天你在 VocabBoss 得到一张 Dogdex 卡片。", toastAbholen: "去领取", toastHinweis: "用 VocabBoss 账号登录（首页），就能因此得到一张 Dogdex 卡片。" },
    fr: { titel: "Collectionner des cartes Dogdex", info: "Connecte-toi avec ton compte VocabBoss : pour chaque jour où tu réussis au moins un exercice ici, tu reçois une carte Dogdex dans VocabBoss.", mail: "E-mail", pw: "Mot de passe", login: "Se connecter", logout: "Se déconnecter", als: "Connecté : {m}", tage: "Jours de maths : {n}", offen: "{n} carte(s) t’attendent dans VocabBoss", heute: "Gagnée aujourd’hui ✓", nochNicht: "Pas encore d’exercice réussi aujourd’hui", oeffnen: "Ouvrir VocabBoss", neu: "Pas encore de compte ? Inscris-toi sur vocabboss.com", fehler: "E-mail ou mot de passe incorrect.", fehlerNetz: "Pas de connexion – réessaie plus tard.", bestaetigen: "Confirme d’abord ton adresse e-mail.", toastOk: "✓ Juste ! Cela te rapporte une carte Dogdex dans VocabBoss aujourd’hui.", toastAbholen: "Récupérer", toastHinweis: "Avec ton compte VocabBoss (page d’accueil), cela te rapporterait une carte Dogdex." },
    ru: { titel: "Собирай карточки Dogdex", info: "Войди с аккаунтом VocabBoss: за каждый день, когда ты правильно решишь здесь хотя бы одну задачу, ты получишь карточку Dogdex в VocabBoss.", mail: "Эл. почта", pw: "Пароль", login: "Войти", logout: "Выйти", als: "Вход выполнен: {m}", tage: "Дней с математикой: {n}", offen: "В VocabBoss ждут карточки: {n}", heute: "Сегодня уже получено ✓", nochNicht: "Сегодня ещё нет правильной задачи", oeffnen: "Открыть VocabBoss", neu: "Ещё нет аккаунта? Регистрация на vocabboss.com", fehler: "Неверная почта или пароль.", fehlerNetz: "Нет соединения – попробуй позже.", bestaetigen: "Сначала подтверди адрес эл. почты.", toastOk: "✓ Правильно! За это сегодня будет карточка Dogdex в VocabBoss.", toastAbholen: "Забрать", toastHinweis: "С аккаунтом VocabBoss (главная страница) за это была бы карточка Dogdex." },
    ar: { titel: "اجمع بطاقات Dogdex", info: "سجّل الدخول بحساب VocabBoss: عن كل يوم تحل فيه هنا مسألة واحدة على الأقل بشكل صحيح تحصل على بطاقة Dogdex في VocabBoss.", mail: "البريد الإلكتروني", pw: "كلمة المرور", login: "تسجيل الدخول", logout: "تسجيل الخروج", als: "تم تسجيل الدخول: {m}", tage: "أيام الرياضيات: {n}", offen: "{n} بطاقة تنتظرك في VocabBoss", heute: "تم الكسب اليوم ✓", nochNicht: "لا توجد مسألة صحيحة اليوم بعد", oeffnen: "افتح VocabBoss", neu: "ليس لديك حساب؟ سجّل في vocabboss.com", fehler: "البريد الإلكتروني أو كلمة المرور غير صحيحة.", fehlerNetz: "لا يوجد اتصال – حاول لاحقًا.", bestaetigen: "أكّد عنوان بريدك الإلكتروني أولًا.", toastOk: "✓ صحيح! تحصل اليوم على بطاقة Dogdex في VocabBoss.", toastAbholen: "استلام", toastHinweis: "مع حساب VocabBoss (الصفحة الرئيسية) كنت ستحصل على بطاقة Dogdex." },
    ja: { titel: "Dogdex カードを集めよう", info: "VocabBoss のアカウントでログインしよう。ここで 1 問でも正解した日ごとに、VocabBoss で Dogdex カードが 1 枚もらえます。", mail: "メール", pw: "パスワード", login: "ログイン", logout: "ログアウト", als: "ログイン中：{m}", tage: "算数の日：{n}", offen: "VocabBoss でカード {n} 枚が待っています", heute: "今日はもうゲット ✓", nochNicht: "今日はまだ正解していません", oeffnen: "VocabBoss を開く", neu: "アカウントがない？ vocabboss.com で登録", fehler: "メールまたはパスワードがちがいます。", fehlerNetz: "接続できません。あとでもう一度ためしてね。", bestaetigen: "まずメールアドレスを確認してください。", toastOk: "✓ 正解！今日は VocabBoss で Dogdex カードがもらえます。", toastAbholen: "受け取る", toastHinweis: "VocabBoss のアカウント（トップページ）でログインすると Dogdex カードがもらえます。" },
    pt: { titel: "Colecione cartas Dogdex", info: "Entre com sua conta do VocabBoss: para cada dia em que você resolver certo pelo menos uma tarefa aqui, ganha uma carta Dogdex no VocabBoss.", mail: "E-mail", pw: "Senha", login: "Entrar", logout: "Sair", als: "Conectado: {m}", tage: "Dias de matemática: {n}", offen: "{n} carta(s) esperando no VocabBoss", heute: "Ganha hoje ✓", nochNicht: "Hoje ainda nenhuma tarefa certa", oeffnen: "Abrir o VocabBoss", neu: "Ainda sem conta? Cadastre-se em vocabboss.com", fehler: "E-mail ou senha incorretos.", fehlerNetz: "Sem conexão – tente mais tarde.", bestaetigen: "Confirme primeiro seu e-mail.", toastOk: "✓ Certo! Isso vale uma carta Dogdex no VocabBoss hoje.", toastAbholen: "Pegar", toastHinweis: "Com sua conta do VocabBoss (página inicial) isso valeria uma carta Dogdex." }
  };
  // Kopplungs-Code (auch für Gäste ohne E-Mail-Konto)
  var T2 = {"de": {"info": "Für jeden Tag, an dem du hier mindestens eine Aufgabe richtig löst, bekommst du in VocabBoss eine Dogdex-Karte. Den Code findest du in VocabBoss im Menü unter „Mathe-App koppeln“.", "code": "Code aus VocabBoss", "koppeln": "Koppeln", "gekoppelt": "Gekoppelt mit VocabBoss-Code {c}", "entkoppeln": "Entkoppeln", "codeFalsch": "Diesen Code gibt es nicht. Bitte prüfe ihn in VocabBoss.", "oderMail": "Oder mit E-Mail und Passwort anmelden", "toastGekoppelt": "✓ Die Mathe-App ist jetzt mit VocabBoss gekoppelt.", "toastHinweis": "Mit einem Code aus VocabBoss (Startseite) gäbe es dafür eine Dogdex-Karte."}, "en": {"info": "For every day you solve at least one task correctly here, you get a Dogdex card in VocabBoss. You find the code in VocabBoss in the menu under “Link math app”.", "code": "Code from VocabBoss", "koppeln": "Link", "gekoppelt": "Linked with VocabBoss code {c}", "entkoppeln": "Unlink", "codeFalsch": "This code does not exist. Please check it in VocabBoss.", "oderMail": "Or log in with email and password", "toastGekoppelt": "✓ The math app is now linked with VocabBoss.", "toastHinweis": "With a code from VocabBoss (start page) this would earn you a Dogdex card."}, "es": {"info": "Por cada día que resuelvas bien al menos un ejercicio aquí, recibes una carta Dogdex en VocabBoss. El código está en VocabBoss, en el menú «Vincular app de mates».", "code": "Código de VocabBoss", "koppeln": "Vincular", "gekoppelt": "Vinculada con el código de VocabBoss {c}", "entkoppeln": "Desvincular", "codeFalsch": "Ese código no existe. Compruébalo en VocabBoss.", "oderMail": "O inicia sesión con correo y contraseña", "toastGekoppelt": "✓ La app de mates ya está vinculada con VocabBoss.", "toastHinweis": "Con un código de VocabBoss (página de inicio) ganarías una carta Dogdex."}, "zh": {"info": "每天只要在这里做对至少一道题，就能在 VocabBoss 得到一张 Dogdex 卡片。代码在 VocabBoss 菜单的“关联数学应用”里。", "code": "VocabBoss 代码", "koppeln": "关联", "gekoppelt": "已关联 VocabBoss 代码 {c}", "entkoppeln": "取消关联", "codeFalsch": "没有这个代码。请在 VocabBoss 里核对。", "oderMail": "或者用邮箱和密码登录", "toastGekoppelt": "✓ 数学应用已与 VocabBoss 关联。", "toastHinweis": "输入 VocabBoss 的代码（首页），就能因此得到一张 Dogdex 卡片。"}, "fr": {"info": "Pour chaque jour où tu réussis au moins un exercice ici, tu reçois une carte Dogdex dans VocabBoss. Le code se trouve dans VocabBoss, dans le menu « Associer l’appli de maths ».", "code": "Code de VocabBoss", "koppeln": "Associer", "gekoppelt": "Associée au code VocabBoss {c}", "entkoppeln": "Dissocier", "codeFalsch": "Ce code n’existe pas. Vérifie-le dans VocabBoss.", "oderMail": "Ou connecte-toi avec e-mail et mot de passe", "toastGekoppelt": "✓ L’appli de maths est maintenant associée à VocabBoss.", "toastHinweis": "Avec un code de VocabBoss (page d’accueil), cela te rapporterait une carte Dogdex."}, "ru": {"info": "За каждый день, когда ты правильно решишь здесь хотя бы одну задачу, ты получишь карточку Dogdex в VocabBoss. Код находится в VocabBoss в меню «Связать с математикой».", "code": "Код из VocabBoss", "koppeln": "Связать", "gekoppelt": "Связано с кодом VocabBoss {c}", "entkoppeln": "Отвязать", "codeFalsch": "Такого кода нет. Проверь его в VocabBoss.", "oderMail": "Или войди с почтой и паролем", "toastGekoppelt": "✓ Приложение по математике связано с VocabBoss.", "toastHinweis": "С кодом из VocabBoss (главная страница) за это была бы карточка Dogdex."}, "ar": {"info": "عن كل يوم تحل فيه هنا مسألة واحدة على الأقل بشكل صحيح تحصل على بطاقة Dogdex في VocabBoss. تجد الرمز في VocabBoss في القائمة تحت «ربط تطبيق الرياضيات».", "code": "الرمز من VocabBoss", "koppeln": "ربط", "gekoppelt": "مرتبط برمز VocabBoss {c}", "entkoppeln": "إلغاء الربط", "codeFalsch": "هذا الرمز غير موجود. تحقق منه في VocabBoss.", "oderMail": "أو سجّل الدخول بالبريد الإلكتروني وكلمة المرور", "toastGekoppelt": "✓ تطبيق الرياضيات مرتبط الآن بـ VocabBoss.", "toastHinweis": "مع رمز من VocabBoss (الصفحة الرئيسية) كنت ستحصل على بطاقة Dogdex."}, "ja": {"info": "ここで 1 問でも正解した日ごとに、VocabBoss で Dogdex カードが 1 枚もらえます。コードは VocabBoss のメニュー「算数アプリと連携」にあります。", "code": "VocabBoss のコード", "koppeln": "連携する", "gekoppelt": "VocabBoss のコード {c} と連携中", "entkoppeln": "連携を解除", "codeFalsch": "このコードはありません。VocabBoss でたしかめてね。", "oderMail": "またはメールとパスワードでログイン", "toastGekoppelt": "✓ 算数アプリが VocabBoss と連携しました。", "toastHinweis": "VocabBoss のコード（トップページ）を入れると Dogdex カードがもらえます。"}, "pt": {"info": "Para cada dia em que você resolver certo pelo menos uma tarefa aqui, ganha uma carta Dogdex no VocabBoss. O código está no VocabBoss, no menu “Vincular app de matemática”.", "code": "Código do VocabBoss", "koppeln": "Vincular", "gekoppelt": "Vinculado ao código do VocabBoss {c}", "entkoppeln": "Desvincular", "codeFalsch": "Esse código não existe. Confira no VocabBoss.", "oderMail": "Ou entre com e-mail e senha", "toastGekoppelt": "✓ O app de matemática agora está vinculado ao VocabBoss.", "toastHinweis": "Com um código do VocabBoss (página inicial) isso valeria uma carta Dogdex."}};
  for(var l2 in T2) for(var k2 in T2[l2]) T[l2][k2] = T2[l2][k2];
  function lang(){ var l = window.MS_MATH_LANG || (function(){ try { return localStorage.getItem("msMathLang"); } catch(e){ return null; } })() || "de"; return T[l] ? l : "de"; }
  function tx(k, v){ var s = T[lang()][k] || T.de[k]; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function ls(k, v){ try { if(v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch(e){ return null; } }
  function heute(){ var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  var CODE = "msMathVbCode";
  function normCode(c){ c = String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, ""); return c.length === 8 ? c : ""; }
  function fmtCode(c){ return c.slice(0, 4) + "-" + c.slice(4); }
  function meinCode(){ return normCode(ls(CODE)); }
  function codeWeg(){ try { localStorage.removeItem(CODE); } catch(e){} ls("msMathDogTag", ""); }
  // Android-App (Google Play, TWA): Chrome meldet beim Start den Referrer
  // „android-app://<paket>“. Wir merken uns das für die Sitzung (sessionStorage,
  // nicht localStorage – Chrome und App teilen sich den Speicher der Seite).
  // In der App gibt es nur die Kopplung per Code, keine E-Mail-Anmeldung
  // (Kinderschutz: keine E-Mail-Adressen von Kindern über die App).
  var IST_APP = (function(){
    try {
      if(/^android-app:\/\//.test(document.referrer || "")) sessionStorage.setItem("msMathApp", "1");
      return sessionStorage.getItem("msMathApp") === "1";
    } catch(e){ return /^android-app:\/\//.test(document.referrer || ""); }
  })();
  function hatSitzung(){ var v = ls(TOKEN); return !!v && v.indexOf("access_token") >= 0; }

  // ---- Supabase nur bei Bedarf laden ----
  var clientP = null;
  function client(){
    if(clientP) return clientP;
    clientP = new Promise(function(res, rej){
      function mach(){ try { res(window.supabase.createClient(URL_, KEY, { auth: { persistSession: true, storageKey: TOKEN } })); } catch(e){ rej(e); } }
      if(window.supabase && window.supabase.createClient) return mach();
      var s = document.createElement("script"); s.src = LIB; s.onload = mach; s.onerror = function(){ clientP = null; rej(new Error("lib")); };
      document.head.appendChild(s);
    });
    return clientP;
  }

  // ---- Stil ----
  var css = document.createElement("style");
  css.textContent =
    ".msk-box{max-width:560px;margin:0 auto 14px;background:#ffffff;color:#1a2233;border:2px solid #b0b0b8;border-radius:14px;padding:12px 14px;text-align:start}" +
    ".msk-box h2{margin:0 0 4px;font-size:17px;color:#1565c0}.msk-box p{margin:4px 0;font-size:14px;line-height:1.4;color:#4f5b6e}" +
    ".msk-form{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.msk-form input{flex:1 1 160px;min-width:0;font:16px system-ui,sans-serif;padding:9px 11px;border:2px solid #b0b0b8;border-radius:10px;color:#1a2233;background:#ffffff}" +
    ".msk-btn{font:700 15px system-ui,sans-serif;padding:9px 16px;border-radius:10px;border:0;background:#1565c0;color:#ffffff;cursor:pointer}.msk-btn.zwei{background:#e3eefc;color:#1565c0}" +
    ".msk-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}.msk-ok{color:#15803d!important;font-weight:700}.msk-err{color:#b91c1c!important;font-weight:700}" +
    ".msk-box a{color:#1565c0;font-weight:700}.msk-mail{margin-top:10px}.msk-mail summary{cursor:pointer;color:#4f5b6e;font-size:14px}" +
    ".msk-toast{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;max-width:min(92vw,520px);display:flex;gap:10px;align-items:center;" +
    "background:#ffffff;color:#1a2233;border:3px solid #16a34a;border-radius:14px;padding:10px 14px;box-shadow:0 8px 24px rgba(0,0,0,.25);font:600 15px/1.35 system-ui,sans-serif;animation:mskIn .25s ease-out}" +
    ".msk-toast.hinweis{border-color:#1565c0}.msk-toast a{flex:none;background:#16a34a;color:#ffffff;text-decoration:none;padding:7px 12px;border-radius:10px;font-weight:800}" +
    ".msk-toast.hinweis a{background:#1565c0}.msk-toast button{flex:none;border:0;background:transparent;font-size:18px;color:#4f5b6e;cursor:pointer}" +
    "@keyframes mskIn{from{opacity:0;transform:translate(-50%,12px)}}";
  document.head.appendChild(css);

  // ---- Hinweis unten ----
  function toast(text, linkText, href, art){
    var alt = document.querySelector(".msk-toast"); if(alt) alt.remove();
    var d = document.createElement("div"); d.className = "msk-toast" + (art ? " " + art : ""); d.setAttribute("role", "status");
    d.innerHTML = "<span>" + esc(text) + "</span>" + (linkText ? '<a href="' + href + '" target="_blank" rel="noopener">' + esc(linkText) + "</a>" : "") + '<button type="button" aria-label="×">×</button>';
    d.querySelector("button").onclick = function(){ d.remove(); };
    document.body.appendChild(d);
    setTimeout(function(){ if(d.parentNode) d.remove(); }, 9000);
  }

  // ---- richtige Antwort melden (einmal pro Tag) ----
  var meldeLauf = false;
  function richtig(){
    var tag = heute();
    if(ls("msMathDogTag") === tag || meldeLauf) return;
    var sitzung = hatSitzung(), code = meinCode();
    if(!sitzung && !code){
      if(ls("msMathDogHinweis") !== tag){ ls("msMathDogHinweis", tag); toast(tx("toastHinweis"), null, null, "hinweis"); }
      return;
    }
    meldeLauf = true;
    client().then(function(c){ return sitzung ? c.rpc("math_mark_solved", { p_day: tag }) : c.rpc("math_mark_solved_code", { p_code: code, p_day: tag }); })
      .then(function(r){
        meldeLauf = false;
        if(r && r.error){
          if(/bad_code/.test(r.error.message || "")) codeWeg();
          if(/not_logged_in|JWT|jwt/i.test(r.error.message || "")) ls("msMathDogTag", "");
          return;
        }
        ls("msMathDogTag", tag);
        toast(tx("toastOk"), tx("toastAbholen"), VB);
      })
      .catch(function(){ meldeLauf = false; });
  }
  window.msRichtig = function(){ richtig(); if(window.MS_FS) MS_FS.richtig(); };

  // ---- Rückmeldungen erkennen (nur kurz nach einer Eingabe) ----
  var letzteEingabe = 0;
  ["pointerdown", "keydown", "input", "change"].forEach(function(ev){ document.addEventListener(ev, function(){ letzteEingabe = Date.now(); }, true); });
  function istGut(el){
    if(!el || el.nodeType !== 1 || !el.classList) return false;
    var c = el.classList;
    if(c.contains("gut") || c.contains("u-ok") || c.contains("richtig")) return true;
    if(c.contains("ok") && (el.tagName === "INPUT" || c.contains("math-eingabe") || c.contains("probeRow"))) return true;
    return false;
  }
  function istFalsch(el){ var c = el && el.classList; return !!c && (c.contains("falsch") || c.contains("schlecht") || c.contains("bad")); }
  function pruefe(liste){
    if(Date.now() - letzteEingabe > 4000) return;
    var gut = false, falsch = false, gutEl = null, falschEl = null;
    liste.forEach(function(m){
      var els = [];
      if(m.type === "attributes") els.push(m.target);
      else m.addedNodes.forEach(function(n){ if(n.nodeType === 1){ els.push(n); n.querySelectorAll && n.querySelectorAll(".gut,.u-ok,.richtig,.ok,.falsch,.schlecht,.bad").forEach(function(x){ els.push(x); }); } });
      els.forEach(function(el){ if(istFalsch(el)){ falsch = true; falschEl = falschEl || el; } else if(istGut(el)){ gut = true; gutEl = gutEl || el; } });
    });
    if(gut && !falsch) richtig();
    // Übungs-Statistik (fortschritt.js)
    if(window.MS_FS && (gut || falsch)) MS_FS.melde(!falsch, falsch ? falschEl : gutEl);
  }
  if(location.pathname !== "/" && location.pathname !== "/index.html" && window.MutationObserver){
    var mo = new MutationObserver(pruefe);
    var start = function(){ mo.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] }); };
    if(document.body) start(); else document.addEventListener("DOMContentLoaded", start);
  }

  // ---- Anmeldung / Stand auf der Startseite ----
  var boxEl = null, meldung = "", stand = null, letzteMail = "", codeMeldung = "", letzterCode = "";
  function zeichne(){
    if(!boxEl) return;
    var h = "<h2>" + esc(tx("titel")) + "</h2>";
    var code = meinCode();
    if(!hatSitzung() && code){
      h += "<p>" + esc(tx("gekoppelt", { c: fmtCode(code) })) + "</p>";
      if(stand){
        h += "<p>" + esc(tx("tage", { n: stand.total || 0 })) + " · " + (stand.today ? '<span class="msk-ok">' + esc(tx("heute")) + "</span>" : esc(tx("nochNicht"))) + "</p>";
        if(stand.open) h += '<p class="msk-ok">' + esc(tx("offen", { n: stand.open })) + "</p>";
      }
      h += '<div class="msk-row"><a class="msk-btn" style="text-decoration:none" href="' + VB + '" target="_blank" rel="noopener">' + esc(tx("oeffnen")) + '</a><button class="msk-btn zwei" type="button" data-entk>' + esc(tx("entkoppeln")) + "</button></div>";
    } else if(!hatSitzung()){
      h += "<p>" + esc(tx("info")) + "</p>" +
        '<form class="msk-form" data-code autocomplete="off"><input name="code" required autocapitalize="characters" spellcheck="false" maxlength="12" placeholder="' + esc(tx("code")) + '" value="' + esc(letzterCode) + '" style="text-transform:uppercase;letter-spacing:1px">' +
        '<button class="msk-btn" type="submit">' + esc(tx("koppeln")) + "</button></form>" +
        (codeMeldung ? '<p class="msk-err">' + esc(codeMeldung) + "</p>" : "") +
        (IST_APP ? "" : '<details class="msk-mail"' + (meldung ? " open" : "") + "><summary>" + esc(tx("oderMail")) + "</summary>" +
        '<form class="msk-form" data-mail autocomplete="on"><input type="email" name="email" autocomplete="username" required placeholder="' + esc(tx("mail")) + '" value="' + esc(letzteMail) + '">' +
        '<input type="password" name="password" autocomplete="current-password" required placeholder="' + esc(tx("pw")) + '">' +
        '<button class="msk-btn" type="submit">' + esc(tx("login")) + "</button></form>" +
        (meldung ? '<p class="msk-err">' + esc(meldung) + "</p>" : "") +
        '<p><a href="' + VB + '" target="_blank" rel="noopener">' + esc(tx("neu")) + "</a></p></details>");
    } else {
      var mail = ""; try { mail = JSON.parse(ls(TOKEN)).user.email || ""; } catch(e){}
      h += "<p>" + esc(tx("als", { m: mail })) + "</p>";
      if(stand){
        h += "<p>" + esc(tx("tage", { n: stand.total || 0 })) + " · " + (stand.today ? '<span class="msk-ok">' + esc(tx("heute")) + "</span>" : esc(tx("nochNicht"))) + "</p>";
        if(stand.open) h += '<p class="msk-ok">' + esc(tx("offen", { n: stand.open })) + "</p>";
      } else h += "<p>" + esc(tx("info")) + "</p>";
      h += '<div class="msk-row"><a class="msk-btn" style="text-decoration:none" href="' + VB + '" target="_blank" rel="noopener">' + esc(tx("oeffnen")) + '</a><button class="msk-btn zwei" type="button" data-aus>' + esc(tx("logout")) + "</button></div>";
    }
    boxEl.innerHTML = h;
    var fc = boxEl.querySelector("form[data-code]");
    if(fc) fc.addEventListener("submit", function(e){
      e.preventDefault();
      var b = fc.querySelector("button"), c = normCode(fc.code.value); letzterCode = fc.code.value.trim();
      if(!c){ codeMeldung = tx("codeFalsch"); zeichne(); return; }
      b.disabled = true;
      client().then(function(cl){ return cl.rpc("math_code_days", { p_code: c }); })
        .then(function(r){
          b.disabled = false;
          if(r.error){ codeMeldung = tx("fehlerNetz"); zeichne(); return; }
          if(!r.data){ codeMeldung = tx("codeFalsch"); zeichne(); return; }
          codeMeldung = ""; letzterCode = ""; ls(CODE, c); ls("msMathDogTag", ""); stand = r.data; if(stand.today) ls("msMathDogTag", heute()); zeichne();
        })
        .catch(function(){ b.disabled = false; codeMeldung = tx("fehlerNetz"); zeichne(); });
    });
    var ent = boxEl.querySelector("[data-entk]");
    if(ent) ent.addEventListener("click", function(){ codeWeg(); stand = null; zeichne(); });
    var f = boxEl.querySelector("form[data-mail]");
    if(f) f.addEventListener("submit", function(e){
      e.preventDefault();
      var b = f.querySelector("button"); b.disabled = true; letzteMail = f.email.value.trim();
      client().then(function(c){ return c.auth.signInWithPassword({ email: f.email.value.trim(), password: f.password.value }); })
        .then(function(r){
          b.disabled = false;
          if(r.error){ meldung = /confirm/i.test(r.error.message || "") ? tx("bestaetigen") : /fetch|network/i.test(r.error.message || "") ? tx("fehlerNetz") : tx("fehler"); zeichne(); return; }
          meldung = ""; ls("msMathDogTag", ""); laden();
        })
        .catch(function(){ b.disabled = false; meldung = tx("fehlerNetz"); zeichne(); });
    });
    var aus = boxEl.querySelector("[data-aus]");
    if(aus) aus.addEventListener("click", function(){
      client().then(function(c){ return c.auth.signOut(); }).catch(function(){}).then(function(){ try { localStorage.removeItem(TOKEN); } catch(e){} stand = null; ls("msMathDogTag", ""); zeichne(); });
    });
  }
  function laden(){
    zeichne();
    var code = meinCode();
    if(!hatSitzung()){
      if(!code) return;
      client().then(function(c){ return c.rpc("math_code_days", { p_code: code }); }).then(function(r){
        if(r && !r.error && r.data === null){ codeWeg(); stand = null; }
        else if(r && r.data){ stand = r.data; if(stand.today) ls("msMathDogTag", heute()); }
        zeichne();
      }).catch(function(){});
      return;
    }
    client().then(function(c){ return c.rpc("math_my_days"); }).then(function(r){
      if(r && r.data){ stand = r.data; if(stand.today) ls("msMathDogTag", heute()); }
      else if(r && r.error && /JWT|jwt|expired/i.test(r.error.message || "")){ try { localStorage.removeItem(TOKEN); } catch(e){} }
      zeichne();
    }).catch(function(){});
  }
  // Link aus VocabBoss: math.mistudia.com/?vb=CODE koppelt sofort
  (function(){
    var m = /[?&]vb=([^&#]+)/.exec(location.search), c = m && normCode(decodeURIComponent(m[1]));
    if(!m) return;
    try { var u = new URL(location.href); u.searchParams.delete("vb"); history.replaceState(null, "", u.pathname + u.search + u.hash); } catch(e){}
    if(!c || c === meinCode()) return;
    ls(CODE, c); ls("msMathDogTag", "");
    var zeig = function(){ toast(tx("toastGekoppelt")); if(boxEl){ stand = null; laden(); } };
    if(document.body) setTimeout(zeig, 300); else document.addEventListener("DOMContentLoaded", function(){ setTimeout(zeig, 300); });
  })();
  window.MS_KONTO = {
    istApp: IST_APP,
    client: client,
    // Verbindung für den Fortschritts-Abgleich: { sitzung: true } bzw. { code } oder null
    verbindung: function(){ if(hatSitzung()) return { sitzung: true }; var c = meinCode(); return c ? { code: c } : null; },
    box: function(el){ var neu = el !== boxEl; boxEl = el; if(neu) laden(); else zeichne(); },
    richtig: richtig
  };
})();
