import {combineReducers} from 'redux';
import catReducer from './catReducer';
import listReducer from './listingReducer';
import placeReducer from './placeReducer';
import testiReducer from './testiReducer';
import clientReducer from './clientReducer';
import galleryReducer from './galleryReducer';
import gallery2Reducer from './gallery2Reducer';
import blogReducer from './blogReducer';
import usersReducer from './usersReducer';
import loginReducer from './loginReducer';
import logoReducer from './logoReducer';
import searchReducer from '../Reducers/searchReducer'
import selectedUnidadeReducer from '../Reducers/selectedUnidadeReducer'
import idebShReducer from '../Reducers/idebShReducer'

const rootReducer = combineReducers({
    category: catReducer,
    list: listReducer,
    place: placeReducer,
    testimonial: testiReducer,
    client: clientReducer,
    gallery: galleryReducer,
    gallery2: gallery2Reducer,
    blog: blogReducer,
    users: usersReducer,
    login: loginReducer,
    logo: logoReducer,
    search: searchReducer,
    selectedUnidade: selectedUnidadeReducer,
    idebSh: idebShReducer,
});
export default rootReducer;