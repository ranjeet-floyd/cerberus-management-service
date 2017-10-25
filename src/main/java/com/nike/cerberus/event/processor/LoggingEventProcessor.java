/*
 * Copyright (c) 2017 Nike, Inc.
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

package com.nike.cerberus.event.processor;

import com.nike.cerberus.event.Event;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Event Processor implementation that logs each event.
 */
public class LoggingEventProcessor implements EventProcessor {

    protected final Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public void process(Event event) {
        log.info(event.getEventAsString());
    }

    @Override
    public String getName() {
        return "logging-processor";
    }
}
