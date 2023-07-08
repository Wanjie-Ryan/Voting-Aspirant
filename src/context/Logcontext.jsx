import React, {useState, useEffect, useContext, createContext, useReducer} from 'react'


const initialState ={

    aspirant:null,
    loading:false,
    error:null

}

export const Logcontext = createContext(initialState)


const logReducer =(state, action)=>{

    switch(action.type){

        case:'logStart'
        
        return:{


        }
    }

}