import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    objectId: 14200,
    apiData: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => ({ ...state, apiData: action.payload }),
        incrementId: (state) => ({ ...state, objectId: state.objectId + 1 }),
        decrementId: (state) => ({ ...state, objectId: state.objectId - 1 }),
        customId: (state, action) => ({ ...state, objectId: action.payload }),
        clearData: () => initialState
    }
})

export const fetchData = () => {
    const dataThunk = async (dispatch, getState) => {
        const data = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${getState().data.objectId}`)
        const resData = await data.json()
        dispatch(setData(resData))
    }
    return dataThunk
}

export const { setData, incrementId, decrementId, customId, clearData } = dataSlice.actions

export default dataSlice.reducer
