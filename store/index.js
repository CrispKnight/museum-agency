import { configureStore, createSlice } from '@reduxjs/toolkit';

import NOTIFICATIONS from '../content/notifications';

const overlaysSlice = createSlice({
    name: 'overlays',
    initialState: { showProjectEditor: false, showGalleryEditor: false },
    reducers: {
        editProject: (state, action) => {
            state.showProjectEditor = true;
            state.project = action.payload;
        },
        editGallery: (state) => {
            state.showGalleryEditor = true;
        },
        clearOverlays: (state) =>
            (state = { showProjectEditor: false, showGalleryEditor: false }),
    },
});

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        showNotification: false,
    },
    reducers: {
        createNotification: (state, { payload }) =>
            (state = { ...NOTIFICATIONS[payload], showNotification: true }),
        clearNotifications: (state) =>
            (state = {
                showNotification: false,
            }),
    },
});

const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: false, token: null, changesCommited: true },
    reducers: {
        login: (state, { payload }) => {
            state.isLoggedIn = true;
            state.token = payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        },
        commitChanges: (state) => {
            state.changesCommited = true;
        },
        revalidate: (state) => {
            state.changesCommited = false;
        },
    },
});

export const { createNotification, clearNotifications } =
    notificationsSlice.actions;

export const { editProject, editGallery, clearOverlays } =
    overlaysSlice.actions;

export const { login, logout, commitChanges, revalidate } = userSlice.actions;

export default configureStore({
    reducer: {
        overlays: overlaysSlice.reducer,
        notifications: notificationsSlice.reducer,
        user: userSlice.reducer,
    },
});
