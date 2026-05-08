import groq from 'groq'

export const pageQuery = groq`*[_type == "page" && slug == $slug][0]{
  _id, title, slug,
  blocks[] {
    _type, _key,
    tagline, title, description,
    "imageUrl": image.asset->url,
    ctaLabel, ctaLink,
    eyebrow, titleHighlight, subtitle,
    content,
    caption, fullWidth,
    "imageUrls": images[].asset->url,
    columns,
    buttonLabel, buttonLink,
    block1Label, block1Text, block2Label, block2Text,
    sectionTitle, sectionSubtitle,
    card1Description, "card1ImageUrl": card1Image.asset->url,
    card2Description, "card2ImageUrl": card2Image.asset->url,
  }
}`
