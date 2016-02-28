import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import React from 'react';

export default createDevTools(
  <LogMonitor />
);
