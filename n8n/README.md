# n8n AI Agent cho TOEIC Mastery

Thư mục này chứa các workflow [n8n](https://n8n.io) để build AI agent. Chỉ có file workflow (JSON), không có mã nguồn n8n.

## Workflow

| File | Mô tả |
| --- | --- |
| `workflows/toeic-tutor-agent.json` | Trợ lý luyện thi TOEIC dạng chat: Chat Trigger → AI Agent, dùng Claude (`claude-sonnet-5-5`) và Simple Memory nhớ 10 lượt gần nhất. |

## Chạy n8n

Cách nhanh nhất (cần Node.js 24+):

```bash
npx n8n
```

Hoặc build từ mã nguồn n8n (cần pnpm 12.4+):

```bash
pnpm install
pnpm build
pnpm start
```

Sau đó mở http://localhost:5678 và tạo tài khoản owner.

## Import workflow

1. Trong n8n chọn **Create workflow** → menu **⋯** → **Import from File…** → chọn file trong `workflows/`.
2. Mở node **Anthropic Chat Model** → **Credential** → **Create new**, dán Anthropic API key (lấy tại https://console.anthropic.com).
3. Bấm **Open chat** ở cuối màn hình để thử agent.
4. Muốn nhúng chat vào web: bật **Make Chat Publicly Available** trong node chat trigger, rồi **Publish** workflow.

> Không commit API key. Credential được lưu trong n8n, không nằm trong file JSON.
