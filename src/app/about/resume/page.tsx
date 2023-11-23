import ResumeItem from '@/components/ResumeItem';
import { getResumeItems } from '@/service/resume';

export default async function Resume() {
  const items = await getResumeItems();

  return (
    <section className='bg-zinc-100 w-10/12 mx-auto py-8 flex flex-col items-center gap-2'>
      {items.map(({ title, description }) => (
        <ResumeItem title={title} description={description} />
      ))}
    </section>
  );
}
