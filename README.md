# Ekhlas Landing (Static)

نسخة واجهة ثابتة (`HTML/CSS/JS`) بهوية بصرية مطابقة تقريبًا للموقع المرجعي، مع ترتيب الأقسام:

1. Hero
2. Products
3. About Us
4. Contact

## التشغيل على Windows (VS Code)

1. افتح المجلد `d:\eklas` في VS Code.
2. من Terminal داخل VS Code نفّذ:

```powershell
py -m http.server 5500
```

3. افتح المتصفح على:

```text
http://localhost:5500
```

## بديل سريع

يمكن أيضًا تشغيله عبر إضافة `Live Server` في VS Code ثم `Open with Live Server` على `index.html`.

## ربط نموذج التواصل بالإيميل

تم ربط نموذج التواصل في `script.js` بخدمة `FormSubmit` لإرسال البيانات إلى البريد:

`info@ardikhlas.com`

ملاحظات مهمة:

1. أول إرسال قد يتطلب تفعيل البريد عبر رسالة تأكيد تصل إلى نفس الإيميل من `FormSubmit`.
2. بعد التفعيل، أي رسالة من نموذج "أرسل لنا رسالة" سيتم إرسالها مباشرة إلى البريد المذكور.
