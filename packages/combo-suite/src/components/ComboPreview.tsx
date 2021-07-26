import React from 'react'
import { pureCombo, useComboParser } from './ComboParser'
import { useIconContext } from './IconContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  combo: pureCombo[] | string
  tooltipRender?: (
    tooltip: string,
    divProps?: React.HTMLAttributes<HTMLDivElement>
  ) => React.ReactElement
  imageRender?: (
    Image: React.FC<React.SVGProps<SVGSVGElement>>,
    divProps?: React.HTMLAttributes<HTMLDivElement>,
    svgProps?: React.SVGProps<SVGSVGElement>
  ) => React.ReactElement
}

const initialToolTipRender = (
  tooltip: string,
  divProps?: React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <div className='tooltip' {...divProps}>
      {tooltip}
    </div>
  )
}

const initialImageRender: Props['imageRender'] = (
  Image,
  divProps,
  svgProps
) => {
  return (
    <div className='image' {...divProps}>
      <Image {...svgProps} />
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
              ? imageRender && imageRender(icons.get(e.content))
              : tooltipRender && tooltipRender(e.content)
          console.log({ component, imageRender, tooltipRender })
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
            ? imageRender && imageRender(icons.get(e.content))
            : tooltipRender && tooltipRender(e.content)
        return component
      })}
    </div>
  )
}

export default ComboPreview
