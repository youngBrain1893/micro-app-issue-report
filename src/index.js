import microApp from '@micro-zoe/micro-app';
import { createHashHistory } from 'history';

const port = window.location.port;

const hostLogic = () => {
    const div = document.createElement('div')
    div.innerHTML = "=== HOST IS RUNNING ==="
    document.getElementById('app').appendChild(div)
    microApp.start({
        iframe: true,
        'router-mode': 'pure',
        fetch: (url, options, appName) => {
            console.log('=== url is: ', url)
            let finalUrl = url;
            if (finalUrl === `http://localhost:${port}/test/`) {
                finalUrl = `http://localhost:${port}/assets/`
            }
            return window.fetch(finalUrl, options)
                .then((res) => res.text())
        }
    })

    const node = document.createElement('micro-app')
    node.setAttribute('name', 'test')
    node.setAttribute('url', `http://localhost:${port}/test/`)

    document.getElementById('app')
        .appendChild(node)
}

const subSystemLogic = () => {
    const div = document.createElement('div')
    div.innerHTML = "=== SUB SYSTEM IS RUNNING ===\n注意当前页面是否跳转"
    document.body.appendChild(div)
    createHashHistory();
}

if (window.__MICRO_APP_ENVIRONMENT__) {
    subSystemLogic();
} else {
    hostLogic();
}