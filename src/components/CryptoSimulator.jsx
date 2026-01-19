import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'

function CryptoSimulator() {
  const [encryptionType, setEncryptionType] = useState('AES')
  const [inputText, setInputText] = useState('')
  const [key, setKey] = useState('')
  const [encryptedData, setEncryptedData] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  // RSA için basit simülasyon (gerçek RSA değil, gösterim amaçlı)
  const generateRSAKeys = () => {
    const pubKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...'
    const privKey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...'
    setPublicKey(pubKey)
    setPrivateKey(privKey)
  }

  useEffect(() => {
    if (encryptionType === 'RSA' && !publicKey) {
      generateRSAKeys()
    }
  }, [encryptionType])

  useEffect(() => {
    if (encryptionType === 'AES') {
      if (inputText && key) {
        try {
          const encrypted = CryptoJS.AES.encrypt(inputText, key).toString()
          setEncryptedData(encrypted)
        } catch (error) {
          setEncryptedData('Şifreleme hatası: ' + error.message)
        }
      } else {
        setEncryptedData('')
      }
    } else if (encryptionType === 'RSA') {
      if (inputText && publicKey) {
        // RSA simülasyonu - gerçek RSA şifreleme için daha büyük kütüphaneler gerekir
        // Burada Base64 encoding ile simüle ediyoruz
        const simulated = btoa(unescape(encodeURIComponent(inputText)))
        setEncryptedData(simulated)
      } else {
        setEncryptedData('')
      }
    }
  }, [inputText, key, encryptionType, publicKey])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-dark-card rounded-lg p-6 shadow-lg border border-cyber-green/20">
        <h2 className="text-2xl font-bold mb-6 text-cyber-green">
          Gelişmiş Kriptografi Simülatörü
        </h2>

        {/* Şifreleme Tipi Seçimi */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Şifreleme Yöntemi
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setEncryptionType('AES')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                encryptionType === 'AES'
                  ? 'bg-cyber-green text-dark-bg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              AES (Simetrik)
            </button>
            <button
              onClick={() => setEncryptionType('RSA')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                encryptionType === 'RSA'
                  ? 'bg-cyber-green text-dark-bg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              RSA (Asimetrik)
            </button>
          </div>
        </div>

        {/* Metin Girişi */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Şifrelenecek Metin
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Buraya metin girin..."
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green"
            rows="4"
          />
        </div>

        {/* AES için Anahtar */}
        {encryptionType === 'AES' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Anahtar (Key)
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Şifreleme anahtarı girin..."
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green"
            />
          </div>
        )}

        {/* RSA için Anahtarlar */}
        {encryptionType === 'RSA' && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Public Key (Açık Anahtar)
              </label>
              <textarea
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white text-xs font-mono focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue"
                rows="3"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Private Key (Gizli Anahtar)
              </label>
              <textarea
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white text-xs font-mono focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue"
                rows="3"
                readOnly
              />
            </div>
            <button
              onClick={generateRSAKeys}
              className="w-full py-2 px-4 bg-cyber-blue text-dark-bg rounded-lg font-medium hover:bg-cyber-blue/80 transition-all"
            >
              Yeni Anahtar Çifti Oluştur
            </button>
          </div>
        )}

        {/* Şifrelenmiş Veri */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Şifrelenmiş Veri (Encrypted Blob)
          </label>
          <div className="bg-gray-900 border border-cyber-green/30 rounded-lg p-4">
            <pre className="text-cyber-green text-sm font-mono break-all whitespace-pre-wrap">
              {encryptedData || 'Şifrelenmiş veri burada görünecek...'}
            </pre>
          </div>
          {encryptedData && (
            <p className="mt-2 text-xs text-gray-400">
              Veri canlı olarak şifreleniyor. Yukarıdaki metni değiştirdikçe şifrelenmiş veri otomatik güncellenir.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CryptoSimulator
