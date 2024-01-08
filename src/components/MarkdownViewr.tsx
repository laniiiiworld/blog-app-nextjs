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
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
        img: (image) => (
          <Image //
            className='w-full max-h-60 object-cover'
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={350}
          />
        ),
        a: ({ href, children }) => (
          <a href={href} target='_blank'>
            {children}
          </a>
        ),
        th: ({ children, ...rest }) => {
          return (
            <th className='bg-gray-200 p-3' {...rest}>
              {children}
            </th>
          );
        },
        tr: ({ children, ...rest }) => (
          <tr className='bg-gray-100' {...rest}>
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
          return <td {...rest}>{children}</td>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
