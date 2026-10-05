# Contextual PNG icons - 5 October 2026

Generated twelve separate transparent PNGs with the built-in image tool. The intended palette follows the existing navy and gold CI. All selected outputs were copied into `public/icons/context`; project references do not depend on the generation cache. Exact prompts and output provenance are in `PNG_ICON_PROMPTS.json`. `PNG_ICON_LIBRARY.html` provides a browsable download sheet with 28, 48 and 80 px previews.

## Meaning and placement

| Icon                       | Representation                                  | Placement                                                          |
| -------------------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| Trousers                   | Waistband and two long legs                     | Showcase and directory                                             |
| Shirts                     | Collared short-sleeved shirt                    | Showcase, directory, sample stage and garment form section         |
| Elephant shirts & trousers | Elephant-patterned garment set                  | Showcase and directory                                             |
| Sleepwear                  | Pyjama top and trousers                         | Showcase and directory                                             |
| Dresses                    | Strapped dress with shaped waist and flared hem | Showcase and directory                                             |
| Skirts                     | Waistband and pleated skirt                     | Showcase and directory                                             |
| Adults                     | T-shirt and long trousers                       | Adult collection headings                                          |
| Children                   | Small T-shirt and shorts                        | Children collection links; replaces the face icon                  |
| Fabric                     | Fabric roll and draped cloth                    | Fabric and material selection headings                             |
| Sewing                     | Sewing machine and thread                       | Manufacturing, production process and factory partnership sections |
| Quality                    | Garment inspection magnifier with check mark    | Quality section, workflow and sample-check cue                     |
| Brief                      | Clipboard and pencil                            | Project entry points, planning, contact and requirement sections   |

The user authorised MUI for other parts. Sharp SVGs therefore continue to provide conventional arrows, navigation, search, upload, calculator, delivery and identity controls. The six-step OEM workflow now pairs each existing step label with a relevant PNG or MUI symbol. Visible text supplies precise meaning; PNG images use empty alt text and `aria-hidden="true"`. Symbol comprehension has been visually reviewed, but not tested with representative visitors.

## Verification

- All twelve sources are PNGs with alpha channels containing both fully transparent and opaque pixels. Source dimensions are 1254 x 1254 px. Combined source size is 6,384,098 bytes; Next Image serves responsive sizes rather than the original files in the interface. See `PNG_ICON_ASSET_CHECK.json`.
- Final production build, lint and TypeScript checks passed. All eleven existing tests passed.
- `check:site` verified eight routes, 57 internal links and 54 rendered assets, plus existing 404, enquiry validation, origin and unconfigured-delivery checks.
- `check:products` verified all fifteen rendered taxonomy destinations, selected filters, reference membership and the Children empty state.
- Browser: all six showcase garment PNGs loaded successfully through Next Image. The Children entry opened `/oem-products?audience=children`.
- Desktop showcase and mega menu, six workflow steps and mobile form headings were visually inspected. Mouse and keyboard opening of the mega menu worked at the normal viewport.
- Twenty-four DOM layout checks covered all eight routes at widths 360, 768 and 1440 px. None showed horizontal page overflow. Every rendered contextual PNG retained its decorative accessibility attributes.
- `git diff --check` passed. Temporary viewport overrides were reset after QA.

Local production preview: `http://127.0.0.1:3001/`.
