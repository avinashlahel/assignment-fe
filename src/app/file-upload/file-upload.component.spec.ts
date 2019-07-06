import { async, ComponentFixture, TestBed } from "@angular/core/testing";
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

  it("should  create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the table", () => {
    expect(debugElement.query(By.css("table"))).toBeTruthy();
  });

  it("should load the data in the table", () => {
    const testData = [
      { fname: "Ricky", lname: "Ponting", issues: 2, dob: "01-02-1986" },
      { fname: "Mathew", lname: "Hayden", issues: 10, dob: "01-02-1986" }
    ];

    component.dataSource = new MatTableDataSource(testData);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    //Assertions
    expect(element.querySelectorAll("tr").length).toEqual(3);
    expect(element.textContent).toContain("Ricky");
    expect(element.textContent).toContain("Hayden");
  });
});
