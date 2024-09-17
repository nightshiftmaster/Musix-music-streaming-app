const { launch } = require("puppeteer");

const appUrl = "http://localhost:3000/";

let browser;
let page;

describe("checking application", () => {
  beforeAll(async () => {
    browser = await launch({ headless: "new" });
    page = await browser.newPage();
  });

  test("Mainpage checking elements", async () => {
    await page.goto(appUrl);
    await page.waitForSelector('[data-testid="main-screen"]');
    await page.waitForSelector('[data-testid="sidebar"]');
    await page.waitForSelector('[data-testid="discover"]');
    await page.waitForSelector('[data-testid="top-play"]');
    await page.waitForSelector('[data-testid="search-bar"]');
  });
  test("testing discover", async () => {
    await page.goto(appUrl);
    await page.waitForSelector('[data-testid="discover"]');
    await page.select("#genres", "DANCE");
    const danceSongs = await page.waitForSelector('[data-testid="songs-bar"]');
    const discoverDance = await page.$eval("body", (e) => e.innerHTML);
    expect(discoverDance).toContain("Discover Dance");
    await page.select("#genres", "POP");
    const popSongs = await page.waitForSelector('[data-testid="songs-bar"]');
    const discoverPop = await page.$eval("body", (e) => e.innerHTML);
    expect(discoverPop).toContain("Discover Pop");
    expect(discoverPop).toContain("song-card");
    expect(danceSongs).not.toBe(popSongs);
  });

  test("testing Around You", async () => {
    await page.goto(appUrl);
    await page.evaluate(() => {
      document.querySelector(`[data-testid="sidebar"]`).style.display = "flex";
    });
    await page.click('a[href="/around-you"]');
    const aroundYouTitle = await page.$eval("body", (e) => e.innerHTML);
    await page.waitForSelector('[data-testid="around-you-songs"]');
    const songsAmount = await page.evaluate(() => {
      return Array.from(
        document.querySelector('[data-testid="around-you-songs"]').children
      ).length;
    });
    expect(aroundYouTitle).toContain("Around You");
    expect(songsAmount).not.toBe(0);
  });

  test("testing Top Artists", async () => {
    await page.goto(appUrl);
    await page.evaluate(() => {
      document.querySelector(`[data-testid="sidebar"]`).style.display = "flex";
    });
    await page.click('a[href="/top-artists"]');
    const topArtists = await page.$eval("body", (e) => e.innerHTML);
    await page.waitForSelector('[data-testid="artists-bar"]');
    const artistsAmount = await page.evaluate(() => {
      return Array.from(
        document.querySelector('[data-testid="artists-bar"]').children
      ).length;
    });

    const artistCard = await page.$eval(
      '[data-testid="artists-bar"]',
      (e) => e.innerHTML
    );

    await page.waitForSelector('[data-testid="artist-card"]');
    expect(topArtists).toContain("Top Artists Pop");
    expect(artistsAmount).not.toBe(0);
    expect(artistCard).toContain("artist-card");
  });

  test("testing Top Charts", async () => {
    await page.goto(appUrl);
    await page.evaluate(() => {
      document.querySelector(`[data-testid="sidebar"]`).style.display = "flex";
    });

    await page.click('a[href="/top-charts"]');
    const topCharts = await page.$eval("body", (e) => e.innerHTML);
    await page.waitForSelector('[data-testid="top-songs-container"]');
    const songsAmount = await page.evaluate(() => {
      return Array.from(
        document.querySelector('[data-testid="top-songs-container"]').children
      ).length;
    });
    expect(topCharts).toContain("Top Charts Pop");
    expect(songsAmount).not.toBe(0);
  });

  test("testing Artist Page", async () => {
    await page.goto(appUrl);
    await page.evaluate(() => {
      document.querySelector(`[data-testid="sidebar"]`).style.display = "flex";
    });
    await page.click('a[href="/top-artists"]');
    await page.waitForSelector('[data-testid="artist-card"]');
    await page.click('[data-testid="artist-card"]');
    await page.waitForSelector('[data-testid="artist-details"]');
    await page.waitForSelector('[data-testid="details-header"]');
    await page.waitForSelector('[data-testid="related-songs"]');
  });

  test("testing search & autocomplete", async () => {
    await page.goto(appUrl);
    await page.type("#search-field", "n");
    await page.waitForSelector('[data-testid="auto-complete"]');
    await page.waitForSelector("#auto-complete-element");

    const liElements = await page.$$eval("#auto-complete-element", (lis) => {
      return lis.map((li) => li.textContent);
    });

    expect(liElements).toContain("Netta");
    expect(liElements).toContain("Nicky Jam");
    expect(liElements).toContain("Nickelback");
  });

  test("search results", async () => {
    await page.goto(appUrl);
    await page.type("#search-field", "jain");
    await page.keyboard.press("Enter");
    await page.waitForSelector('[data-testid="search-page"]');
    const artist = await page.$eval("span", (e) => e.textContent);

    const searchPageTitle = await page.$eval(
      '[data-testid="search-page"]',
      (e) => e.innerHTML
    );

    expect(searchPageTitle).toContain("Showing results for ");
    expect(artist).toContain("jain");
  });

  afterAll(async () => {
    await browser.close();
  });
});
