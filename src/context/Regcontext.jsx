import React,{useEffect, createContext, useReducer, UseState, useContext} from 'react'
// import {useCookies} from 'react-cookie'



const initialState ={

    aspirant:null,
    loading:false,
    error:null

}

export const RegContext = createContext(initialState)

const regReducer =(state, action)=>{

    switch(action.type){

        case 'regStart':

        return{

            aspirant:null,
            loading:true,
            error:null
        }

        case'regComplete':

        return{

            aspirant:action.payload,
            loading:false,
            error:null
        }

        case 'regFail':
        
        return{

            aspirant:null,
            loading:false,
            error:action.payload
        }

        default: return state
    }


}


export const RegContextProvider = ({children})=>{

    const [state, dispatch] = useReducer(regReducer, initialState)
    // const [cookies, setCookie] = useCookies(['aspirant'])

    // the aspirant is stored in a cookie called aspirant using the useCookies

    // useEffect(()=>{

    //     setCookie('aspirant', state.aspirant, {path:'/'})

    //     //the cookie value is set whenever the aspirant state chnages using the setCookie function from the useCookies
    // },[state.aspirant, setCookie])

    return(

        <RegContext.Provider value ={{aspirant:state.aspirant, loading:state.loading, error:state.error, dispatch}}>

            {children}

        </RegContext.Provider>
        
    )
}


