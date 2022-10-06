import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Oidc from '@axa-fr/react-oidc/dist/vanilla/oidc'
import { OidcProvider, OidcSecure } from '@axa-fr/react-oidc'
import configuration from './configuration'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// handle security in here, and routing in app

root.render(
  <OidcProvider
    configuration={configuration}
  >
    <OidcSecure>
      <App />
    </OidcSecure>
  </OidcProvider>
)
