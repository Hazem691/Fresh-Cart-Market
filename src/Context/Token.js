import { createContext, useState } from "react";


export let TokenCounter = createContext() ;

export default function TokenCounterProvider(props){

    const [token , setToken] = useState(null) ;

    

    return <TokenCounter.Provider value={{token ,setToken}} >{props.children}</TokenCounter.Provider>
}