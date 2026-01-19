# SCORM Kriptografi Araçları

Gelişmiş Kriptografi Simülatörü ve X.509 Sertifika Analiz Aracı içeren React tabanlı web uygulaması.

## Özellikler

### 1. Gelişmiş Kriptografi Simülatörü
- **AES (Simetrik Şifreleme)**: Canlı şifreleme simülasyonu
- **RSA (Asimetrik Şifreleme)**: Public/Private key çifti ile şifreleme
- Gerçek zamanlı şifrelenmiş veri görüntüleme
- Modern, koyu tema tasarım

### 2. İnteraktif X.509 Sertifika Analiz Aracı
- PEM/CRT formatında sertifika analizi
- Yayımcı (Issuer) bilgileri
- Sahip (Subject) bilgileri
- Geçerlilik süresi kontrolü
- Seri numarası görüntüleme
- Açık anahtar algoritması bilgisi
- Tooltip'ler ile açıklamalar

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

## Build

```bash
npm run build
```

Build sonrası `dist` klasöründe tek HTML dosyasına hazır yapı oluşturulur.

## Teknolojiler

- React 18
- Tailwind CSS
- CryptoJS (AES şifreleme için)
- node-forge (X.509 sertifika analizi için)
- Vite (Build tool)

## H5P Uyumluluğu

Uygulama H5P Iframe Embedder ile uyumlu çalışacak şekilde tasarlanmıştır. Build edilmiş dosyalar tek bir HTML dosyasına entegre edilebilir.
