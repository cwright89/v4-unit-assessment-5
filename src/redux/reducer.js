const initialState = {
    user: {

    }
}
const UPDATE_USER = 'UPDATE_USER'


export function updateUser(userObj){
    
    return{
        type: 'UPDATE_USER',
        payload: userObj
    }
}

const LOGOUT = 'LOGOUT'

export function logout(){
    return{
        type:'LOGOUT'
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case UPDATE_USER:
            return {...state, user: payload}
        default:
            return state;

        case LOGOUT:
            return {...state}
    
    }
}