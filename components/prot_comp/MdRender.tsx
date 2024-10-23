import React, { HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkDownRenderProps {
  content: string;
}

const MarkDownRender: React.FC<MarkDownRenderProps> = ({ content }) => {
  return (
    <div className="prose  max-w-none p-4 bg-white shadow-sm rounded-lg size-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold my-6" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-semibold my-5" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-medium my-4" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="my-3 leading-relaxed text-gray-800" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc ml-6 my-3" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal ml-6 my-3" {...props} />
          ),
          table: ({ node, ...props }) => (
            <table
              className="table-auto border-collapse border border-gray-300 my-5"
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              className="border px-5 py-3 bg-gray-100 font-semibold"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border px-5 py-3" {...props} />
          ),
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={materialLight}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-100 text-red-600 p-2 rounded" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkDownRender;
