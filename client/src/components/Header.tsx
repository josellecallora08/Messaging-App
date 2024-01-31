import profile from '/icon.svg'

const Header = () => {
  return (
    <div className='max-h-20 h-full w-full bg-theme'>
      <header className='h-full w-5/6 flex items-center justify-between m-auto'>
        <div className='font-bold text-3xl text-white '>Chats</div>
        <div className='w-full h-full flex items-center justify-end gap-2'>
          <button className='bg-slate-100 shadow-md-inner rounded-full max-h-10 h-full w-full max-w-20 text-placeholder'>
            Search...
          </button>
          <button className='w-12 h-12 shadow-xl rounded-full'>
            <img
              src={profile}
              className='w-full h-full object-contain'
              alt=''
            />
          </button>
        </div>
      </header>
    </div>
  )
}

export default Header
