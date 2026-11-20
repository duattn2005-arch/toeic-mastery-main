import "server-only";
import nodemailer from "nodemailer";

const EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set. Copy .env.example to .env and configure it.`);
  return value;
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

/** Sends straight from the Gmail account in GMAIL_USER using a Google App
 * Password (Google Account > Security > 2-Step Verification > App passwords). */
async function sendGmail(to: string, subject: string, html: string): Promise<void> {
  const user = requireEnv("GMAIL_USER");
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass: requireEnv("GMAIL_APP_PASSWORD") },
  });
  await transporter.sendMail({ from: `"TOEIC Mastery" <${user}>`, to, subject, html });
}

/** shortcut: EmailJS fallback only for servers without GMAIL_APP_PASSWORD yet; delete once the VPS .env has it. */
async function sendEmailJs(templateId: string, templateParams: Record<string, string>): Promise<void> {
  const response = await fetch(EMAILJS_API_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      service_id: requireEnv("EMAILJS_SERVICE_ID"),
      template_id: templateId,
      user_id: requireEnv("EMAILJS_PUBLIC_KEY"),
      accessToken: process.env.EMAILJS_PRIVATE_KEY || undefined,
      template_params: templateParams,
    }),
  });

  if (!response.ok) {
    throw new Error(`EmailJS send failed (${response.status}): ${await response.text()}`);
  }
}

const useGmail = () => Boolean(process.env.GMAIL_APP_PASSWORD);

function layout(body: string): string {
  return `<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#1f2937;line-height:1.6">${body}<p style="color:#6b7280;font-size:13px;margin-top:24px">TOEIC Mastery</p></div>`;
}

/** Fired from grantProDays() (src/lib/services/pro-grant.ts) right after a
 * Pro purchase/grant lands, regardless of which path granted it. */
export async function sendProConfirmationEmail(params: {
  toEmail: string;
  toName: string;
  planName: string;
  expiresAt: string;
}): Promise<void> {
  if (useGmail()) {
    await sendGmail(
      params.toEmail,
      "Xác nhận nâng cấp Pro thành công - TOEIC Mastery",
      layout(
        `<h2 style="color:#0f766e">🎉 Nâng cấp Pro thành công!</h2>
<p>Chào ${escapeHtml(params.toName)},</p>
<p>Tài khoản của bạn đã được nâng cấp lên <b>${escapeHtml(params.planName)}</b>.</p>
<p>Hạn sử dụng Pro: <b>${escapeHtml(params.expiresAt)}</b>.</p>
<p>Chúc bạn học tốt và đạt điểm TOEIC mục tiêu!</p>`,
      ),
    );
    return;
  }
  const templateId = process.env.EMAILJS_TEMPLATE_ID_PRO_CONFIRM;
  if (!templateId) return; // Not configured yet — a missing template must never block granting Pro.
  await sendEmailJs(templateId, {
    to_email: params.toEmail,
    to_name: params.toName,
    plan_name: params.planName,
    expires_at: params.expiresAt,
  });
}

/** Forgot-password OTP email — see requestPasswordResetAction in
 * src/app/(auth)/actions.ts. Unlike sendProConfirmationEmail, a failed send
 * here throws: the caller needs to know the code didn't go out. */
export async function sendPasswordResetCodeEmail(params: {
  toEmail: string;
  toName: string;
  otpCode: string;
  expiresMinutes: number;
}): Promise<void> {
  if (useGmail()) {
    await sendGmail(
      params.toEmail,
      `Mã đặt lại mật khẩu: ${params.otpCode} - TOEIC Mastery`,
      layout(
        `<p>Chào ${escapeHtml(params.toName)},</p>
<p>Mã đặt lại mật khẩu của bạn là:</p>
<p style="font-size:28px;font-weight:bold;letter-spacing:6px;color:#0f766e">${escapeHtml(params.otpCode)}</p>
<p>Mã có hiệu lực trong ${params.expiresMinutes} phút. Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.</p>`,
      ),
    );
    return;
  }
  const templateId = requireEnv("EMAILJS_TEMPLATE_ID_PASSWORD_RESET");
  await sendEmailJs(templateId, {
    to_email: params.toEmail,
    to_name: params.toName,
    otp_code: params.otpCode,
    expires_minutes: String(params.expiresMinutes),
  });
}
