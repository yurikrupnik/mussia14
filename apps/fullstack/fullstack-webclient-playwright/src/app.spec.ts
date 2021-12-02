import { baseUrl } from './utils';

it('should start page', async () => {
  console.log('baseUrl', baseUrl);
  await page.goto(`${baseUrl}`);

  expect(true).toBeTruthy();
});
