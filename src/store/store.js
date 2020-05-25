import { createStore } from 'redux';

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(err) {
        console.log(err);
    }
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch(err) {
        console.log(err)
        return undefined;
    }
}

const initialState = {
    people: [],
    isLoaded: false,
}

const listReducer = (state = initialState, action)  => {

    switch (action.type) {
        case 'LOAD_PEOPLE':
            state = {...state, 
                people: [ ...state.people, ...action.people ], 
                isLoaded: true
            };
            break;
        case 'REMOVE_PERSON':
            return {
                ...state, 
                people: state.people.filter(person => person.login.uuid !== action.uuid)
            };

        case 'EDIT_PERSON':
            return {...state, people: state.people.map(person => {
                if(action.data.uuid === person.login.uuid && action.data.email.length !== 0) {
                    person.name.first = action.data.name !== "" ? action.data.name : person.name.first;
                    person.name.last = action.data.last !== "" ? action.data.last : person.name.last;
                    person.location.country = action.data.country !== "" ? action.data.country : person.location.country; 
                    person.location.city = action.data.city !== "" ? action.data.city : person.location.city;
                    person.email = action.data.email;
                }
                return person
            })}
        default:
            break;
    }

    return state;
}
const persistedState = loadFromLocalStorage();

const store = createStore(
    listReducer,
    persistedState.people.length !== 0 ? persistedState : undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    saveToLocalStorage(store.getState());
}); 

export default store;