import { NgxCliElectronTestPage } from './app.po';

describe('ngx-cli-electron-test App', () => {
  let page: NgxCliElectronTestPage;

  beforeEach(() => {
    page = new NgxCliElectronTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
