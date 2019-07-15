import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  ElementRef
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, MatSnackBar } from "@angular/material";
import {throwError} from 'rxjs';

export interface UserElement {
  fName: string;
  lName: string;
  issues: number;
  dob: string;
}

const initialData = [{ fName: "", lName: "", issues: null, dob: "" }];

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"]
})
export class FileUploadComponent implements OnInit, OnChanges {
  tableData: Array<UserElement>;
  dataSource: MatTableDataSource<any>;
  displayError: boolean = false;
  // [{fname: "Ricky", lname: "Ponting",issues: 2,dob: "01-02-1986"},
  // {fname: "Adam", lname: "Gilchrist",issues: 10,dob: "01-02-1986"}];

  displayedColumns: string[] = ["fname", "lname", "issues", "dob"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("fileInput", null) fileInput: ElementRef;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.tableData = initialData;
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // for any manual changes after change detection
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
    try {

      const csvData = data.target.result;
      const allRecords = csvData.split(/\r\n|\n/);
      const dataRecords = allRecords.slice(1); // Remove the header
      if (dataRecords && dataRecords.length > 0) {
        for (const record of dataRecords) {
          const fields = this.sanitize(record.split(",")); // individual columns
          if(!isNaN(fields[0]) || !isNaN(fields[1]) || isNaN(fields[2]) || !isNaN(fields[3]))
            throw "Error found in contract";
          const obj = {
            fName: fields[0],
            lName: fields[1],
            issues: parseInt(fields[2], 10),
            dob: this.formatDob(fields[3])
          };
          parsedContent.push(obj);
        }
      }
    } catch (err) {
      this.showError("Error parsing the document, please verify the contract & try again!");
    }
    this.tableData = parsedContent;
  }

  onFileSelect(input) {
    try {
      const files = input.files;
      if (files && files.length > 0) {
        const fileToRead = files[0];
        const fileType = fileToRead.type;
        if(fileType && fileType.toLowerCase() != "text/csv")
          throw "Only CSV files are supported at the moment";
        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad.bind(this); // bind 'this' as its a callback
        fileReader.readAsText(fileToRead, "UTF-8");
      }
    } catch (err) {
      this.showError(err);
    }
  }

  showError(err) {
    this.onClear();
    this._snackBar.open(err, "", {
      duration: 3000,
    });
  }

  onSubmit() {
    console.log("Submitted"); //TODO
  }

  onUpload() {
    if (this.tableData && this.tableData.length == 0){
      this.showError("Either no file chosen or file data incorrect");
      return;
    }
    this.dataSource.data = this.tableData;
  }

  onClear() {
    this.tableData = initialData;
    this.dataSource.data = this.tableData;
    this.fileInput.nativeElement.value = "";
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatDob(date: string) {
    if (date && date.indexOf("T") >= 0) {
      let dobArray = date.split("T");
      return dobArray[0];
    }
    return date;
  }
}
