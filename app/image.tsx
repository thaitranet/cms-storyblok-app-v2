export default function storyblokLoader({
    src,
    width,
    quality,
}: {
    src: string
    width: number
    quality?: number
}) {

    const imageService = '//img2.storyblok.com/'
    const path = src.replace('https://a.storyblok.com', '')
    const size = [width, 0].join('x')
    const filters = `filters:quality(${quality})`
    return `${imageService}${size}/${filters}${path}`
}