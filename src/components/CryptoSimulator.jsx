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
      <div className="bg-card dark:bg-card-dark rounded-xl p-8 shadow-lg border border-border dark:border-border-dark">
        <h2 className="text-2xl font-semibold mb-8 text-slate-900 dark:text-slate-50">
          Şifreleme Simülatörü
        </h2>

        {/* Şifreleme Tipi Seçimi */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Şifreleme Yöntemi
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setEncryptionType('AES')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                encryptionType === 'AES'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              AES (Simetrik)
            </button>
            <button
              onClick={() => setEncryptionType('RSA')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                encryptionType === 'RSA'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              RSA (Asimetrik)
            </button>
          </div>
        </div>

        {/* Metin Girişi */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Şifrelenecek Metin
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Buraya metin girin..."
            className="w-full bg-white dark:bg-slate-800 border border-border dark:border-border-dark rounded-lg p-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            rows="4"
          />
        </div>

        {/* AES için Anahtar */}
        {encryptionType === 'AES' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Anahtar (Key)
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Şifreleme anahtarı girin..."
              className="w-full bg-white dark:bg-slate-800 border border-border dark:border-border-dark rounded-lg p-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        )}

        {/* RSA için Anahtarlar */}
        {encryptionType === 'RSA' && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Public Key (Açık Anahtar)
              </label>
              <textarea
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-border dark:border-border-dark rounded-lg p-3 text-slate-700 dark:text-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                rows="3"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Private Key (Gizli Anahtar)
              </label>
              <textarea
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-border dark:border-border-dark rounded-lg p-3 text-slate-700 dark:text-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                rows="3"
                readOnly
              />
            </div>
            <button
              onClick={generateRSAKeys}
              className="w-full py-2.5 px-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
            >
              Yeni Anahtar Çifti Oluştur
            </button>
          </div>
        )}

        {/* Şifrelenmiş Veri */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Şifrelenmiş Veri
          </label>
          <div className="bg-slate-50 dark:bg-slate-900 border border-border dark:border-border-dark rounded-lg p-4">
            <pre className="text-slate-700 dark:text-slate-300 text-sm font-mono break-all whitespace-pre-wrap">
              {encryptedData || 'Şifrelenmiş veri burada görünecek...'}
            </pre>
          </div>
          {encryptedData && (
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Veri canlı olarak şifreleniyor. Metni değiştirdikçe şifrelenmiş veri otomatik güncellenir.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CryptoSimulator
