/**
 * @license Copyright 2020 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const makeComputedArtifact = require('../computed-artifact.js');
const LanternFirstContentfulPaint = require('./lantern-first-contentful-paint.js');
const ComputedMetric = require('./metric.js');

class FirstContentfulPaintAllFrames extends ComputedMetric {
  /**
   * @param {LH.Artifacts.MetricComputationData} data
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static computeSimulatedMetric(data, context) {
    // Fall back to main frame LCP when using simulated throttling.
    // Throwing an error causes tests to fail.
    // TODO: Add support for all frames in lantern.
    return LanternFirstContentfulPaint.request(data, context);
  }

  /**
   * @param {LH.Artifacts.MetricComputationData} data
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static async computeObservedMetric(data) {
    const {traceOfTab} = data;

    return {
      timing: traceOfTab.timings.firstContentfulPaintAllFrames,
      timestamp: traceOfTab.timestamps.firstContentfulPaintAllFrames,
    };
  }
}

module.exports = makeComputedArtifact(FirstContentfulPaintAllFrames);
