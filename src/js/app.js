import { DomControl } from './components/DomControl'

const control = new DomControl();
control.init();
if (!document.querySelector('.item')) {
    console.log('yqes');
    control.testData()};
