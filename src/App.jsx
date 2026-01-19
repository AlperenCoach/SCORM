import { useState } from 'react'
import CryptoSimulator from './components/CryptoSimulator'
import CertificateAnalyzer from './components/CertificateAnalyzer'

function App() {
  const [activeTab, setActiveTab] = useState('crypto')

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
            SCORM Kriptografi Araçları
          </h1>
          <p className="text-gray-400">Gelişmiş Kriptografi ve Sertifika Analiz Araçları</p>
        </header>

        <div className="flex justify-center mb-8">
          <div className="bg-dark-card rounded-lg p-1 flex gap-2">
            <button
              onClick={() => setActiveTab('crypto')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'crypto'
                  ? 'bg-cyber-green text-dark-bg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Kriptografi Simülatörü
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'certificate'
                  ? 'bg-cyber-green text-dark-bg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              X.509 Sertifika Analizi
            </button>
          </div>
        </div>

        <main>
          {activeTab === 'crypto' && <CryptoSimulator />}
          {activeTab === 'certificate' && <CertificateAnalyzer />}
        </main>
      </div>
    </div>
  )
}

export default App
