import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getApiData, getSecureApiData } from "../../services/api";
import { notification } from "antd";

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
    "userProfile/fetch",
    async (searchText, { rejectWithValue }) => {
        try {
            const response = await getApiData(`lab/${localStorage.getItem('userId')}`);
            if (response.success) {
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
export const fetchUserDetail = createAsyncThunk(
    "userDetail/fetch",
    async (searchText, { rejectWithValue }) => {
        try {
            const response = await getSecureApiData(`lab/detail/${localStorage.getItem('userId')}`);
            if (response.success) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
export const fetchEmpDetail = createAsyncThunk(
    "empDetail/fetch",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getSecureApiData(`lab/staff-data/${id}`);
            if (response.success) {
                return response;
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
const userSlice = createSlice({
    name: "userProfile",
    initialState: {
        profiles: null,
        labPerson: null,
        labAddress: null,
        labImg: null,
        rating: null,
        avgRating: null,
        labLicense: null,
        isRequest: null,
        allowEdit:null,
        loading: false,
        error: null,
        isOwner: localStorage.getItem('isOwner') === 'true' ?true:false, // <-- read from localStorage
        permissions:  null,
        empData:null,
        customId:null,
        notification:0
    },
    reducers: {
        clearProfiles: (state) => {
            state.profiles = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profiles = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.profiles = action.payload.user
                state.labAddress = action.payload.labAddress;
                state.labImg = action.payload.labImg;
                state.rating = action.payload.rating;
                state.avgRating = action.payload.avgRating;
                state.labPerson = action.payload.labPerson;
                state.isRequest = action.payload.isRequest
                state.allowEdit = action.payload.allowEdit
                state.labLicense = action.payload.labLicense;
                state.customId = action.payload.customId;
                console.log(action.payload)
                state.notification = action.payload.notifications
                state.isOwner = localStorage.getItem('isOwner') === 'true' ?true:false;
            })
            .addCase(fetchUserDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchEmpDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.empData = action.payload;
                state.isOwner =action.payload.empAccess.permissionId.lab ?false:true;
                state.permissions= action.payload.empAccess.permissionId.lab || null;
            })
    },
});

export const { clearProfiles, setOwner, setPermissions } = userSlice.actions;
export default userSlice.reducer;
