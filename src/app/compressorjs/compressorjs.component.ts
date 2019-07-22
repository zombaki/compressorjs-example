import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Compressor from 'compressorjs';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-compressorjs',
  templateUrl: './compressorjs.component.html',
  styleUrls: ['./compressorjs.component.css']
})
export class CompressorjsComponent implements OnInit {
  file: any;
  file_data: File;
  mySrc: any;
  final: File;
  constructor() { }

  ngOnInit() {
  }
  upload() {
    const _result = this;
    console.log("this is a test", this.file_data.size);
    new Compressor(this.file_data, {
      quality: 0.6,
      success(result) {
        console.log("this is a result", result);
_result.downloadFile(result);
        // _result.getBase64FromFile(_result.file_data).then(p => _result.mySrc = p);
        this.final = result;
      },
      error(err) {
        console.log(err.message);
      },
    });
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.file_data = event.target.files[0];
    }
  }
  public getBase64FromFile(file: File): Promise<string> {
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
  downloadFile(data: any) {
    //const blob = new Blob([data], { type: 'image/jpeg' });
    const url = window.URL.createObjectURL(data);
    window.open(url);
  }
}

