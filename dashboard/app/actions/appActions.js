import React from 'react'
import { hashHistory } from 'react-router'
import axios from 'axios'
import * as constants from '../constants/actions'
import * as cms from '../constants/cms'
import * as mSDBActions from '../actions/manageSafetyDepositBoxActions'
import * as modalActions from '../actions/modalActions'
import environmentService from 'EnvironmentService'
import CreateSDBoxForm from '../components/CreateSDBoxForm/CreateSDBoxForm'
import { initCreateNewSDB } from '../actions/createSDBoxActions'
import ApiError from '../components/ApiError/ApiError'
import * as messengerActions from '../actions/messengerActions'

import { getLogger } from 'logger'
var log = getLogger('application-actions')

/**
 * Dispatch this action to let the app know that the sidebar data is being fetched
 */
export function fetchingSideBarData() {
    return {
        type: constants.FETCHING_SIDE_BAR_DATA
    }
}

/**
 * Dispatch this action to let the app know that the sidebar data has been fetched
 */
export function fetchedSideBarData(data) {
    return {
        type: constants.FETCHED_SIDE_BAR_DATA,
        payload: data
    }
}

export function fetchSideBarData(cerberusAuthToken) {
    return function(dispatch) {
        dispatch(fetchingSideBarData())
        return axios.all([
            axios.get(environmentService.getDomain() + cms.RETRIEVE_CATEGORY_PATH, {
                headers: {
                    'X-Cerberus-Token': cerberusAuthToken
                }
            }),
            axios.get(environmentService.getDomain() + cms.BUCKET_RESOURCE, {
                headers: {
                    'X-Cerberus-Token': cerberusAuthToken
                }
            })
        ])
        .then(axios.spread(function (categories, boxes) {
            log.debug("Received side bar data", categories, boxes)
            var data = {}

            for (var category of categories.data) {
                log.debug("parsing category", category)
                data[category.id] = {
                    name: category.display_name,
                    id: category.id,
                    boxes: []
                }
            }

            // store the boxes alphabetically
            boxes.data.sort((a, b) => {
              if(a.name < b.name) return -1;
              if(a.name > b.name) return 1;
              return 0;
            })

            for (var box of boxes.data) {
                log.debug("parsing box", box)
                data[box.category_id]['boxes'].push({id: box.id, name: box.name, path: box.path})
            }

            log.debug("Sidebar data", data)

            dispatch(fetchedSideBarData(data))
        }))
        .catch(function (response) {
            log.error('Failed to fetch SideBar Data', response)
            dispatch(messengerActions.addNewMessage(<ApiError message="Failed to Fetch Side Bar Data" response={response} />))
        })
    }
}

export function fetchCmsDomainData(cerberusAuthToken) {
    return function(dispatch) {
        return axios.all([
            axios.get(environmentService.getDomain() + cms.RETRIEVE_CATEGORY_PATH, {
                headers: {
                    'X-Cerberus-Token': cerberusAuthToken
                }
            }),
            axios.get(environmentService.getDomain() + cms.RETRIEVE_ROLE_PATH, {
                headers: {
                    'X-Cerberus-Token': cerberusAuthToken
                }
            })
        ])
        .then(axios.spread(function (categories, roles) {
            dispatch(storeCMSDomainData({categories: categories.data, roles: roles.data}))
        }))
        .catch(function (response) {
            log.error('Failed to fetch domain data', response)
            dispatch(messengerActions.addNewMessage(<ApiError message="Failed to Fetch CMS Domain Data" response={response} />))
        })
    }
}

export function storeCMSDomainData(data) {
    return {
        type: constants.STORE_DOMAIN_DATA,
        payload: data
    }
}

export function addBucketBtnClicked(categoryId) {
    return function(dispatch) {
        dispatch(initCreateNewSDB(categoryId))
        dispatch(modalActions.pushModal(<CreateSDBoxForm />))
    }
}

/**
 * Action for when a user clicks a safe deposit box in the sidebar or creates a safety deposit box
 * @param id The id of the safety deposit box
 * @param path The path for the safety deposit box
 * @param cerberusAuthToken The token needed for authenticated interaction with Cerberus
 */
export function loadManageSDBPage(id, path, cerberusAuthToken) {
    return function(dispatch) {
        dispatch(mSDBActions.resetToInitialState())
        dispatch(mSDBActions.fetchSDBDataFromCMS(id, cerberusAuthToken))
        dispatch(mSDBActions.updateNavigatedPath(path, cerberusAuthToken))
        hashHistory.push(`/manage-safe-deposit-box/${id}`)
    }
}

export function resetToInitialState() {
    return {
        type: constants.RESET_SIDEBAR_DATA
    }
}

/**
 * Action for loading version data into state
 */
export function loadDashboardMetadata() {
    return function(dispatch) {
        return axios({
            url: '/dashboard/version',
            timeout: 10000
        })
        .then(function (response) {
            dispatch(storeDashboardMetadata(response.data))
        })
        .catch(function (response) {
            log.error(JSON.stringify(response, null, 2))
            dispatch(modalActions.popModal())
            dispatch(messengerActions.addNewMessage(
                <div className="login-error-msg-container">
                    <div className="login-error-msg-header">Failed to load dashboard metadata</div>
                    <div className="login-error-msg-content-wrapper">
                        <div className="login-error-msg-label">Status Code:</div>
                        <div className="login-error-msg-cms-msg">{response.status}</div>
                    </div>
                </div>
            ))
        })
    }
}

export function storeDashboardMetadata(data) {
    return {
        type: constants.STORE_DASHBOARD_METADATA,
        payload: {
            version: data.version
        }
    }
}