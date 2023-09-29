import scarecrow from '../assets/Scarecrow.png'

export const NotFound = () => {
  return (
    <div className="flex h-full justify-center items-center bg-dark-blue">
      <div className='grid justify-items-center'>
        <img src={scarecrow} alt="scarecrow" className='scale-50'/>
        <h1 className='text-3xl text-white font-sans font-extrabold'>You went further :^ 404</h1>
      </div>
    </div>
  )
}
