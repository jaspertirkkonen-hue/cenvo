'use client'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'

const actions = [
  { id: 'overview', name: 'Overview', href: '/overview' },
  { id: 'market', name: 'Market', href: '/market' },
  { id: 'chat', name: 'Chat', href: '/chat' },
  { id: 'settings', name: 'Settings', href: '/settings' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const filtered = actions.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <Transition show={open} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog onClose={setOpen} className="relative z-[110]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 p-4 flex items-start justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xl rounded-2xl border border-slate-700 bg-[#0f172a]/70 backdrop-blur-xl shadow-xl">
              <Combobox
                onChange={(action: any) => {
                  setOpen(false)
                  router.push(action.href)
                }}
              >
                <div className="p-3">
                  <Combobox.Input
                    className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                    placeholder="Go to..."
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <Combobox.Options static className="max-h-64 overflow-y-auto">
                  {filtered.map((action) => (
                    <Combobox.Option key={action.id} value={action} className={({ active }) => `px-4 py-2 cursor-pointer ${active ? 'bg-slate-800/60' : ''}`}>
                      {action.name}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}


