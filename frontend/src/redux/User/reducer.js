const initialState = {
    token: localStorage.getItem('token')
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        default: return state
    }
}

export default userReducer;