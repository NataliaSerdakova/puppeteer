const puppeteer = require('puppeteer');
let browser;

beforeEach(async () => {
	browser = await puppeteer.launch({
		headless: false
	});
});

afterEach(async () => {
	await browser.close();
});

describe("Github page tests", () => {
	let page;

	beforeEach(async () => {
		jest.setTimeout(30000);
		page = await browser.newPage();
		await page.goto("https://github.com/team"); // подгружаем страницу /team
	});

	afterEach(async () => {
		jest.setTimeout(30000);
		await page.close();
	});

	test("The h1 header content'", async () => {
		jest.setTimeout(30000);
		const firstLink = await page.$("header div div a");
		await firstLink.click();
		await page.waitForSelector('h1');
		const title2 = await page.title();
		expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
	}, 30000);

	test("The first link attribute", async () => {
		const actual = await page.$eval("a", link => link.getAttribute('href'));
		expect(actual).toEqual("#start-of-content");
	}, 300);

	test("The page contains Sign in button", async () => {
		const btnSelector = ".btn-large-mktg.btn-mktg";
		await page.waitForSelector(btnSelector, {
			visible: true,
		});
		const actual = await page.$eval(btnSelector, link => link.textContent);
		expect(actual).toContain("Get started with Team")
	}, 200);
});

describe("GitHub Advanced Security Demo Request Test", () => {
	let page;

	beforeEach(async () => {
		jest.setTimeout(30000);
		page = await browser.newPage();
		await page.goto("https://github.com/features/copilot");
	});

	afterEach(async () => {
		jest.setTimeout(30000);
		await page.close();
	});

	test("The first link attribute", async () => {
		jest.setTimeout(40000);
		const buttonGetStarted = await page.waitForSelector('a[data-analytics-event*="get_started_for_free"]');
		await buttonGetStarted.click();

		await page.waitForSelector('h1');

		const title = await page.$eval('h1.text-center[data-view-component]', element => element.innerText);
		expect(title).toEqual('Try Copilot Pro for 30 days free');
	}, 30000);
});

describe("Copilot Feature Page Tests", () => {
	let page;

	beforeEach(async () => {
		jest.setTimeout(30000);
		page = await browser.newPage();
		await page.goto("https://github.com/security/advanced-security");
	});

	afterEach(async () => {
		jest.setTimeout(30000);
		await page.close();
	});

	test("Requesting a demo redirects to the correct page", async () => {
		jest.setTimeout(40000);
		const requestDemoButton = await page.waitForSelector('a.Primer_Brand__Button-module__Button--primary___xIC7G[href*="/security/advanced-security/demo"]');
		await requestDemoButton.click();

		await page.waitForSelector('h1');

		const title = await page.$eval('h1.ContactSalesTemplate-module__heading--MdU6z', el => el.innerText.trim());
		expect(title).toEqual('Get started with GitHub Advanced Security');
	}, 40000);

	test("The page contains GitHub Security link", async () => {
		const linkSelector = '.Primer_Brand__SubNav-module__SubNav__heading___MAxf6';
		await page.waitForSelector(linkSelector, {
			visible: true
		});
		const actual = await page.$eval(linkSelector, link => link.textContent);
		expect(actual).toContain("GitHub Security");
	}, 200);
});



