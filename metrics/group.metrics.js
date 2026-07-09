// File: group.metrics.js
import { Trend } from 'k6/metrics';

export const groupFormConfigTrend = new Trend('group_form_config_duration');
export const groupGridTrend = new Trend('group_grid_duration');
export const groupTotalTrend = new Trend('group_total_duration');