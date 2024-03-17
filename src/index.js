import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CounterContextProvider from './Context/Counter';
import TokenCounterProvider from './Context/Token';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {QueryClient , QueryClientProvider} from 'react-query' ;
import {ReactQueryDevtools} from '../node_modules/react-query/es/devtools/devtools'
import CartContextProvider from './Context/CartContext';
import WishContextProvider from './Context/WishContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
let query = new QueryClient();
root.render(
  <React.StrictMode>

<QueryClientProvider client={query}>
    <CartContextProvider>

      <WishContextProvider>
      <CounterContextProvider>
      <TokenCounterProvider>
        <App/>
      </TokenCounterProvider>
    </CounterContextProvider>
    <ReactQueryDevtools position="bottom-right"></ReactQueryDevtools>
      </WishContextProvider>
    
  
    
    </CartContextProvider>
    </QueryClientProvider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
