import { combineReducers } from "redux";

const initialState = {
    message: "",
    levelMenuID: ""
};

function ModuleReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "MESSAGE":
            return { ...state, message: payload }
        case "LEVELMENUID":
            return { ...state, levelMenuID: payload }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    moduleData: ModuleReducer
});

export default rootReducer;