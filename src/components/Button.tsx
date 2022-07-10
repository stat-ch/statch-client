import React from "react";

export default function Button({
  text,
  state,
}: {
  text: string;
  state: string;
}) {
  return <button className="bg-blue-200">{text}</button>;
}
