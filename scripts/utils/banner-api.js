import { BANNER_APP_ID } from "../constants.js";
import { ChapterBannerApp } from "../apps/banner.js";

export function getBannerInstance() {
  return foundry.applications.instances.get(BANNER_APP_ID);
}

export async function openBanner() {
  let app = getBannerInstance();
  if (!app) {
    app = new ChapterBannerApp();
  }
  await app.render(true);
  return app;
}

export async function closeBanner() {
  const app = getBannerInstance();
  if (app) await app.close();
}
