import Vue from 'vue';
import 'vant/lib/icon/local.css';
import {
  Toast,
  Lazyload,
  Popup,
  Button,
  Loading,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  ImagePreview,
  Icon,
  Tabbar,
  TabbarItem,
  Search,
  Tag,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Stepper,
  Row,
  Col,
  Divider,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Dialog,
  AddressList,
  CouponList,
  Field,
  SubmitBar,
  List,
  Switch,
  SwipeCell,
  CountDown,
  Overlay,
} from 'vant';

/* toast默认选项设置 */
Toast.allowMultiple();
Toast.setDefaultOptions({
  duration: 2000,
});
Toast.setDefaultOptions('loading', {
  forbidClick: true,
});

Vue.use(Toast)
  .use(Lazyload, {
    preLoad: 1.3,
    attempt: 1,
    listenEvents: ['scroll'],
    lazyComponent: true,
    observer: true,
  })
  .use(Icon)
  .use(Popup)
  .use(Button)
  .use(Loading)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tab)
  .use(Tabs)
  .use(ImagePreview)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Tag)
  .use(Grid)
  .use(GridItem)
  .use(Cell)
  .use(CellGroup)
  .use(Stepper)
  .use(Row)
  .use(Col)
  .use(Divider)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Radio)
  .use(RadioGroup)
  .use(Dialog)
  .use(AddressList)
  .use(CouponList)
  .use(Field)
  .use(SubmitBar)
  .use(List)
  .use(Switch)
  .use(SwipeCell)
  .use(CountDown)
  .use(Overlay);
