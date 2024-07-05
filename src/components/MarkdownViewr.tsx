import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';
import Image from 'next/image';

type Props = {
  content: string;
};

export default function MarkdownViewr({ content }: Props) {
  return (
    <ReactMarkdown
      className='prose lg:prose-lg max-w-none'
      remarkPlugins={[remarkGfm]}
      components={{
        code: (props) => {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter //
              {...rest}
              PreTag='div'
              language={match[1]}
              style={dracula}
              ref={null}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className='bg-green-gray text-black font-medium rounded-md before:content-none after:content-none py-1 px-2'
              {...rest}
            >
              {children}
            </code>
          );
        },
        h2: ({ children }) => <h2 id={children?.toString().replaceAll(' ', '-')}>{children}</h2>,
        h3: ({ children }) => <h3 id={children?.toString().replaceAll(' ', '-')}>{children}</h3>,
        img: (image) => (
          <Image //
            className='w-full object-cover'
            src={image.src || ''}
            alt={image.alt || ''}
            width={parseInt(image.width as string) || 500}
            height={parseInt(image.height as string) || 350}
          />
        ),
        a: ({ href, children }) => (
          <a href={href} target='_blank' className='text-light no-underline hover:underline'>
            {children}
          </a>
        ),
        strong: ({ children, ...rest }) => {
          return (
            <strong className='text-green-800' {...rest}>
              {children}
            </strong>
          );
        },
        table: ({ children, ...rest }) => (
          <table className='rounded-xl overflow-hidden' {...rest}>
            {children}
          </table>
        ),
        th: ({ children, ...rest }) => {
          return (
            <th className='bg-green-light border-green-800 border-b-2 p-3 text-center' {...rest}>
              {children}
            </th>
          );
        },
        tr: ({ children, ...rest }) => (
          <tr className='bg-green-gray' {...rest}>
            {children}
          </tr>
        ),
        td: ({ children, ...rest }) => {
          if (typeof children === 'string') {
            children = children.split(/<br[ ]?\/>/g);
          }
          if (Array.isArray(children)) {
            children = children.map((str, index) => (str.match(/<br[ ]?\/>/g) ? <br key={index} /> : str));
          }
          return (
            <td style={{ paddingLeft: 10 + 'px' }} {...rest}>
              {children}
            </td>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
