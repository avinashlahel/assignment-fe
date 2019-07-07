import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  ComponentFixtureAutoDetect,
  fakeAsync,
  flush
} from "@angular/core/testing";
import { FileUploadComponent } from "./file-upload.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatSortModule,
  MatToolbarModule,
  MatTableDataSource
} from "@angular/material";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("FileUploadComponent", () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let debugElement: DebugElement;

  //test bed for uploading a file programatically
  const readfileContent = () => {
    const csvTestData = `FName,LName,Issues,Dob\r\nLinus,Torvalds,5,02/01/86\r\nJohn,Resig,3,01/01/86\r\nRod,Johnson,2,02/01/86`;
    return new File([csvTestData], "test_bed.csv", { type: "text/csv" });
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should  create component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the table", () => {
    expect(debugElement.query(By.css("table"))).toBeTruthy();
  });

  it("should load the data in the table", () => {
    const testData = [
      { fName: "Ricky", lName: "Ponting", issues: 2, dob: "01-02-1986" },
      { fName: "Mathew", lName: "Hayden", issues: 10, dob: "01-02-1986" }
    ];
    component.dataSource = new MatTableDataSource(testData);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    //Assertions
    expect(element.querySelectorAll("tr").length).toEqual(3);
    expect(element.textContent).toContain("Ricky");
    expect(element.textContent).toContain("Hayden");
  });

  it("should be able to upload a CSV file", (done: DoneFn) => {
    let nativeElem = debugElement.nativeElement;
    let uploadElement: HTMLInputElement = nativeElem.querySelector(
      "#fileInput"
    );
    let list = new DataTransfer();
    let file = readfileContent();
    list.items.add(file);
    let myFileList = list.files;
    uploadElement.files = myFileList;
    uploadElement.dispatchEvent(new Event("change"));

    setTimeout(() => {
      fixture.detectChanges();
      let table = fixture.debugElement.nativeElement.querySelector("table");
      const tContent = table.textContent;
      expect(tContent).toContain("Linus");
      expect(tContent).toContain("Resig");
      expect(tContent).toContain(2);
      done();
    }, 100);
  });
});
