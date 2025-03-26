import ReactDOM from 'react-dom/client'
import {StrictMode} from 'react'
import {App} from "@/app.tsx";
import {AuthProvider} from "@/lib/auth.tsx";

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'



// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </StrictMode>,
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()