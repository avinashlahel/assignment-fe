import { browser,by,element, promise } from "protractor";

export class FileUpload {
    navigateTo(){
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getTable(){
        return browser.element(by.css('tables'));
    }

    getButtons(){
        return browser.element.all(by.css('.uplod-buttons button'));
    }
    
}
