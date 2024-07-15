import CopyButton from "./copy-button";

const CodeWithCopy = ({ code }: { code: string }) => {
  return (
    <div
      className="p-5 bg-accent rounded-lg mt-5 group relative overflow-x-auto"
      onClick={() => navigator.clipboard.writeText(code)}
    >
      <pre className="">{code}</pre>
      <CopyButton text={code} />
    </div>
  );
};

export default CodeWithCopy;
