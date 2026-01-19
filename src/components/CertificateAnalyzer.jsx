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
          className="text-cyber-blue cursor-help ml-1"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ℹ️
        </span>
        {showTooltip && (
          <div className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-gray-800 text-xs text-white rounded-lg shadow-lg z-10 border border-cyber-blue">
            {info}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-dark-card rounded-lg p-6 shadow-lg border border-cyber-blue/20">
        <h2 className="text-2xl font-bold mb-6 text-cyber-blue">
          İnteraktif X.509 Sertifika Analiz Aracı
        </h2>

        {/* Sertifika Girişi */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sertifika Metni (PEM veya CRT formatında)
          </label>
          <textarea
            value={certificateText}
            onChange={(e) => setCertificateText(e.target.value)}
            placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue font-mono text-sm"
            rows="8"
          />
          <button
            onClick={parseCertificate}
            className="mt-4 w-full py-3 px-4 bg-cyber-blue text-dark-bg rounded-lg font-medium hover:bg-cyber-blue/80 transition-all"
          >
            Sertifikayı Analiz Et
          </button>
        </div>

        {/* Hata Mesajı */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Sertifika Bilgileri */}
        {certificateData && (
          <div className="space-y-4">
            {/* Issuer */}
            <div className="bg-gray-800 rounded-lg p-5 border border-cyber-green/30">
              <h3 className="text-lg font-bold text-cyber-green mb-3 flex items-center">
                Yayımcı (Issuer)
                <InfoTooltip info="Sertifika Makamı (CA) - Bu sertifikayı imzalayan otorite. Güven zincirinin üst seviyesini temsil eder." />
              </h3>
              <div className="space-y-2">
                {Object.entries(certificateData.issuer).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="text-gray-400 w-32 capitalize">{key}:</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div className="bg-gray-800 rounded-lg p-5 border border-cyber-green/30">
              <h3 className="text-lg font-bold text-cyber-green mb-3 flex items-center">
                Sahip (Subject)
                <InfoTooltip info="Sertifikanın sahibi - Bu sertifikanın kim için veya hangi domain için verildiğini gösterir." />
              </h3>
              <div className="space-y-2">
                {Object.entries(certificateData.subject).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="text-gray-400 w-32 capitalize">{key}:</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geçerlilik Süresi */}
            <div className="bg-gray-800 rounded-lg p-5 border border-cyber-blue/30">
              <h3 className="text-lg font-bold text-cyber-blue mb-3 flex items-center">
                Geçerlilik Süresi
                <InfoTooltip info="Sertifikanın geçerli olduğu tarih aralığı. Bu tarihler dışında sertifika geçersiz sayılır." />
              </h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-gray-400 w-40">Geçerlilik Başlangıcı:</span>
                  <span className="text-white">{formatDate(certificateData.validity.notBefore)}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-40">Geçerlilik Bitişi:</span>
                  <span className="text-white">{formatDate(certificateData.validity.notAfter)}</span>
                </div>
                {certificateData.validity.notAfter && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <span className="text-gray-400">Durum: </span>
                    {new Date(certificateData.validity.notAfter) > new Date() ? (
                      <span className="text-cyber-green font-medium">Geçerli</span>
                    ) : (
                      <span className="text-red-400 font-medium">Süresi Dolmuş</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Seri Numarası */}
            <div className="bg-gray-800 rounded-lg p-5 border border-cyber-blue/30">
              <h3 className="text-lg font-bold text-cyber-blue mb-3 flex items-center">
                Seri Numarası
                <InfoTooltip info="Sertifikanın benzersiz kimlik numarası. Her sertifika için CA tarafından atanan özel bir numaradır." />
              </h3>
              <div className="font-mono text-cyber-green break-all">
                {certificateData.serialNumber}
              </div>
            </div>

            {/* Açık Anahtar Algoritması */}
            <div className="bg-gray-800 rounded-lg p-5 border border-cyber-green/30">
              <h3 className="text-lg font-bold text-cyber-green mb-3 flex items-center">
                Açık Anahtar Algoritması
                <InfoTooltip info="Sertifikada kullanılan şifreleme algoritması ve anahtar boyutu. RSA, ECDSA gibi algoritmalar kullanılabilir." />
              </h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-gray-400 w-40">Algoritma:</span>
                  <span className="text-white font-mono">{certificateData.algorithm}</span>
                </div>
                {certificateData.keySize && (
                  <div className="flex">
                    <span className="text-gray-400 w-40">Anahtar Boyutu:</span>
                    <span className="text-white">{certificateData.keySize} bit</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Örnek Sertifika */}
        {!certificateData && !error && (
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">
              <strong className="text-gray-300">İpucu:</strong> PEM formatında bir sertifika yapıştırın. 
              Örnek format:
            </p>
            <pre className="text-xs text-gray-500 font-mono mt-2">
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
