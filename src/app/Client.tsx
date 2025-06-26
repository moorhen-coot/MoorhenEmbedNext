'use client'
import { WrappedMoorhen } from './WrappedMoorhen';
import { Provider } from 'react-redux';
import { MoorhenReduxStore } from 'moorhen'

export const Client = () => {
  return (
  <div style={{width:"600px",maxWidth:"600px"}}>
      <Provider store={MoorhenReduxStore}>
          <WrappedMoorhen/>
      </Provider>
  </div>
  )
}
