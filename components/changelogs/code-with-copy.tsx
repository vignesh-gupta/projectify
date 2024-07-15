import CopyButton from "../copy-button";

const CodeWithCopy = ({ code }: { code: string }) => {
  return (
    <div className="p-5 bg-accent rounded-lg mt-5 group relative overflow-x-auto">
      <pre className="">{code}</pre>
      <CopyButton text={code} />
    </div>
  );
};

export default CodeWithCopy;
