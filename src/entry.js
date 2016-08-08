/**
 * Created by stefan.wang on 8/8/2016.
 */
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers/reducers'


// 第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端redux应用的state结构可以与客户端保持一致
// 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。
let store = createStore(todoApp);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('App')
);