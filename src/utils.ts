function degreeToRadian(degree: number): number {
  return degree * (Math.PI / 180)
}

function getTriangleSideLengths(degree: number, imageHeight: number) {
  const r = degreeToRadian(Math.abs(degree))
  const a = imageHeight * Math.cos(r)
  const b = imageHeight * Math.sin(r)
  return {
    height: a,
    width: b,
  }
}

function getShapeOutsidePolygon({
  height,
  width,
  offset = 0,
}: {
  height: number
  width: number
  offset?: number
}): string {
  return `polygon(
		${width + offset}px ${offset}px, 
		calc(100% - ${offset}px) calc(100% - ${height + offset}px), 
		calc(100% - ${width + offset}px) calc(100% - ${offset}px), 
		${offset}px ${height + offset}px
	)`
}

function getNegativeShapeOutsidePolygon({
  height,
  width,
  offset = 0,
}: {
  height: number
  width: number
  offset?: number
}): string {
  return `polygon(
		calc(100% - ${width + offset}px) ${offset}px, 
		calc(100% - ${offset}px) ${height + offset}px, 
		${width + offset}px calc(100% - ${offset}px), 
		${offset}px calc(100% - ${height + offset}px)
	)`
}

export function updateStyles(
  rootEl: HTMLElement,
  img: HTMLImageElement,
  rotate: number,
  float?: Alignment,
  offset = 24
): void {
  const realImgHeight = img.offsetHeight
  const triangleSideLengths = getTriangleSideLengths(rotate, realImgHeight)
  if (img?.style) {
    img.style.transform = `rotate(${rotate}deg)`
  }
  const { height, width } = img.getBoundingClientRect()

  if (rootEl?.style) {
    rootEl.style.display = 'grid'
    rootEl.style.justifyContent = 'center'
    rootEl.style.alignItems = 'center'
    rootEl.style.shapeMargin = '1rem'
    rootEl.style.height = `calc(${height}px + ${offset * 2}px)`
    rootEl.style.width = `calc(${width}px + ${offset * 2}px)`
    rootEl.style.shapeOutside =
      rotate >= 0
        ? getShapeOutsidePolygon({ ...triangleSideLengths, offset })
        : getNegativeShapeOutsidePolygon({ ...triangleSideLengths, offset })
    if (float) {
      rootEl.style.float = float
    }
  }
}

export type Alignment = 'left' | 'right' | null | undefined
