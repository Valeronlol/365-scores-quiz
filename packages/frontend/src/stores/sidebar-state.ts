import { Store, useStore } from '@tanstack/react-store'

const sidebarStateStore = new Store(false)

export const useSidebarStateStore = () => useStore(sidebarStateStore)

export const openSidebar = () => sidebarStateStore.setState(() => true)

export const closeSidebar = () => sidebarStateStore.setState(() => false)
