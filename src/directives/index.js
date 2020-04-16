/**
 * 权限指令
 */
import Vue from 'vue';

import Clickoutside from './clickoutside';
import Clipboard from './clipboard';
import Track from './track';
import { resetBodyPosition, title } from './dom';

[Clickoutside, Clipboard, Track, resetBodyPosition, title].forEach(d =>
  Vue.use(d)
);
