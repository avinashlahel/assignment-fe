import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material';

export interface UserElement {
  fname: string;
  lname: string;
  issues: number;
  dob: string;
}

const initialData = [{fname: "", lname: "",issues: null,dob: ""}]

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  tableData: any = initialData;
  
  displayedColumns: string[] = ['fname', 'lname', 'issues', 'dob'];

  // [{fname: "Avinash", lname: "Lahel",issues: 2,dob: "01-02-1986"},
  // {fname: "Rakesh", lname: "Nagaraj",issues: 10,dob: "01-02-1986"}];

  dataSource = new MatTableDataSource(this.tableData);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.tableData = [];
    this.dataSource.sort = this.sort;
  }

  // Sanitize fields to remove any additional quotes added while parsing
  sanitize(fields) {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field.charAt(0) === '"' && field.charAt(field.length - 1) === '"') {
        fields[i] = field.substr(1, field.length - 2);
      }
    }
    return fields;
  }

  // callback function for FileReader in onFileSelect
  onFileLoad(data) {
    const parsedContent = [];
    const csvData = data.target.result;
    const allRecords = csvData.split(/\r\n|\n/);
    const dataRecords = allRecords.slice(1); // Remove the header
    if (dataRecords && dataRecords.length > 0) {
      for (const record of dataRecords) {
        const fields = this.sanitize(record.split(',')); // individual columns
        const obj = {
          fName: fields[0],
          lName: fields[1],
          issues: parseInt(fields[2], 10),
          dob: fields[3]
        };
        parsedContent.push(obj);
      }
    }
    console.log(parsedContent);
    // this.tableData = parsedContent;
  }

  onFileSelect(input) {
    const files = input.files;
    if (files && files.length > 0) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad.bind(this); // bind 'this' as its a callback
      fileReader.readAsText(fileToRead, 'UTF-8');
    }
  }

  onSubmit() {
    console.log('Submitted');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
