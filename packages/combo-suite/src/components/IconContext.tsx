import * as React from 'react'
import initialState from './icons'

const IconContext = React.createContext(initialState)

export const useIconContext = () => React.useContext(IconContext)

const IconProvider: React.FC<{ iconMap?: typeof initialState }> = ({
  children,
  iconMap
}) => {
  return (
    <IconContext.Provider value={iconMap || initialState}>
      {children}
    </IconContext.Provider>
  )
}

export default IconProvider
