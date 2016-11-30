import { CrossFadePage } from './app.po';

describe('cross-fade App', function() {
  let page: CrossFadePage;

  beforeEach(() => {
    page = new CrossFadePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
