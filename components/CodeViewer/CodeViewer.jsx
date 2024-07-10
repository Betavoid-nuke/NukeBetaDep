import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // You can choose different styles

function CodeBlock({ language, code }) {
  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {code}
    </SyntaxHighlighter>
  );
}

export default CodeBlock;

//use this like this - <CodeBlock language="python" code={code} />