import { useState } from 'react'
import forge from 'node-forge'

function CertificateAnalyzer() {
  const [certificateText, setCertificateText] = useState('')
  const [certificateData, setCertificateData] = useState(null)
  const [error, setError] = useState('')

  const parseCertificate = () => {
    setError('')
    setCertificateData(null)

    if (!certificateText.trim()) {
      setError('Lütfen bir sertifika metni girin.')
      return
    }

    try {
      // PEM formatını temizle
      let pem = certificateText.trim()
      
      // Eğer BEGIN/END etiketleri yoksa ekle
      if (!pem.includes('BEGIN CERTIFICATE')) {
        pem = '-----BEGIN CERTIFICATE-----\n' + pem + '\n-----END CERTIFICATE-----'
      }

      // Sertifikayı parse et
      const cert = forge.pki.certificateFromPem(pem)

      // Sertifika bilgilerini çıkar
      const issuer = cert.issuer
      const subject = cert.subject
      const validity = cert.validity
      const serialNumber = cert.serialNumber
      const publicKey = cert.publicKey

      // Issuer bilgilerini formatla
      const issuerInfo = {}
      issuer.attributes.forEach(attr => {
        issuerInfo[attr.name] = attr.value
      })

      // Subject bilgilerini formatla
      const subjectInfo = {}
      subject.attributes.forEach(attr => {
        subjectInfo[attr.name] = attr.value
      })

      // Algoritma bilgisini al
      const algorithm = publicKey.algorithm || 'RSA'

      setCertificateData({
        issuer: issuerInfo,
        subject: subjectInfo,
        validity: {
          notBefore: validity.notBefore,
          notAfter: validity.notAfter
        },
        serialNumber: serialNumber,
        algorithm: algorithm,
        keySize: publicKey.n ? publicKey.n.bitLength() : null
      })
    } catch (err) {
      setError('Sertifika parse edilemedi: ' + err.message)
      console.error('Certificate parsing error:', err)
    }
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const InfoTooltip = ({ children, info }) => {
    const [showTooltip, setShowTooltip] = useState(false)
    return (
      <div className="relative inline-block">
        <span
          className="text-primary cursor-help ml-1.5 text-sm"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        {showTooltip && (
          <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-slate-900 dark:bg-slate-800 text-xs text-slate-100 rounded-lg shadow-xl z-10 border border-slate-700">
            {info}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-card dark:bg-card-dark rounded-xl p-8 shadow-lg border border-border dark:border-border-dark">
        <h2 className="text-2xl font-semibold mb-8 text-slate-900 dark:text-slate-50">
          X.509 Sertifika Analiz Aracı
        </h2>

        {/* Sertifika Girişi */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Sertifika Metni (PEM veya CRT formatında)
          </label>
          <textarea
            value={certificateText}
            onChange={(e) => setCertificateText(e.target.value)}
            placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
            className="w-full bg-white dark:bg-slate-800 border border-border dark:border-border-dark rounded-lg p-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm transition-all"
            rows="8"
          />
          <button
            onClick={parseCertificate}
            className="mt-4 w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
          >
            Sertifikayı Analiz Et
          </button>
        </div>

        {/* Hata Mesajı */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Sertifika Bilgileri */}
        {certificateData && (
          <div className="space-y-4">
            {/* Issuer */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-border dark:border-border-dark">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 flex items-center">
                Yayımcı (Issuer)
                <InfoTooltip info="Sertifika Makamı (CA) - Bu sertifikayı imzalayan otorite. Güven zincirinin üst seviyesini temsil eder." />
              </h3>
              <div className="space-y-2.5">
                {Object.entries(certificateData.issuer).map(([key, value]) => (
                  <div key={key} className="flex items-start">
                    <span className="text-slate-500 dark:text-slate-400 w-32 capitalize text-sm font-medium">{key}:</span>
                    <span className="text-slate-900 dark:text-slate-100 flex-1">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-border dark:border-border-dark">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 flex items-center">
                Sahip (Subject)
                <InfoTooltip info="Sertifikanın sahibi - Bu sertifikanın kim için veya hangi domain için verildiğini gösterir." />
              </h3>
              <div className="space-y-2.5">
                {Object.entries(certificateData.subject).map(([key, value]) => (
                  <div key={key} className="flex items-start">
                    <span className="text-slate-500 dark:text-slate-400 w-32 capitalize text-sm font-medium">{key}:</span>
                    <span className="text-slate-900 dark:text-slate-100 flex-1">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geçerlilik Süresi */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-border dark:border-border-dark">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 flex items-center">
                Geçerlilik Süresi
                <InfoTooltip info="Sertifikanın geçerli olduğu tarih aralığı. Bu tarihler dışında sertifika geçersiz sayılır." />
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-start">
                  <span className="text-slate-500 dark:text-slate-400 w-40 text-sm font-medium">Geçerlilik Başlangıcı:</span>
                  <span className="text-slate-900 dark:text-slate-100 flex-1">{formatDate(certificateData.validity.notBefore)}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-slate-500 dark:text-slate-400 w-40 text-sm font-medium">Geçerlilik Bitişi:</span>
                  <span className="text-slate-900 dark:text-slate-100 flex-1">{formatDate(certificateData.validity.notAfter)}</span>
                </div>
                {certificateData.validity.notAfter && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Durum: </span>
                    {new Date(certificateData.validity.notAfter) > new Date() ? (
                      <span className="text-accent font-semibold">Geçerli</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Süresi Dolmuş</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Seri Numarası */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-border dark:border-border-dark">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 flex items-center">
                Seri Numarası
                <InfoTooltip info="Sertifikanın benzersiz kimlik numarası. Her sertifika için CA tarafından atanan özel bir numaradır." />
              </h3>
              <div className="font-mono text-slate-700 dark:text-slate-300 break-all text-sm bg-white dark:bg-slate-900 p-3 rounded border border-border dark:border-border-dark">
                {certificateData.serialNumber}
              </div>
            </div>

            {/* Açık Anahtar Algoritması */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-border dark:border-border-dark">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 flex items-center">
                Açık Anahtar Algoritması
                <InfoTooltip info="Sertifikada kullanılan şifreleme algoritması ve anahtar boyutu. RSA, ECDSA gibi algoritmalar kullanılabilir." />
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-start">
                  <span className="text-slate-500 dark:text-slate-400 w-40 text-sm font-medium">Algoritma:</span>
                  <span className="text-slate-900 dark:text-slate-100 font-mono">{certificateData.algorithm}</span>
                </div>
                {certificateData.keySize && (
                  <div className="flex items-start">
                    <span className="text-slate-500 dark:text-slate-400 w-40 text-sm font-medium">Anahtar Boyutu:</span>
                    <span className="text-slate-900 dark:text-slate-100">{certificateData.keySize} bit</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Örnek Sertifika */}
        {!certificateData && !error && (
          <div className="mt-6 p-5 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-border dark:border-border-dark">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong className="text-slate-900 dark:text-slate-100">İpucu:</strong> PEM formatında bir sertifika yapıştırın. 
              Örnek format:
            </p>
            <pre className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-2 bg-white dark:bg-slate-900 p-3 rounded border border-border dark:border-border-dark">
{`-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAK...
...
-----END CERTIFICATE-----`}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default CertificateAnalyzer
