import { configureStore } from '@reduxjs/toolkit'
import {FeedListReducer} from './reducers'
export default configureStore({
    reducer: {
        feeds: FeedListReducer
    }
})