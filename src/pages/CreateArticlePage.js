import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillArticleFormTitle(title) {
    await test.step('Fill the article title field', async () => {
      await this.page.getByPlaceholder('Article Title').fill(title);
    });
  }

  async fillArticleFormDescription(description) {
    await test.step('Fill the article description field', async () => {
      await this.page
        .getByPlaceholder("What's this article about?")
        .fill(description);
    });
  }

  async fillArticleFormBody(body) {
    await test.step('Fill the article body field', async () => {
      await this.page
        .getByPlaceholder('Write your article (in markdown)')
        .fill(body);
    });
  }

  async fillArticleFormTag(tags) {
    await test.step('Fill the article tags field', async () => {
      await this.page.getByPlaceholder('Enter tags').fill(tags);
      await this.page.keyboard.press('Enter');
    });
  }

  async assertArticleTitleIsCorrect(title) {
    await test.step(`Assert the article title is correct`, async () => {
      await expect(
        this.page.getByRole('heading', { name: title }),
      ).toBeVisible();
    });
  }

  async assertArticleBodyIsCorrect(body) {
    await test.step(`Assert the article body is correct`, async () => {
      await expect(
        this.page.locator('.col-md-12').filter({ hasText: body }),
      ).toBeVisible();
    });
  }

  async assertArticleTagsAreCorrect(tags) {
    await test.step(`Assert the article tags are correct`, async () => {
      await expect(
        this.page.locator('.tag-default').filter({ hasText: tags }),
      ).toBeVisible();
    });
  }

  async assertArticleTagsAreNotVisible() {
    await test.step(`Assert the article tags are not visible`, async () => {
      await expect(this.page.locator('.tag-default')).not.toBeVisible();
    });
  }
}
