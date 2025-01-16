'use client';

import React, { useState, useRef, useEffect } from 'react';

// Basic Markdown Parser
const parseMarkdown = (markdown) => {
  // Replace headings
  markdown = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  markdown = markdown.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  
  // Replace bold and italic
  markdown = markdown.replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>');
  markdown = markdown.replace(/\*(.*?)\*/gim, '<i>$1</i>');

  // Replace lists
  markdown = markdown.replace(/^\- (.*$)/gim, '<li>$1</li>');
  markdown = markdown.replace(/<\/li>\n<li>/gim, '</li><li>');

  // Replace line breaks
  markdown = markdown.replace(/\n/gim, '<br>');

  // Replace horizontal line
  markdown = markdown.replace(/---/gim, '<hr />');

  // Replace inline code
  markdown = markdown.replace(/`(.*?)`/gim, '<code>$1</code>');

  // Replace image
  markdown = markdown.replace(/!\[(.*?)\]\((.*?)\)/gim, (match, altText, url) => {
    return `<img src="${url}" alt="${altText}" />`;
  });

  return markdown.trim();
};

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(''); // User input
  const [html, setHtml] = useState(''); // Parsed output

  const markdownRef = useRef(null); // Ref for the markdown textarea
  const previewRef = useRef(null); // Ref for the preview div

  const handleInputChange = (event) => {
    const value = event.target.value;
    setMarkdown(value);
    setHtml(parseMarkdown(value)); // Parse markdown into HTML
  };

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  // Sync scroll positions between the Markdown editor and preview
  const handleScroll = () => {
    if (markdownRef.current && previewRef.current) {
      const markdownHeight = markdownRef.current.scrollHeight - markdownRef.current.clientHeight;
      const previewHeight = previewRef.current.scrollHeight - previewRef.current.clientHeight;
      
      // Calculate the scroll percentage in the markdown editor
      const markdownScrollPercentage = markdownRef.current.scrollTop / markdownHeight;

      // Apply the same percentage scroll to the preview container
      previewRef.current.scrollTop = markdownScrollPercentage * previewHeight;
    }
  };

  useEffect(() => {
    // Attach the scroll event handler to the markdown editor
    if (markdownRef.current) {
      markdownRef.current.addEventListener('scroll', handleScroll);
    }
    
    // Cleanup the event listener on unmount
    return () => {
      if (markdownRef.current) {
        markdownRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Input Area */}
      <textarea
        ref={markdownRef}  // Assigning ref to capture the scroll position
        value={markdown}
        onChange={handleInputChange}
        placeholder="Write your markdown here..."
        style={{
          width: '50%',
          height: '400px',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          overflowY: 'auto',
          paddingBottom: '100px',
        }}
      />

      {/* Preview Area */}
      <div
        ref={previewRef}  // Assigning ref to the preview area
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          width: '50%',
          height: '400px',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          overflowY: 'auto',
          paddingBottom: '100px',
        }}
      />
    </div>
  );
};

export default MarkdownEditor;
