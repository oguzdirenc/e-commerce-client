const initialState ={
    user:{},
    validToken=false
}

const securityReducer =(state=initialState,action){

    switch(action.type){
        case "SET_USER":
            return{
                ...state,
                validToken:true,
                user:action.payload
            }
        
            default:
                return state
    }

}