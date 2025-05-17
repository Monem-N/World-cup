import React from 'react';

interface DocumentLinksProps {
  attachments: string[];
}

export default function DocumentLinks({ attachments }: DocumentLinksProps) {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="text-sm text-gray-700">
      <h5 className="text-md font-semibold mb-1">Documents</h5>
      <ul className="list-disc pl-5">
        {attachments.map((attachment, index) => (
          <li key={index}>
            <a
              href={`/docs/${attachment}`} // Assuming documents are served from /docs
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {attachment.split('/').pop()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
