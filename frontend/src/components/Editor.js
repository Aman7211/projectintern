import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import FileSaver from 'file-saver';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['clean'],
];

const Editor = () => {
  const [text, setText] = useState("Hello i am aman Kumar");

  useEffect(() => {
    const quillServer = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: 'snow',
    });
  }, []);

  function saveText() {
    const quill = document.querySelector('.ql-editor');
    const content = quill.innerHTML; // Get the HTML content of the editor

    const blob = new Blob([content], {
      type: 'text/html;charset=utf-8',
    });

    FileSaver.saveAs(blob, 'document.html');
  }

  return (
    <div>
      <Header />
      <div className='container' style={{ backgroundColor: '#F3F3F3', border: '5px Solid red' }}>
        <section id='editor' style={{ minHeight: '670px' }}>
          <Box>Hello i am aman Kumar</Box>
        </section>
      </div>
      <div className='text-center my-2'>
      <button onClick={saveText} className='bg-primary text-white py-2 px-3'>Download</button>
      </div>
      <Footer />
    </div>
  );
};

export default Editor;
