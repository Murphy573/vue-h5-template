/**
 * 权限指令
 */
import Vue from 'vue';

import Clickoutside from './clickoutside';
import Clipboard from './clipboard';
import { resetBodyPosition, title } from './dom';

[Clickoutside, Clipboard, resetBodyPosition, title].forEach(d =>
  Vue.use(d)
);
