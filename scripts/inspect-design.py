"""Read a Figma PDF reference; export text geometry and original embedded images."""
import hashlib
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / '.tools' / 'python'))
import pymupdf

root = pathlib.Path(__file__).resolve().parents[1]
source = pathlib.Path(sys.argv[1])
name = sys.argv[2]
output = root / '.design' / name
output.mkdir(parents=True, exist_ok=True)
media = root / 'public' / 'media'
media.mkdir(parents=True, exist_ok=True)
document = pymupdf.open(source)
result = []
for page in document:
    text = []
    for block in page.get_text('dict')['blocks']:
        for line in block.get('lines', []):
            for span in line.get('spans', []):
                text.append({key: span[key] for key in ('text', 'bbox', 'font', 'size', 'color')})
    images = []
    for entry in page.get_images(full=True):
        xref = entry[0]
        extracted = document.extract_image(xref)
        data = extracted['image']
        digest = hashlib.sha256(data).hexdigest()[:16]
        filename = digest + '.' + extracted['ext']
        target = media / filename
        if not target.exists():
            target.write_bytes(data)
        images.append({'src': '/media/' + filename, 'width': extracted['width'], 'height': extracted['height'], 'rects': [list(rect) for rect in page.get_image_rects(xref)]})
    fills = []
    for drawing in page.get_drawings():
        if drawing['fill'] is not None:
            fills.append({'rect': list(drawing['rect']), 'fill': drawing['fill']})
    result.append({'width': page.rect.width, 'height': page.rect.height, 'text': text, 'images': images, 'fills': fills})
    page.get_pixmap(matrix=pymupdf.Matrix(0.6, 0.6)).save(output / f'page-{page.number}.png')
    (output / f'text-{page.number}.txt').write_text(page.get_text(), encoding='utf-8')
(output / 'layout.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'name': name, 'pages': len(document), 'text_spans': sum(len(p['text']) for p in result), 'images': sum(len(p['images']) for p in result), 'size': [result[0]['width'], result[0]['height']]}, ensure_ascii=False))
