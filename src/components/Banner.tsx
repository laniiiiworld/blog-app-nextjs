export type BannerData = {
  message: string;
  state: '' | 'success' | 'error';
};

export default function Banner({ banner: { message, state } }: { banner: BannerData }) {
  return (
    <p
      className={`w-full p-2 rounded-lg text-center ${state === 'success' && 'bg-green-300'}  ${
        state === 'error' && 'bg-red-300'
      }`}
    >
      {message}
    </p>
  );
}
