// LOGIN ACTIONS
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const RESET_USER_AUTH_STATE = 'RESET_USER_AUTH_STATE'
export const SESSION_EXPIRED = 'SESSION_EXPIRED'
export const LOGIN_MFA_REQUIRED = 'LOGIN_MFA_REQUIRED'
export const SET_SESSION_WARNING_TIMEOUT_ID = "SET_SESSION_WARNING_TIMEOUT_ID"
export const REMOVE_AUTH_TOKEN_TIMEOUT = "REMOVE_AUTH_TOKEN_TIMEOUT"
export const REMOVE_SESSION_WARNING_TIMEOUT = "REMOVE_SESSION_WARNING_TIMEOUT"

// HEADER ACTIONS
export const USERNAME_CLICKED = 'MOUSE_HOVER_USERNAME'
export const MOUSE_OUT_USERNAME = 'MOUSE_OUT_USERNAME'

// DROP DOWN ACTIONS
export const NEW_DROP_DOWN_CREATED = 'NEW_DROP_DOWN_CREATED'
export const SELECTED_ITEM_CLICKED = 'SELECTED_ITEM_CLICKED'

// Side Bar Actions
export const FETCHING_SIDE_BAR_DATA = 'FETCHING_SIDE_BAR_DATA'
export const FETCHED_SIDE_BAR_DATA = 'FETCHED_SIDE_BAR_DATA'
export const STORE_DOMAIN_DATA = 'STORE_DOMAIN_DATA'
export const RESET_SIDEBAR_DATA = 'RESET_SIDEBAR_DATA'
export const STORE_DASHBOARD_METADATA = 'STORE_DASHBOARD_METADATA'

// Events for the create-new-bucket
export const CREATE_NEW_SDB_INIT = 'CREATE_NEW_SDB_INIT'
export const SUBMITTING_NEW_SDB_REQUEST = 'SUBMITTING_NEW_SDB_REQUEST'
export const RESET_SUBMITTING_NEW_SDB_REQUEST = 'RESET_SUBMITTING_NEW_SDB_REQUEST'

// Manage SBD
export const FETCHING_SECURE_DATA = 'FETCHING_SECURE_DATA'
export const FETCHED_SECURE_DATA = 'FETCHED_SECURE_DATA'
export const FETCHING_SECURE_FILE_DATA = 'FETCHING_SECURE_FILE_DATA'
export const FETCHED_SECURE_FILE_DATA = 'FETCHED_SECURE_FILE_DATA'
export const SECURE_FILE_SELECTED = 'SECURE_FILE_SELECTED'
export const SECURE_FILE_UPLOADED = 'SECURE_FILE_UPLOADED'
export const REMOVE_SECRET_FROM_LOCAL_STORE = 'REMOVE_SECRET_FROM_LOCAL_STORE'
export const REMOVE_FILE_FROM_LOCAL_STORE = 'REMOVE_FILE_FROM_LOCAL_STORE'
export const REMOVE_KEY_FOR_SECURE_DATA_FROM_LOCAL_STORE = 'REMOVE_KEY_FOR_SECURE_DATA_FROM_LOCAL_STORE'
export const REMOVE_KEY_FOR_SECURE_FILE_FROM_LOCAL_STORE = 'REMOVE_KEY_FOR_SECURE_FILE_FROM_LOCAL_STORE'
export const STORE_SDB_DATA = 'STORE_SDB_DATA'
export const TOGGLE_PERM_VIS = 'TOGGLE_PERM_VIS'
export const FETCHING_SECURE_OBJECT_KEYS = 'FETCHING_SECURE_OBJECT_KEYS'
export const FETCHING_SECURE_FILE_KEYS = 'FETCHING_SECURE_FILE_KEYS'
export const FETCHED_SECURE_DATA_KEYS = 'FETCHED_SECURE_DATA_KEYS'
export const FETCHED_SECURE_FILE_KEYS = 'FETCHED_SECURE_FILE_KEYS'
export const UPDATE_NAVIGATED_PATH = 'UPDATE_NAVIGATED_PATH'
export const SHOW_ADD_SECRET_FORM = 'SHOW_ADD_SECRET_FORM'
export const HIDE_ADD_SECRET_FORM = 'HIDE_ADD_SECRET_FORM'
export const SHOW_ADD_FILE_FORM = 'SHOW_ADD_FILE_FORM'
export const HIDE_ADD_FILE_FORM = 'HIDE_ADD_FILE_FORM'
export const SUBMITTING_EDIT_SDB_REQUEST = 'SUBMITTING_EDIT_SDB_REQUEST'
export const RESET_SUBMITTING_EDIT_SDB_REQUEST = 'RESET_SUBMITTING_EDIT_SDB_REQUEST'
export const CLEAR_SECURE_DATA = 'CLEAR_SECURE_DATA'
export const SAVING_SECURE_DATA = 'SAVING_SECURE_DATA'
export const SAVING_SECURE_FILE_DATA = 'SAVING_SECURE_FILE_DATA'
export const ADD_SECURE_DATA_KEY_IF_NOT_PRESET = 'ADD_SECURE_DATA_KEY_IF_NOT_PRESET'
export const ADD_SECURE_FILE_KEY_IF_NOT_PRESET = 'ADD_SECURE_FILE_KEY_IF_NOT_PRESET'
export const RESET_SDB_DATA = 'RESET_SDB_DATA'
export const SDB_NAV_ITEM_SELECT = 'SDB_NAV_ITEM_SELECT'

// Secure Data Version History Browser
export const FETCHED_VERSION_DATA_FOR_SDB = 'FETCHED_VERSION_DATA_FOR_SDB'
export const FETCHED_VERSION_DATA_FOR_PATH = 'FETCHED_VERSION_DATA_FOR_PATH'
export const UPDATE_VERSION_PATHS_PER_PAGE = 'UPDATE_VERSION_PATHS_PER_PAGE'
export const UPDATE_VERSION_PATHS_PAGE_NUMBER = 'UPDATE_VERSION_PATHS_PAGE_NUMBER'
export const CLEAR_VERSION_PATH_SELECTED = 'CLEAR_VERSION_PATH_SELECTED'
export const RESET_VERSION_BROWSER_STATE = 'RESET_VERSION_BROWSER_STATE'
export const ADD_SECURE_DATA_FOR_VERSION = 'ADD_SECURE_DATA_FOR_VERSION'


// Messenger
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const CLEAR_ALL_MESSAGES = 'CLEAR_ALL_MESSAGES'

// Modal Stack
export const PUSH_MODAL = 'PUSH_MODAL'
export const POP_MODAL = 'POP_MODAL'
export const CLEAR_ALL_MODALS = 'CLEAR_ALL_MODALS'

// Metadata Actions
export const STORE_METADATA = 'STORE_METADATA'
export const UPDATE_METADATA_PER_PAGE = 'UPDATE_METADATA_PER_PAGE'
export const UPDATE_METADATA_PAGE_NUMBER = 'UPDATE_METADATA_PAGE_NUMBER'