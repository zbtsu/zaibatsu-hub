import React from 'react'

import * as ComboSuite from '@zbtsu/combo-suite'

const App = () => {
  const [state, setState] = React.useState('')
  return (
    // <ComboSuite.IconProvider>
    <div>
      <input onChange={(e) => setState(e.target.value)} value={state} />
      <ComboSuite.ComboPreview combo={state} />
    </div>
    /* </ComboSuite.IconProvider> */
  )
}

export default App
