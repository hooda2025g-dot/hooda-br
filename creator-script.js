// العناصر
const generateBtn = document.getElementById('generateBtn');
const resultContainer = document.getElementById('resultContainer');
const generatedLink = document.getElementById('generatedLink');
const generatedPassword = document.getElementById('generatedPassword');
const testLinkBtn = document.getElementById('testLinkBtn');
const newMessageBtn = document.getElementById('newMessageBtn');
const alertBox = document.getElementById('alert');

// المتغيرات
let currentLink = '';
let currentPassword = '';

// رابط موقع الرسالة السرية (هنا ضع رابط موقعك الأول)
// إذا كان الموقعين في نفس المجلد، استخدم اسم الملف فقط
const baseUrl = "secret-message.html";

// دالة لعرض التنبيهات
function showAlert(message, type = 'success') {
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    alertBox.style.display = 'block';
    
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 5000);
}

// دالة لإنشاء الرابط
function generateLink() {
    const personName = document.getElementById('personName').value.trim();
    const message = document.getElementById('message').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // التحقق من الحقول
    if (!personName || !message || !password) {
        showAlert('يرجى ملء جميع الحقول', 'error');
        return false;
    }
    
    // تشفير البيانات
    const data = {
        name: personName,
        message: message,
        password: password
    };
    
    // تحويل البيانات إلى نص يمكن وضعه في الرابط
    const encodedData = btoa(encodeURIComponent(JSON.stringify(data)));
    
    // إنشاء الرابط
    currentLink = `${baseUrl}?data=${encodedData}`;
    currentPassword = password;
    
    return true;
}

// عند النقر على زر إنشاء الرابط
generateBtn.addEventListener('click', function() {
    if (generateLink()) {
        // عرض الرابط وكلمة السر
        generatedLink.innerHTML = `
            ${currentLink}
            <button class="copy-btn" id="copyLinkBtn">
                <i class="fas fa-copy"></i> نسخ
            </button>
        `;
        
        generatedPassword.innerHTML = `
            ${currentPassword}
            <button class="copy-btn" id="copyPasswordBtn">
                <i class="fas fa-copy"></i> نسخ
            </button>
        `;
        
        // إضافة أحداث نسخ
        document.getElementById('copyLinkBtn').addEventListener('click', copyLink);
        document.getElementById('copyPasswordBtn').addEventListener('click', copyPassword);
        
        // إظهار نتيجة
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
        
        showAlert('تم إنشاء الرابط بنجاح! يمكنك نسخ الرابط وإرساله.', 'success');
    }
});

// دالة نسخ الرابط
function copyLink() {
    navigator.clipboard.writeText(currentLink)
        .then(() => {
            showAlert('تم نسخ الرابط إلى الحافظة', 'success');
        })
        .catch(err => {
            showAlert('حدث خطأ أثناء نسخ الرابط', 'error');
            console.error('Error copying link: ', err);
        });
}

// دالة نسخ كلمة السر
function copyPassword() {
    navigator.clipboard.writeText(currentPassword)
        .then(() => {
            showAlert('تم نسخ كلمة السر إلى الحافظة', 'success');
        })
        .catch(err => {
            showAlert('حدث خطأ أثناء نسخ كلمة السر', 'error');
            console.error('Error copying password: ', err);
        });
}

// عند النقر على زر التجربة
testLinkBtn.addEventListener('click', function() {
    if (currentLink) {
        window.open(currentLink, '_blank');
    } else {
        showAlert('لم يتم إنشاء رابط بعد', 'error');
    }
});

// عند النقر على زر إنشاء رسالة جديدة
newMessageBtn.addEventListener('click', function() {
    // إعادة تعيين النموذج
    document.getElementById('personName').value = '';
    document.getElementById('message').value = '';
    document.getElementById('password').value = '';
    
    // إخفاء النتائج
    resultContainer.style.display = 'none';
    
    // التركيز على الحقل الأول
    document.getElementById('personName').focus();
    
    showAlert('يمكنك الآن إنشاء رسالة جديدة', 'success');
});

// السماح باستخدام Enter لإرسال النموذج
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateBtn.click();
    }
});

// ملء الحقول بمثال للمساعدة
document.addEventListener('DOMContentLoaded', function() {
    // يمكنك إزالة هذه الأسطر إذا لم ترد الأمثلة
    document.getElementById('personName').value = "حبيبتي";
    document.getElementById('message').value = "أحبك أكثر مما تستطيع الكلمات التعبير عنه...";
    document.getElementById('password').value = "حبنا";
});