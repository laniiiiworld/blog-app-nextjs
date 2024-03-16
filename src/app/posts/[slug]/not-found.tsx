export default function NotFound() {
  return (
    <div className='drop-shadow-sm w-full min-h-[34rem] flex flex-col justify-center items-center'>
      <h1 className='text-[#9cb4a3] text-[6rem] font-bold sm:text-[8rem]'>404</h1>
      <p className='flex flex-col text-gray-300 text-[1.5rem] font-semibold sm:flex-row sm:text-[2rem]'>
        <span>Oops! </span>
        <span className='transition-all animate-typing pr-1'>Something is wrong.</span>
      </p>
    </div>
  );
}
