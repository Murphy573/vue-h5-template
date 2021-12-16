/**
 * 权限指令
 */
import Vue from 'vue';

import Clickoutside from './clickoutside';
import Clipboard from './clipboard';
import { resetBodyPosition, title } from './dom';
import permission from './permission.js';

[Clickoutside, Clipboard, resetBodyPosition, title, permission].forEach((d) =>
  Vue.use(d)
);
