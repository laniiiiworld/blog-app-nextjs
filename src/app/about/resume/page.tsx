import ResumeItem from '@/components/ResumeItem';
import { getResumeItems } from '@/service/resume';

export default async function Resume() {
  const items = await getResumeItems();

  return (
    <section className='bg-zinc-100 shadow-lg w-10/12 mx-auto pt-4 pb-8 text-center'>
      {items.map(({ title, description }, index) => (
        <ResumeItem key={index} title={title} description={description} />
      ))}
    </section>
  );
}
