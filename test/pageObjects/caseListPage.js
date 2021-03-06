BasePage = require('./basePage.js')
NavBar = require('./ccd-components/globalNavBar.js');
CaseList= require('./ccd-components/caseListComponent.js');
Footer = require('./ccd-components/footerComponent.js');
CaseFilters = require('./ccd-components/caseFilters.js');

const selfUrlPath = '/list';

class CaseListPage extends BasePage {

  constructor() {
      super();

      this._landingPageFilters = by.css('ccd-workbasket-filters');
      this._createNewCaseButton = '#search-result > .button';

      this._noCasesNotificationBox = $('ccd-search-result .notification');
  }

  async waitForPageLoaded(){
    const EC = protractor.ExpectedConditions;
    let condition = await EC.and(await EC.urlContains('/list/case'), await EC.visibilityOf(element(this._landingPageFilters)));
    await browser.wait(condition,90000);
    browser.ignoreSynchronization = false;
  }


  /**
   * Waits for workbasket search filters to be visible then checks if it is now visible
   *
   * This method is primarily used to wait for the landing page to fully load, once it has loaded we set
   * ignoreSynchronization = false as we can be dure we are now on an angluar page
   * @returns {Promise<boolean>}
   */
  async isFiltersDisplayed(){
      return await element(this._landingPageFilters).isDisplayed()
  }

  /**
   * Return a new instance of the Navigation bar component which is common to many
   * pages and abstracted into it's own class
   * @returns {NavBar|*}
   */
  getNavBarComponent(){
      return new NavBar;
  }

  /**
   * Return a new instance of the Case List Component which is common across both
   * the case list page and search page
   * @returns {CaseListComponent|*}
   */
  getCaseListComponent(){
      return new CaseList;
  }

  /**
   * Return a new instance of the Case Filters dropdowns and apply/reset button
   * which is common on search page and workbasket filters on Case List page
   * @returns {CaseFilters|*}
   */
  getWorkBasketFilters(){
    return new CaseFilters;
  }

  /**
   * returns new instance of the footer component
   * @returns {Footer|*}
   */
  getFooter(){
      return new Footer;
  }

  async clickCreateNewCaseButton(){
      await $(this._createNewCaseButton).click();
  }

  async isNoCasesBoxDisplayed(){
    return await this._noCasesNotificationBox.isPresent() && this._noCasesNotificationBox.isDisplayed();
  }

}

module.exports = CaseListPage;

