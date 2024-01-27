import {React , useEffect} from 'react'
import Box from '@mui/material/Box';
import Header from './Header'
import Footer from './Footer'
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

const Editor = () => {

  useEffect(()=>{
    const quillServer = new Quill('#editor',{
      modules: {
        toolbar: toolbarOptions
      }, theme: 'snow'})
  }, [])

  return (
    <div> 
        <Header/>
    <div className='container' style={{backgroundColor:"#F3F3F3", border:"5px Solid red"}}>
     
    
    <section id='editor' style={{minHeight:"500px"}}>
    <Box >
      Hello i am aman Kumar 
    </Box>
    </section>

      
    </div>
    <Footer />
    </div>
  )
}

export default Editor