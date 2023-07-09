import React, {useState, useEffect, useContext, createContext, useReducer} from 'react'
// import {useCookies} from 'react-cookie'




const initialState ={

    aspirant:null,
    loading:false,
    error:null

}

export const Logcontext = createContext(initialState)


const logReducer =(state, action)=>{

    switch(action.type){

        case 'logStart':

        return{

            aspirant:null,
            loading:true,
            error:null

        }

        case 'logComplete':

        return{

            aspirant:action.payload,
            loading:false,
            error:null
        }

        case 'logFail':

        return{

            aspirant:null,
            loading:false,
            error:action.payload
        }

        default: return state
    }

}

export const LogcontextProvider = ({children})=>{


    const [state, dispatch] = useReducer(logReducer, initialState)

    // const [cookies, setCookie]= useCookies(['AspirantToken'])

    // useEffect(()=>{

    //     setCookie('AspirantToken', state.aspirant?.token, { secure: true, httpOnly: true, maxAge: 24 * 60 * 60 })

    // }, [state.aspirant?.token, setCookie])

    return(

        <Logcontext.Provider value={{aspirant:state.aspirant, loading:state.loading, error:state.error, dispatch}}>

            {children}

        </Logcontext.Provider>


    )


}