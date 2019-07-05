import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  // callback function for FileReader
  onFileLoad(data) {
    const csvData = data.target.result;
    const allRecords = csvData.split(/\r\n|\n/);
    const dataRecords = allRecords.slice(1); // Remove the header
    if (dataRecords && dataRecords.length > 0) {
      dataRecords.forEach((row) => {
        console.log(row);
      });
    }
  }

  onFileSelect(input) {
    const files = input.files;
    if (files && files.length > 0) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;
      fileReader.readAsText(fileToRead, 'UTF-8');
    }
  }

  onSubmit() {
    console.log('Submitted');
  }

}
