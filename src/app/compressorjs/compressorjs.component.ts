import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Compressor from 'compressorjs';
@Component({
  selector: 'app-compressorjs',
  templateUrl: './compressorjs.component.html',
  styleUrls: ['./compressorjs.component.css']
})
export class CompressorjsComponent implements OnInit {
file: any;
file_data: File;
  constructor() { }

  ngOnInit() {
  }
  upload(){
    console.log("this is a test",this.file_data);
    new Compressor(this.file_data, {
    quality: 0.6,
    success(result) {
      const formData = new FormData();
      console.log(result);
      // The third parameter is required for server
      formData.append('file', result, 'Data');
      this.file_data = result;
      // Send the compressed image file to server with XMLHttpRequest.
      // axios.post('/path/to/upload', formData).then(() => {
      //   console.log('Upload success');
      // });
    },
    error(err) {
      console.log(err.message);
    },
  });
  }
  onFileSelected(event) {
 if(event.target.files.length > 0) 
  {
    this.file_data = event.target.files[0];
    console.log(event.target.files[0].name);
  }
}
  public getBase64FromFile(file: File): Promise<string> {
    console.log('this is a file',file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = () => {
        reader.abort();
        reject();
      };

      reader.onload = () => {
        resolve(reader.result.toString());
      };

      reader.readAsDataURL(file);
    });
  }
}

 
// document.getElementById('file').addEventListener('change', (e) => {
//   const file = e.target.files[0];
 
//   if (!file) {
//     return;
//   }
 
//   new Compressor(file, {
//     quality: 0.6,
//     success(result) {
//       const formData = new FormData();
 
//       // The third parameter is required for server
//       formData.append('file', result, result.name);
 
//       // Send the compressed image file to server with XMLHttpRequest.
//       axios.post('/path/to/upload', formData).then(() => {
//         console.log('Upload success');
//       });
//     },
//     error(err) {
//       console.log(err.message);
//     },
//   });
// });