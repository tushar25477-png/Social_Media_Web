import logo from './Logo.png'

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="Photon logo"
        className="h-11 w-11 rounded-xl object-cover shadow-sm ring-1 ring-black/5"
      />

      <div className="flex items-center leading-none">
        <span className="text-2xl font-black tracking-[-0.06em] text-black">Photon</span>
      </div>
    </div>
  )
}

export default Logo