import React,{useEffect, createContext, UseState, useContext} from 'react'
import {useCookies} from 'react-cookies'



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


