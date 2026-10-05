# ⚡ YouPilot - YouTube Creator Intelligence Co-Pilot

> YouTube kanalınızı algoritmik zeka ile yönetin, izleyici hızını ve vampir düşüşlerini gerçek zamanlı takip edin.

![YouPilot Dashboard](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80)

YouPilot, YouTube içerik üreticileri için geliştirilmiş, teknik güvenilirlik ve tam kontrol hissi veren analitik ve büyüme kokpitidir.

---

## 🚀 Temel Özellikler

- **Gerçek Zamanlı Trafik & Hız Grafikleri:** Son 60 dakika, 24 saat ve haftalık tepe noktalarını yumuşatılmış alan (Spline Area) grafikleriyle analiz edin.
- **Vampir Düşüş (Drop) Dedektörü:** İzleyicilerin videonun hangi saniyesinde topluca ayrıldığını otomatik tespit edin ve kurgusal teşhis tavsiyeleri alın.
- **Yapay Zeka Başlık & Kanca Laboratuvarı:** Video başlıklarınızı test ederek viral potansiyel skoru (100 üzerinden) ve yüksek CTR vadeden 3 alternatif başlık üretin.
- **Çoklu Para Birimi & Net RPM:** Gelirlerinizi Türk Lirası (`₺`), Amerikan Doları (`$`) ve Bolivianos (`Bs.`) para birimleri arasında dönüştürün.
- **Resmi Google OAuth 2.0 & YouTube Data API v3:** Kanalınıza şifre paylaşmadan, güvenli ve resmi Google protokolü ile bağlanın.
- **Yasal Uyum Sayfaları:** Google OAuth onay süreci için gerekli olan **Ana Sayfa**, **Gizlilik Politikası (Privacy Policy)** ve **Kullanım Şartları (Terms of Service)** dahildir.

---

## 🛠️ Hızlı Başlangıç

### 1. Gereksinimler
- [Node.js](https://nodejs.org) (v18 veya üzeri)
- Hiçbir dış kütüphane kurulumu gerektirmez (`zero external dependencies`).

### 2. Projeyi Çalıştırma
```bash
# Proje dizinine gidin ve sunucuyu başlatın
node server.js
```
Tarayıcınızda açın:
- **Ana Sayfa:** `http://localhost:8085/`
- **Dashboard:** `http://localhost:8085/dashboard`
- **Gizlilik Politikası:** `http://localhost:8085/privacy`
- **Kullanım Şartları:** `http://localhost:8085/tos`

---

## 🔐 Google OAuth 2.0 Kurulumu

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) üzerinden yeni bir proje oluşturun ve **YouTube Data API v3** servisini etkinleştirin.
2. **Kimlik Bilgisi Oluştur (OAuth Client ID)** &rarr; **Web Uygulaması** seçeneğini belirleyin.
3. Yetkili Yönlendirme URI (Authorized Redirect URI) kısmına şunu ekleyin:
   ```text
   http://localhost:8085/auth/callback
   ```
4. Verilen `Client ID` ve `Client Secret` bilgilerini `.env` dosyasına kaydedin veya web arayüzündeki **YouTube Hesabını Bağla** modalına yapıştırın.

---

## ☁️ Ücretsiz Canlıya Alma (Deploy)

Render.com, Koyeb veya benzeri bulut platformlarında ücretsiz barındırabilirsiniz:
- **Build Command:** *(boş bırakın)*
- **Start Command:** `node server.js`
- **Port:** `8085` (veya ortam değişkenindeki `PORT`)

---

## 📄 Lisans & Gizlilik
Bu yazılım [YouTube Hizmet Şartları](https://www.youtube.com/t/terms) ve [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy) kurallarına uygun olarak geliştirilmiştir.
