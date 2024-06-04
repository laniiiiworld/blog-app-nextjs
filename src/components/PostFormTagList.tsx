import PostFormTagItem from './PostFormTagItem';

type Props = {
  tags: string[];
  handleTagDelete: (tag: string) => void;
};

export default function PostFormTagList({ tags, handleTagDelete }: Props) {
  return (
    <ul className='flex mt-2 gap-4 flex-wrap'>
      {tags.map((tag) => (
        <PostFormTagItem key={tag} tag={tag} handleClick={handleTagDelete} />
      ))}
    </ul>
  );
}
