import {
  File,
  FileArchive,
  FileAudio,
  FileImage,
  FileText,
  FileVideo
} from "lucide-react";

type FileIconProps = {
  type: string;
};

const FileIcon = ({ type }: FileIconProps) => {
  const className = "w-8 h-8";

  if (type.includes("image")) return <FileImage className={className} />;

  if (type.includes("pdf")) return <FileText className={className} />;

  if (type.includes("video")) return <FileVideo className={className} />;

  if (type.includes("audio")) return <FileAudio className={className} />;

  if (type.includes("zip")) return <FileArchive className={className} />;

  return <File className={className} />;
};

export default FileIcon;
