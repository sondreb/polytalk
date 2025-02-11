import { browser, by, element } from 'protractor';

describe('PolyTalk App', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should display the home page', () => {
    expect(element(by.css('app-home h1')).getText()).toEqual('Learn Any Language with PolyTalk');
  });

  it('should navigate to the About page', () => {
    element(by.css('a[routerLink="/about"]')).click();
    expect(element(by.css('app-about h1')).getText()).toEqual('About PolyTalk');
  });

  it('should navigate to the Blog page', () => {
    element(by.css('a[routerLink="/blog"]')).click();
    expect(element(by.css('app-blog h1')).getText()).toEqual('Blog');
  });

  it('should navigate to the Language Selection page', () => {
    element(by.css('a[routerLink="/languages"]')).click();
    expect(element(by.css('app-language-selection h1')).getText()).toEqual('Select a Language');
  });

  it('should navigate to the Learning page', () => {
    element(by.css('a[routerLink="/learn"]')).click();
    expect(element(by.css('app-learning h1')).getText()).toEqual('Learning');
  });

  it('should navigate to the Privacy page', () => {
    element(by.css('a[routerLink="/privacy"]')).click();
    expect(element(by.css('app-privacy h1')).getText()).toEqual('Privacy Policy');
  });

  it('should navigate to the Settings page', () => {
    element(by.css('a[routerLink="/settings"]')).click();
    expect(element(by.css('app-settings h1')).getText()).toEqual('Settings');
  });

  it('should navigate to the Terms page', () => {
    element(by.css('a[routerLink="/terms"]')).click();
    expect(element(by.css('app-terms h1')).getText()).toEqual('Terms of Service');
  });
});
