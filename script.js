const PHONE_LOCAL = '0772041231';
const PHONE_INTERNATIONAL = '213772041231';

function callPhone() {
  window.location.href = `tel:${PHONE_LOCAL}`;
}

function openWhatsApp() {
  const url = `https://wa.me/${PHONE_INTERNATIONAL}`;
  window.open(url, '_blank');
}

// دالة لتصفية الصور في المعرض
function filterGallery(filter) {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    const category = item.getAttribute('data-category');
    if (filter === 'all' || category === filter) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const callBtn = document.querySelector('#callBtn');
  const waBtn = document.querySelector('#waBtn');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (callBtn) {
    callBtn.addEventListener('click', callPhone);
  }
  
  if (waBtn) {
    waBtn.addEventListener('click', openWhatsApp);
  }

  // إضافة مستمعي الأحداث لأزرار التصفية
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // إزالة فئة 'active' من كل الأزرار
      filterBtns.forEach(b => b.classList.remove('active'));
      // إضافة فئة 'active' للزر الحالي
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      filterGallery(filterValue);
    });
  });

  // معالجة إرسال نموذج الاتصال
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // منع الإرسال الافتراضي

      const name = document.querySelector('#name').value;
      const phone = document.querySelector('#phone').value;
      const message = document.querySelector('#message').value;

      // إنشاء رسالة واتساب
      const waMessage = `مرحباً، أنا ${name} ورقم هاتفي ${phone}. أود الاستفسار عن: ${message}`;
      const waUrl = `https://wa.me/${PHONE_INTERNATIONAL}?text=${encodeURIComponent(waMessage)}`;

      // فتح رابط واتساب
      window.open(waUrl, '_blank');

      // يمكنك هنا إضافة كود آخر لإرسال البيانات إلى خادم (إذا كان متوفراً)
      alert('تم إرسال رسالتك عبر واتساب بنجاح. سنتواصل معك قريباً!');
      contactForm.reset();
    });
  }
});
