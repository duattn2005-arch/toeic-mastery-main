// Paste into the Google Doc's Apps Script (Extensions > Apps Script), replacing everything.
// 1) Run `setup` once (authorise when asked): it creates a trigger that runs `pullDrafts` every 15 minutes.
// 2) That is all. No web app / deployment needed.
//
// n8n publishes each group draft to the public `drafts` branch of the repo (drafts.json);
// this script reads it and appends the drafts it has not added yet to the document.
var DOC_ID = '1JRk5-EpJgaiK4dNcI7n5tlT2eoGoBGtedJkdUzUiGAE';
var FEED = 'https://raw.githubusercontent.com/duattn2005-arch/toeic-mastery-main/drafts/drafts.json';

function setup() {
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('pullDrafts').timeBased().everyMinutes(15).create();
  pullDrafts();
}

function pullDrafts() {
  var props = PropertiesService.getScriptProperties();
  var lastId = Number(props.getProperty('lastId') || 0);
  var res = UrlFetchApp.fetch(FEED + '?t=' + Date.now(), { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) return;
  var fresh = JSON.parse(res.getContentText()).filter(function (d) { return d.id > lastId; }).reverse(); // oldest first
  if (!fresh.length) return;

  var body = DocumentApp.openById(DOC_ID).getBody();
  fresh.forEach(function (d) {
    var when = Utilities.formatDate(new Date(d.at), 'Asia/Ho_Chi_Minh', 'dd/MM HH:mm');
    body.appendParagraph(when + '  ·  ' + d.kind).setHeading(DocumentApp.ParagraphHeading.HEADING2);
    if (d.imageUrl) {
      try {
        var img = body.appendImage(UrlFetchApp.fetch(d.imageUrl).getBlob());
        var w = img.getWidth(), h = img.getHeight();
        img.setWidth(300).setHeight(Math.round(300 * h / w));
      } catch (err) {
        body.appendParagraph('(ảnh: ' + d.imageUrl + ')');
      }
    }
    body.appendParagraph('BÀI ĐĂNG').setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(d.post);
    body.appendParagraph(d.commentLater ? 'COMMENT ĐÁP ÁN (đăng sau 1-3 giờ)' : 'COMMENT ĐẦU TIÊN (đăng ngay sau bài)').setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(d.comment);
    body.appendHorizontalRule();
    props.setProperty('lastId', String(d.id));
  });
}
