module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/enter-account-details";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continueButton() {
    await this.page.click("#continue");
  }

  async back() {
    await this.page.click("#back");
  }

  async goBack() {
    await this.page.goBack();
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator("#error-summary-title")
      .textContent();
    return errorText.trim();
  }

  async enterSortCode(sortCode) {
    await this.page.locator("#sortCode").fill(sortCode);
  }

  async enterAccountNumber(accountNo) {
    await this.page.locator("#accountNumber").fill(accountNo);
  }
};
