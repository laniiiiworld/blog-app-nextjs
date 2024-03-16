const CIRCLE_CLASS = 'inline-block w-6 h-6 m-1 rounded-full';
export default function Loading() {
  return (
    <div className='p-24 text-center'>
      <div className={`${CIRCLE_CLASS} bg-green-light animate-loading-1`}></div>
      <div className={`${CIRCLE_CLASS} bg-green-gray animate-loading-2`}></div>
      <div className={`${CIRCLE_CLASS} bg-green-100 animate-loading-3`}></div>
    </div>
  );
}
