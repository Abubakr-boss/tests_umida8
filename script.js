const questions=[


{q:"Turist oqimini cheklash uchun qanday siyosiy vosita qo‘llaniladi?",opts:["Subsidiyalarni joriy etilishi","Sayohat kvotalari (cheklangan son)","Reklama kampaniyalarining faoliyati","Kunlik xarajat normasini ko‘paytirish kabi vositalar"],a:"B"},
{q:"Barqaror turizm loyihalarining asosiy maqsadi va ijtimoiy foydasi nima?",opts:["Korruptsiyani kamaytirish va butunlay barham berilishi","Mahalliy aholiga ish o‘rinlari yaratish","Turist avtobuslarini ko‘paytirish va tirbandliklarga chek qo‘yish","Chipta narxlarini pasaytirib turistlar oqimini ko‘paytirish"],a:"B"},
{q:"Turizm sohasida Corporate Social Responsibility (CSR) nimani anglatadi?",opts:["Korporativ ijtimoiy mas’uliyat","Tez ro‘yxatdan o‘tish tizimlari","Mijozlarga xizmat ko‘rsatish tizimi","Kompaniyalar strategiyasi darajasi"],a:"A"},
{q:"Local Economic Multiplier modeli qanday maqsadga xizmat qiladi?",opts:["Bosh ofislarning daromadini oshirish","Turizm orqali mahalliy daromadlarni ko‘paytirish","Ko‘chmas mulk narxlarini oshirish evaziga turizmni rivojlantirish","Soliqlarni kamaytirish va turistlar oqimini ko‘paytirish"],a:"B"},
{q:"Community-Based Tourism nimani anglatadi?",opts:["Ichki turizmni rivojlantirish uchun mo‘ljallangan turizm yo‘nalishi","Mahalliy jamoa tomonidan boshqariladigan turizm","Ommaviy turizm shakli","Barqaror turizmga zid bo‘lgan mahalliy yondashuv"],a:"B"},
{q:"Atrof-muhitni boshqarish tizimlarida (EMS) qaysi xalqaro standart qo‘llaniladi?",opts:["ISO 9001","ISO 14001","ISO 45001","ISO 27001"],a:"B"},
{q:"Turizm iqtisodiyotida “leakage” nimani anglatadi?",opts:["Suv havzasidagi suvni sizib chiqishi","Turizm orqali olingan daromadning hududdan tashqariga chiqib ketishi","Turistlar ma’lumotining tarqalishi va konfidentsiallikni buzilish holatlari","Global turizm bozoriga chiqish"],a:"B"},
{q:"Turizm sohasi orqali aholi farovonligini oshirishga misol bo‘la oladigan holat qaysi?",opts:["Egzotik hayvonlar bilan suratga tushish va xalqaro bozorda reklama qilish","Mahalliy aholiga yordam beruvchi ko‘ngillilik safarlari","Mahalliy jamoalarning ishtirokisiz 'all inclusive' dam olish","Vertolyotda tog‘larga sayohat orqali ekologik turizmni rivojlantirish"],a:"B"},
{q:"Barqaror turizmda innovatsion yondashuvga qaysi misol mos keladi?",opts:["Mehmonxonalarda Bitcoin orqali to‘lov","Yangilanadigan energiya manbalaridan foydalanish","Mehmonxonalarda bepul Wi-Fi xizmatlari","Sun’iy intellekt va kompyuter texnologiyalarini joriy etish"],a:"B"},
{q:"“Aqlli turizm” (smart tourism) nimani anglatadi?",opts:["Aqlli yo‘nalishlarni ishlab chiqib turizmni rivojlantirish","Turizmni optimallashtirish uchun ma’lumot va texnologiyalardan foydalanish","Ilmiy sohadagi aqlli turistlar uchun xizmat","Sun’iy intellekt orqali boshqariladigan sayohatlar va ularning salbiy tomonlari"],a:"B"},

]

let idx = 0;
let correct = 0;
let wrong = 0;
const qnumEl = document.getElementById('qnum');
const qtextEl = document.getElementById('qtext');
const optionsEl = document.getElementById('options');
const form = document.getElementById('quizForm');
const typed = document.getElementById('typedAnswer');
const progress = document.getElementById('progress');
const resultBox = document.getElementById('resultBox');
const submitBtn = document.getElementById('submitBtn');

function renderQuestion() {
  if (idx >= questions.length) return;
  const q = questions[idx];
  qnumEl.textContent = `Savol ${idx + 1} / ${questions.length}`;
  qtextEl.textContent = q.q;
  optionsEl.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.opts.forEach((opt, i) => {
    const id = `opt${i}`;
    const div = document.createElement('label');
    div.className = 'option';
    div.innerHTML = `<input name='choice' type='radio' value='${letters[i]}' id='${id}' /><span>${letters[i]}. ${opt}</span>`;
    optionsEl.appendChild(div);
  });
  progress.textContent = `${idx + 1} / ${questions.length}`;
  typed.value = '';
}

function showResults() {
  resultBox.style.display = 'block';
  resultBox.innerHTML = `<strong>Test yakunlandi</strong><div class='small' style='margin-top:8px'>To'g'ri javoblar: ${correct}<br> Noto'g'ri javoblar: ${wrong}<br> Umumiy: ${questions.length}</div>`;
  submitBtn.disabled = true;
  form.style.display = 'none';
  progress.textContent = `${questions.length} / ${questions.length}`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const chosenRadio = document.querySelector("input[name='choice']:checked");
  let answer = chosenRadio ? chosenRadio.value : typed.value.trim().toUpperCase();
  if (!answer || !['A', 'B', 'C', 'D'].includes(answer)) {
    alert('Iltimos A, B, C yoki D variantidan birini tanlang yoki yozing');
    return;
  }
  const correctAnswer = questions[idx].a;
  if (answer === correctAnswer) correct++; else wrong++;
  idx++;

  if (idx >= questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
});

typed.addEventListener('input', e => {
  const v = e.target.value.trim().toUpperCase();
  if (['A', 'B', 'C', 'D'].includes(v)) {
    const radio = document.querySelector(`input[value='${v}']`);
    if (radio) radio.checked = true;
  }
});

optionsEl.addEventListener('click', e => {
  const input = e.target.closest('label')?.querySelector('input');
  if (input) {
    typed.value = input.value;
  }
});

renderQuestion();
