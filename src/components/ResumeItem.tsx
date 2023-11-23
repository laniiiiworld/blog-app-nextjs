type Props = {
  title: string;
  description: string;
};

export default function ResumeItem({ title, description }: Props) {
  return (
    <div className='text-center'>
      <h2 className='text-xl font-semibold mb-1'>{title}</h2>
      <pre className=''>{description}</pre>
    </div>
  );
}
