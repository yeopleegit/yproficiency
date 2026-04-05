import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FolderOpen, Settings, Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from './api/client'
import DashboardPage from './pages/DashboardPage'
import CategoryPage from './pages/CategoryPage'
import SettingsPage from './pages/SettingsPage'
import { useState } from 'react'
import SessionFormModal from './components/sessions/SessionFormModal'

function App() {
  const location = useLocation()
  const [sessionModalOpen, setSessionModalOpen] = useState(false)
  const [sessionSkillId, setSessionSkillId] = useState<number | undefined>()

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  })

  const openSessionModal = (skillId?: number) => {
    setSessionSkillId(skillId)
    setSessionModalOpen(true)
  }

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">YProficiency</h1>
          <p className="text-xs text-gray-500 mt-1">Skill Maintenance Tracker</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}

          {categories.length > 0 && (
            <>
              <div className="pt-4 pb-2 px-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Categories
                </span>
              </div>
              {categories.map((cat: any) => {
                const active = location.pathname === `/categories/${cat.id}`
                return (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.id}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FolderOpen size={16} />
                    <span className="truncate">{cat.icon} {cat.name}</span>
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => openSessionModal()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Log Session
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardPage onLogSession={openSessionModal} />} />
          <Route path="/categories/:id" element={<CategoryPage onLogSession={openSessionModal} />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>

      {sessionModalOpen && (
        <SessionFormModal
          skillId={sessionSkillId}
          onClose={() => setSessionModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App
