import sqlite3
import json

file_path = r'e:\HOA IN VH\Web\toeic\toeic-mastery-git\n8n\workflows\toeic-threads-auto-v2.json'
with open(file_path, 'r', encoding='utf-8') as f:
    wf = json.load(f)

for node in wf['nodes']:
    if node['id'] == 'gemini-ai':
        node['parameters'] = {
            'method': 'POST',
            'url': 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=AQ.Ab8RN6Ka4xcuAgCZB6_EVfJ6FplOFIyCxKVxhd5h4GsM0ratQg',
            'sendBody': True,
            'specifyBody': 'json',
            'jsonBody': '={\n  "contents": [\n    {\n      "parts": [\n        {\n          "text": {{ JSON.stringify($json.prompt) }}\n        }\n      ]\n    }\n  ]\n}',
            'options': {
                'timeout': 300000
            }
        }
    elif node['id'] == 'post-threads-container':
        node['parameters'] = {
            'method': 'POST',
            'url': 'https://graph.threads.net/v1.0/me/threads',
            'sendBody': True,
            'contentType': 'form-urlencoded',
            'bodyParameters': {
                'parameters': [
                    { 'name': 'media_type', 'value': 'TEXT' },
                    { 'name': 'text', 'value': '={{ $json.generatedContent }}' },
                    { 'name': 'access_token', 'value': '={{ $json.THREADS_ACCESS_TOKEN }}' }
                ]
            },
            'options': { 'timeout': 60000 }
        }
    elif node['id'] == 'publish-threads-post':
        node['parameters'] = {
            'method': 'POST',
            'url': 'https://graph.threads.net/v1.0/me/threads_publish',
            'sendBody': True,
            'contentType': 'form-urlencoded',
            'bodyParameters': {
                'parameters': [
                    { 'name': 'creation_id', 'value': "={{ $('📱 Tạo bài viết Threads').first().json.id }}" },
                    { 'name': 'access_token', 'value': "={{ $('⚙️ Khởi tạo dữ liệu').first().json.THREADS_ACCESS_TOKEN }}" }
                ]
            },
            'options': { 'timeout': 60000 }
        }

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(wf, f, ensure_ascii=False, indent=2)

db_path = r'C:\Users\Admin\.n8n\database.sqlite'
conn = sqlite3.connect(db_path)
cur = conn.cursor()
cur.execute('UPDATE workflow_entity SET nodes = ?, connections = ? WHERE id = ?', (json.dumps(wf['nodes']), json.dumps(wf['connections']), 'EVOfFrYNPUBugPx3'))
conn.commit()
print('SUCCESS! Timeout set to 300000ms (5 mins). Rows updated:', cur.rowcount)
conn.close()
