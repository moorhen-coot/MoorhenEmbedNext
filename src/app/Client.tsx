'use client'
import { WrappedMoorhen } from './WrappedMoorhen';
import { Provider } from 'react-redux';
import { MoorhenReduxStore } from 'moorhen'

export const Client = () => {
  return (
      <Provider store={MoorhenReduxStore}>
          <WrappedMoorhen/>
      </Provider>
  )
}
