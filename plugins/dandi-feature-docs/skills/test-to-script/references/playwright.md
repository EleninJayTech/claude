# Playwright 변환 규칙

## 구성
- `tests/e2e/playwright.config.ts`: `baseURL` 은 `process.env.BASE_URL ?? PROJECT.md 의 URL`,
  `use.testIdAttribute: 'data-testid'`, `reporter: [['list'], ['html', { open: 'never' }]]`,
  실패 시 `screenshot: 'only-on-failure'`, `trace: 'retain-on-failure'`.
- 로그인처럼 여러 TC 의 전제가 되는 것은 `tests/e2e/fixtures/auth.ts` 에 fixture 로 두고
  `storageState` 를 재사용한다. 문서의 "전제: 로그인 상태" 는 이 fixture 를 뜻한다.

## 단계 → 코드 매핑
| 문서 단계 | 코드 |
|---|---|
| `URL` 이동 | `await page.goto('/path')` |
| `셀렉터` 에 `값` 입력 | `await page.getByTestId('x').fill('값')` 또는 `page.locator('셀렉터')` |
| `셀렉터` 클릭 | `await page.getByTestId('x').click()` |
| 기대: 텍스트 = `값` | `await expect(locator).toHaveText('값')` |
| 기대: URL 변경 | `await expect(page).toHaveURL(/pattern/)` |
| 기대: 요소 표시 | `await expect(locator).toBeVisible()` |
| 기대: 오류 메시지 | `await expect(page.getByText('메시지')).toBeVisible()` |
| 정리 | `test.afterEach` 또는 케이스 끝에서 API/UI 로 되돌림 |

## 형식
```ts
import { test, expect } from '../fixtures/auth';

test.describe('F-003 로그인', () => {
  test('TC-F003-01 정상 로그인', async ({ page }) => {
    // 전제: 없음
    await page.goto('/login');
    await page.getByTestId('login-id').fill(process.env.TEST_USER_ID!);
    await page.getByTestId('login-pw').fill(process.env.TEST_USER_PW!);
    await page.getByTestId('login-submit').click();
    // 기대
    await expect(page).toHaveURL(/\/dashboard/);
    // 정리: 없음
  });
});
```
- 주석으로 문서의 전제/기대/정리 경계를 남겨 나중에 문서와 대조할 수 있게 한다.
- `waitForTimeout` 은 쓰지 않는다. 기대값 assertion 의 자동 대기로 대신한다.
- 텍스트 셀렉터는 한국어 UI 문구가 바뀌면 깨지므로 testid 를 우선한다.
