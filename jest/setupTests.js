/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-10 16:03:03
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createMemoryHistory from 'history/createMemoryHistory';


/**
 *****************************************
 * 配置【Enzyme】
 *****************************************
 */
configure({ adapter: new Adapter() });


/**
 *****************************************
 * 创建历史对象
 *****************************************
 */
process.env.history = createMemoryHistory();

