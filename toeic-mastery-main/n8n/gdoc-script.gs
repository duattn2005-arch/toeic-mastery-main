// Paste into the Google Doc: Extensions > Apps Script. Deploy > New deployment > Web app,
// "Execute as: Me", "Who has access: Anyone". Copy the web app URL into GDOC_WEBHOOK_URL.
var DOC_ID = '1JRk5-EpJgaiK4dNcI7n5tlT2eoGoBGtedJkdUzUiGAE';

function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var body = DocumentApp.openById(DOC_ID).getBody();
  var when = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM HH:mm');

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

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
