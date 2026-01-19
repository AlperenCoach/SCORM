import { useState } from 'react'
import CryptoSimulator from './components/CryptoSimulator'
import CertificateAnalyzer from './components/CertificateAnalyzer'
import UserGuide from './components/UserGuide'

function App() {
  const [activeTab, setActiveTab] = useState('guide')

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark transition-colors">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-semibold mb-3 text-slate-900 dark:text-slate-50">
            Kriptografi Araçları
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Şifreleme simülasyonu ve sertifika analiz araçları
          </p>
        </header>

        <div className="flex justify-center mb-10">
          <div className="bg-card dark:bg-card-dark rounded-xl p-1.5 shadow-sm border border-border dark:border-border-dark inline-flex gap-2">
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'guide'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Kullanım Kılavuzu
            </button>
            <button
              onClick={() => setActiveTab('crypto')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'crypto'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Şifreleme Simülatörü
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'certificate'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Sertifika Analizi
            </button>
          </div>
        </div>

        <main>
          {activeTab === 'guide' && <UserGuide />}
          {activeTab === 'crypto' && <CryptoSimulator />}
          {activeTab === 'certificate' && <CertificateAnalyzer />}
        </main>
      </div>
    </div>
  )
}

export default App
