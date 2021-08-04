import React from 'react'
import { pureCombo, useComboParser } from './ComboParser'
import { useIconContext } from './IconContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  combo: pureCombo[] | string
  tooltipRender?: (tooltip: string, type: pureCombo) => React.ReactElement
  imageRender?: (
    Image: React.FC<React.SVGProps<SVGSVGElement>>,
    type: pureCombo
  ) => React.ReactElement
}

const initialToolTipRender: Props['tooltipRender'] = (tooltip: string) => {
  return <div className='tooltip'>{tooltip}</div>
}

const initialImageRender: Props['imageRender'] = (Image) => {
  return (
    <div className='image'>
      <Image />
    </div>
  )
}

const ComboPreview: React.FC<Props> = ({
  combo,
  tooltipRender = initialToolTipRender,
  imageRender = initialImageRender,
  ...rest
}) => {
  const icons = useIconContext()
  if (!tooltipRender && !imageRender) {
    throw new Error("Either leave the defaults or don't touch this!")
  }
  if (typeof combo === 'string') {
    const parsedCombo = useComboParser(combo)
    return (
      <div {...rest}>
        {parsedCombo.map((e) => {
          const component =
            e.type !== 'tooltip'
              ? imageRender && imageRender(icons.get(e.content), e)
              : tooltipRender && tooltipRender(e.content, e)
          return component
        })}
      </div>
    )
  }
  return (
    <div {...rest}>
      {combo.map((e) => {
        const component =
          e.type !== 'tooltip'
            ? imageRender && imageRender(icons.get(e.content), e)
            : tooltipRender && tooltipRender(e.content, e)
        return component
      })}
    </div>
  )
}

export default ComboPreview
