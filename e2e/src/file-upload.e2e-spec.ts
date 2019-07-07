import { FileUpload } from "./file-upload.po";
import { browser,logging } from "protractor";

describe('File Upload Component',()=> {
    let page : FileUpload

    beforeEach(() => {
        page = new FileUpload();
    });

    it('should load the table',() => {
        page.navigateTo();
        expect(page.getTable()).toBeTruthy();
    });

    it('should display the buttons',() => {
        page.navigateTo();
        expect(page.getButtons().count()).toBe(2);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry));
      });
})