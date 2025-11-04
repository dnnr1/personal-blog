"use client";
import ReactMDEditor from "@uiw/react-md-editor";

type Props = {
  value: string;
};

export default function MDPreview({ value }: Props) {
  if (!value) return null;
  return (
    <ReactMDEditor.Markdown
      source={value}
      style={{
        whiteSpace: "pre-wrap",
        background: "none",
        fontFamily: "inherit",
        color: "inherit",
      }}
    />
  );
}
