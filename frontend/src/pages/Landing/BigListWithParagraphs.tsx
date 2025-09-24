import React from "react";

interface ListItem {
  title: string;
  description: string;
}

interface Props {
  items: ListItem[];
}

export const BigListWithParagraphs: React.FC<Props> = ({ items }) => {
  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-2xl font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        </div>
      ))}
    </div>
  );
};
