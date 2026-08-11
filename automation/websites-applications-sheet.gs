/**
 * Appends /websites applications to the August Website Offer sheet.
 *
 * One-time setup (Fatema, about two minutes):
 *   1. Open the sheet:
 *      https://docs.google.com/spreadsheets/d/1KLfkQ63v9DEcxrW97JfmR2-iGJMR4dqXqSV0IlmoMUU
 *   2. Extensions > Apps Script. Delete whatever is there, paste this file, save.
 *   3. Deploy > New deployment > type "Web app".
 *        Execute as: Me
 *        Who has access: Anyone
 *      Deploy, then authorize when Google asks.
 *   4. Copy the Web app URL and set it on the server as FORMS_SHEET_WEBHOOK_URL
 *      (Vercel > project > Settings > Environment Variables), then redeploy.
 *
 * Until that env var exists the site simply skips the sheet write. Applications
 * are still stored in Postgres and still emailed, so nothing is ever lost.
 */

var SHEET_ID = '1KLfkQ63v9DEcxrW97JfmR2-iGJMR4dqXqSV0IlmoMUU';

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

    sheet.appendRow([
      new Date(),
      payload.name || '',
      payload.brandName || '',
      payload.email || '',
      payload.whatsapp || '',
      payload.instagram || '',
      payload.currentWebsite || '',
      payload.brandDescription || '',
      payload.journeyStage || '',
      payload.needsEcommerce || '',
      payload.assets48h || '',
      payload.decisionMaker || '',
      payload.liveWhen || '',
      payload.currentSiteProblem || '',
      payload.termsAccepted || '',
      'New',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
