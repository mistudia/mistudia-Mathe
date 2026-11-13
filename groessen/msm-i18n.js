// Zusätzliche Sprachen für "Größen umwandeln" in der Mathe-App (fr, ru, ar, ja, pt).
TR.fr = {
  pageTitle: 'Conversions d’unités', heading: 'miStudia – Conversions d’unités',
  infoHtml: 'Convertis les sept exercices, puis compare tes résultats.<br><b>Bleu = donné</b>',
  kategorieAriaLabel: 'Choisir une catégorie',
  kategorien: { laenge: '📏 Longueur', flaeche: '⬜ Aire', volumen: '💧 Volume', masse: '⚖️ Masse', zeit: '⏱️ Durée', gemischt: '🔀 Mélangé', mehrfach: '🧩 Plusieurs unités' },
  rechnerAriaLabel: 'Sept exercices de conversion',
  kopfNr: 'N°', kopfGegeben: 'Donné', kopfErgebnis: 'Ton résultat',
  antwortAriaLabel: i => `Réponse à l’exercice ${i}`,
  antwortAriaLabelTeil: (i, einheit) => `Réponse à l’exercice ${i}, partie en ${einheit}`,
  pruefenBtn: '✓ Vérifier', loesungBtn: '💡 Solutions', neuBtn: '🔄 Nouveaux exercices',
  ergebnisText: n => `Tu as ${n} exercice${n === 1 ? '' : 's'} juste${n === 1 ? '' : 's'} sur 7.`,
  loesungenText: '💡 Les solutions sont affichées.', merktippLabel: 'Astuce :',
  merktippText: 'Chaque catégorie a ses propres étapes de conversion – avec « Mélangé » et « Plusieurs unités », ça devient vraiment corsé. Choisis une catégorie – miStudia crée automatiquement de nouveaux exercices !',
  locale: 'fr-FR'
};
TR.ru = {
  pageTitle: 'Перевод величин', heading: 'miStudia – Перевод величин',
  infoHtml: 'Переведи величины в семи заданиях, а потом сравни свои ответы.<br><b>Синим = дано</b>',
  kategorieAriaLabel: 'Выбрать категорию',
  kategorien: { laenge: '📏 Длина', flaeche: '⬜ Площадь', volumen: '💧 Объём', masse: '⚖️ Масса', zeit: '⏱️ Время', gemischt: '🔀 Смешанно', mehrfach: '🧩 Несколько единиц' },
  rechnerAriaLabel: 'Семь заданий на перевод',
  kopfNr: '№', kopfGegeben: 'Дано', kopfErgebnis: 'Твой ответ',
  antwortAriaLabel: i => `Ответ к заданию ${i}`,
  antwortAriaLabelTeil: (i, einheit) => `Ответ к заданию ${i}, часть в ${einheit}`,
  pruefenBtn: '✓ Проверить', loesungBtn: '💡 Решения', neuBtn: '🔄 Новые задания',
  ergebnisText: n => `Правильно решено ${n} из 7 заданий.`,
  loesungenText: '💡 Показаны решения.', merktippLabel: 'Совет:',
  merktippText: 'В каждой категории свои шаги перевода – «Смешанно» и «Несколько единиц» особенно хитрые. Просто выбери категорию – miStudia сама создаст новые задания!',
  locale: 'ru-RU'
};
TR.ar = {
  pageTitle: 'تحويل الوحدات', heading: 'miStudia – تحويل الوحدات',
  infoHtml: 'حوّل المسائل السبع ثم قارن نتائجك.<br><b>الأزرق = معطى</b>',
  kategorieAriaLabel: 'اختر فئة',
  kategorien: { laenge: '📏 الطول', flaeche: '⬜ المساحة', volumen: '💧 الحجم', masse: '⚖️ الكتلة', zeit: '⏱️ الوقت', gemischt: '🔀 مختلط', mehrfach: '🧩 عدة وحدات' },
  rechnerAriaLabel: 'سبع مسائل تحويل',
  kopfNr: 'رقم', kopfGegeben: 'المعطى', kopfErgebnis: 'نتيجتك',
  antwortAriaLabel: i => `إجابة المسألة ${i}`,
  antwortAriaLabelTeil: (i, einheit) => `إجابة المسألة ${i}، الجزء بوحدة ${einheit}`,
  pruefenBtn: '✓ تحقق', loesungBtn: '💡 الحلول', neuBtn: '🔄 مسائل جديدة',
  ergebnisText: n => `حللت ${n} من 7 مسائل بشكل صحيح.`,
  loesungenText: '💡 يتم عرض الحلول.', merktippLabel: 'نصيحة:',
  merktippText: 'لكل فئة خطوات تحويل مختلفة – في «مختلط» و«عدة وحدات» يصبح الأمر صعبًا حقًا. اختر فئة فقط – وستنشئ miStudia مسائل جديدة تلقائيًا!',
  locale: 'ar-u-nu-latn'
};
TR.ja = {
  pageTitle: '単位の換算', heading: 'miStudia – 単位の換算',
  infoHtml: '7つの問題で単位を換算して、答えを確かめよう。<br><b>青 = 問題の数</b>',
  kategorieAriaLabel: '種類を選ぶ',
  kategorien: { laenge: '📏 長さ', flaeche: '⬜ 面積', volumen: '💧 体積', masse: '⚖️ 重さ', zeit: '⏱️ 時間', gemischt: '🔀 ミックス', mehrfach: '🧩 複数の単位' },
  rechnerAriaLabel: '7つの換算問題',
  kopfNr: '番号', kopfGegeben: '問題', kopfErgebnis: 'きみの答え',
  antwortAriaLabel: i => `問題${i}の答え`,
  antwortAriaLabelTeil: (i, einheit) => `問題${i}の答え（${einheit}の部分）`,
  pruefenBtn: '✓ 答え合わせ', loesungBtn: '💡 答えを見る', neuBtn: '🔄 新しい問題',
  ergebnisText: n => `7問中 ${n}問正解だよ。`,
  loesungenText: '💡 答えを表示しています。', merktippLabel: 'ポイント：',
  merktippText: '種類ごとに換算の手順がちがうよ。「ミックス」と「複数の単位」はかなり手ごわい！種類を選ぶだけで、miStudia が新しい問題を自動で作るよ。',
  locale: 'ja-JP'
};
TR.pt = {
  pageTitle: 'Converter unidades', heading: 'miStudia – Converter unidades',
  infoHtml: 'Converta as sete tarefas e depois compare seus resultados.<br><b>Azul = dado</b>',
  kategorieAriaLabel: 'Escolher uma categoria',
  kategorien: { laenge: '📏 Comprimento', flaeche: '⬜ Área', volumen: '💧 Volume', masse: '⚖️ Massa', zeit: '⏱️ Tempo', gemischt: '🔀 Misturado', mehrfach: '🧩 Várias unidades' },
  rechnerAriaLabel: 'Sete tarefas de conversão',
  kopfNr: 'Nº', kopfGegeben: 'Dado', kopfErgebnis: 'Seu resultado',
  antwortAriaLabel: i => `Resposta da tarefa ${i}`,
  antwortAriaLabelTeil: (i, einheit) => `Resposta da tarefa ${i}, parte em ${einheit}`,
  pruefenBtn: '✓ Conferir', loesungBtn: '💡 Soluções', neuBtn: '🔄 Novas tarefas',
  ergebnisText: n => `Você acertou ${n} de 7 tarefas.`,
  loesungenText: '💡 As soluções estão sendo mostradas.', merktippLabel: 'Dica:',
  merktippText: 'Cada categoria tem passos de conversão diferentes – em “Misturado” e “Várias unidades” fica bem difícil. É só escolher uma categoria – o miStudia cria novas tarefas automaticamente!',
  locale: 'pt-BR'
};
window.MS_LANG = {
  hide: ".sprachleiste",
  apply: function(l){ if(TR[l]) setLang(l); }
};
