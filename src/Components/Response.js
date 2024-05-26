import React from "react";
import DOMPurify from "dompurify";

const Response = ({ msg }) => {
  const sanitizedMessage = DOMPurify.sanitize(msg.replace(/\n/g, "<br/>"));

  return (
    <div className="p-3">
      <div
        className="h-fit rounded-lg mt-2 text-sm text-black rounded-bl-none bg-[#BDD1BD] p-3 w-fit ml-0 overflow-auto break-words"
        style={{maxWidth: '70%'}}
        dangerouslySetInnerHTML={{ __html: sanitizedMessage }}
      />
    </div>
  );
};

export default Response;
