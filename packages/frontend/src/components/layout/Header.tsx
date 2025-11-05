import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { openSidebar } from '@/stores/sidebar-state'

const Header = () => {
  const handleClick = () => openSidebar()

  return (
    <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
      <button
        onClick={handleClick}
        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
      <h1 className="ml-4 text-xl font-semibold">
        <Link to="/">
          <img
            src="/tanstack-word-logo-white.svg"
            alt="TanStack Logo"
            className="h-10"
          />
        </Link>
      </h1>
    </header>
  )
}

export default Header
