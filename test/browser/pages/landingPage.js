module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/prove-identity-bank-account";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continueToAccountDetails() {
    await this.page.click("#landingPageContinue");
  }

  async clickHowWeUseBankDetails() {
    await this.page.click(".govuk-details__summary-text");
  }

  async clickFindOtherWaysToProveIdentity() {
    await this.page.click('[href*="/abort"]');
  }

  async isHowWeUseBankDetailsSectionDisplayed() {
    const { expect } = require("@playwright/test");
    expect(
      await this.page.locator(".instruction:nth-child(1)").textContent()
    ).toEqual("We will not save or share your account details.");
    expect(
      await this.page.locator(".instruction:nth-child(2)").textContent()
    ).toEqual("We do not use your account details to:");
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator("#error-summary-title")
      .textContent();
    return errorText.trim();
  }
};
