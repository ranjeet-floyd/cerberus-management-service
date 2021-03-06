/*
 * Copyright (c) 2016 Nike, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.nike.cerberus.auth.connector;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Auth response status codes.
 */
public enum AuthStatus {

    SUCCESS("success"),

    MFA_REQUIRED("mfa_req"),

    MFA_CHALLENGE("mfa_challenge");

    private final String status;

    AuthStatus(final String status) {
        this.status = status;
    }

    @JsonValue
    public String code() {
        return status;
    }
}
