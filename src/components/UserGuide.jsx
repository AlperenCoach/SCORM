function UserGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card dark:bg-card-dark rounded-xl p-8 shadow-lg border border-border dark:border-border-dark">
        <h2 className="text-2xl font-semibold mb-8 text-slate-900 dark:text-slate-50">
          Kullanım Kılavuzu
        </h2>

        <div className="space-y-8">
          {/* Giriş */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
              Hoş Geldiniz
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Bu uygulama, kriptografi ve dijital sertifikalar hakkında pratik deneyim kazanmanız için tasarlanmıştır. 
              İki ana araç içerir: <strong className="text-slate-900 dark:text-slate-50">Şifreleme Simülatörü</strong> ve 
              <strong className="text-slate-900 dark:text-slate-50"> X.509 Sertifika Analiz Aracı</strong>.
            </p>
          </section>

          {/* Şifreleme Simülatörü */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
              1. Şifreleme Simülatörü
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  AES (Simetrik Şifreleme)
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Üst kısımdaki <strong className="text-slate-900 dark:text-slate-50">"AES (Simetrik)"</strong> seçeneğini seçin</li>
                  <li><strong className="text-slate-900 dark:text-slate-50">"Şifrelenecek Metin"</strong> alanına şifrelemek istediğiniz metni girin</li>
                  <li><strong className="text-slate-900 dark:text-slate-50">"Anahtar (Key)"</strong> alanına şifreleme anahtarınızı girin</li>
                  <li>Metin ve anahtar girdiğinizde, <strong className="text-slate-900 dark:text-slate-50">"Şifrelenmiş Veri"</strong> alanı otomatik olarak güncellenir</li>
                  <li>Şifrelenmiş veriyi kopyalayarak kullanabilirsiniz</li>
                </ol>
                <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Not:</strong> AES simetrik şifreleme kullanır, yani şifreleme ve deşifreleme için aynı anahtar kullanılır.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border dark:border-border-dark">
                <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  RSA (Asimetrik Şifreleme)
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Üst kısımdaki <strong className="text-slate-900 dark:text-slate-50">"RSA (Asimetrik)"</strong> seçeneğini seçin</li>
                  <li>Otomatik olarak bir <strong className="text-slate-900 dark:text-slate-50">Public Key</strong> ve <strong className="text-slate-900 dark:text-slate-50">Private Key</strong> çifti oluşturulur</li>
                  <li>İsterseniz <strong className="text-slate-900 dark:text-slate-50">"Yeni Anahtar Çifti Oluştur"</strong> butonuna tıklayarak yeni anahtarlar oluşturabilirsiniz</li>
                  <li><strong className="text-slate-900 dark:text-slate-50">"Şifrelenecek Metin"</strong> alanına metninizi girin</li>
                  <li>Şifrelenmiş veri otomatik olarak görüntülenir</li>
                </ol>
                <div className="mt-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-300">
                    <strong>Not:</strong> RSA asimetrik şifreleme kullanır. Public key ile şifreleme yapılır, Private key ile deşifreleme yapılır.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sertifika Analizi */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
              2. X.509 Sertifika Analiz Aracı
            </h3>
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-400">
                <li>Üst menüden <strong className="text-slate-900 dark:text-slate-50">"Sertifika Analizi"</strong> sekmesine geçin</li>
                <li><strong className="text-slate-900 dark:text-slate-50">"Sertifika Metni"</strong> alanına PEM veya CRT formatında sertifika metnini yapıştırın</li>
                <li><strong className="text-slate-900 dark:text-slate-50">"Sertifikayı Analiz Et"</strong> butonuna tıklayın</li>
                <li>Sertifika başarıyla analiz edildiğinde aşağıdaki bilgiler görüntülenir:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong className="text-slate-900 dark:text-slate-50">Yayımcı (Issuer):</strong> Sertifikayı imzalayan otorite</li>
                    <li><strong className="text-slate-900 dark:text-slate-50">Sahip (Subject):</strong> Sertifikanın sahibi</li>
                    <li><strong className="text-slate-900 dark:text-slate-50">Geçerlilik Süresi:</strong> Başlangıç ve bitiş tarihleri</li>
                    <li><strong className="text-slate-900 dark:text-slate-50">Seri Numarası:</strong> Sertifikanın benzersiz kimlik numarası</li>
                    <li><strong className="text-slate-900 dark:text-slate-50">Açık Anahtar Algoritması:</strong> Kullanılan şifreleme algoritması</li>
                  </ul>
                </li>
              </ol>
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-border dark:border-border-dark">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  <strong>Sertifika Formatı Örneği:</strong>
                </p>
                <pre className="text-xs text-slate-600 dark:text-slate-400 font-mono bg-white dark:bg-slate-900 p-3 rounded border border-border dark:border-border-dark overflow-x-auto">
{`-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAK...
[Base64 encoded sertifika verisi]
...
-----END CERTIFICATE-----`}
                </pre>
              </div>
            </div>
          </section>

          {/* İpuçları */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
              İpuçları ve Öneriler
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-primary text-sm font-semibold">1</span>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-slate-50">Güvenlik:</strong> Bu araçlar eğitim amaçlıdır. Gerçek üretim ortamlarında güvenli şifreleme kütüphaneleri kullanın.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-primary text-sm font-semibold">2</span>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-slate-50">Anahtar Yönetimi:</strong> RSA anahtarlarınızı güvenli bir yerde saklayın. Private key'inizi asla paylaşmayın.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-primary text-sm font-semibold">3</span>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-slate-50">Sertifika Analizi:</strong> Sertifika bilgilerini anlamak için her alanın yanındaki bilgi ikonuna (ℹ️) tıklayabilirsiniz.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-primary text-sm font-semibold">4</span>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-slate-50">Canlı Güncelleme:</strong> Şifreleme simülatöründe metin veya anahtar değiştirdiğinizde sonuçlar anında güncellenir.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Teknik Bilgiler */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
              Teknik Bilgiler
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-border dark:border-border-dark">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">AES (Advanced Encryption Standard)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Simetrik blok şifreleme algoritması. Hızlı ve güvenlidir. Aynı anahtar hem şifreleme hem de deşifreleme için kullanılır.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">RSA (Rivest-Shamir-Adleman)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Asimetrik şifreleme algoritması. Public key ile şifreleme, Private key ile deşifreleme yapılır. Dijital imza ve anahtar değişimi için kullanılır.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">X.509 Sertifikaları</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Dijital kimlik doğrulama için kullanılan standart format. SSL/TLS bağlantılarında ve dijital imzalarda yaygın olarak kullanılır.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default UserGuide
