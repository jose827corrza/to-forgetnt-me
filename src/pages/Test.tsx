import react from '../assets/react.svg'

export const Test = () => {
  return (
    <div className='flex flex-col h-full justify-center items-center'>
      <img src={react} alt="" className='animate-spin-slow h-52'/>
      <h1 className='font-sans text-white font-semibold pt-5'>Create your next TODO</h1>
    </div>
  )
}
