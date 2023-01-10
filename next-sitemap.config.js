/** @type {import('next-sitemap').IConfig} */
module.exports = {
  priority: 1,
  siteUrl: process.env.SITE_URL || "https://www.skyrealm.ai",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  autoLastmod: false,
};
