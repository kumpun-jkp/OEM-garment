"""Join PDF font fragments on the same baseline for source-property inspection."""
import json
import pathlib
import sys

root = pathlib.Path(__file__).resolve().parents[1]
page = json.loads((root / '.design' / sys.argv[1] / 'layout.json').read_text(encoding='utf-8'))[0]
start, end = float(sys.argv[2]), float(sys.argv[3])
groups = {}
for span in page['text']:
    if start <= span['bbox'][1] <= end:
        key = (round(span['bbox'][1], 1), round(span['size'], 1))
        groups.setdefault(key, []).append(span)
for (y, size), spans in sorted(groups.items()):
    spans.sort(key=lambda span: span['bbox'][0])
    text = ''.join(span['text'] for span in spans).strip()
    print(json.dumps({'y': y, 'size': size, 'x': round(spans[0]['bbox'][0], 1), 'text': text}, ensure_ascii=True))
