import microApp from '@micro-zoe/micro-app';
import { createHashHistory } from 'history';

const host = document.location.host;

const hostLogic = () => {
    const div = document.createElement('div')
    div.innerHTML = "=== HOST IS RUNNING ==="
    document.getElementById('app').appendChild(div)
    microApp.start({
        iframe: true,
        'router-mode': 'native',
        fetch: (url, options, appName) => {
            console.log('=== url is: ', url)
            let finalUrl = url;
            if (finalUrl === `http://${host}/test/`) {
                finalUrl = `http://${host}/assets/`
            }
            return window.fetch(finalUrl, options)
                .then((res) => res.text())
        }
    })

    const child = document.createElement('p')
    child.addEventListener('click', () => {
        window.location.hash = `time/${Date.now()}`
        child.innerHTML = `触发 Hash 变化  当前Hash ${location.hash}`
    }, false)
    child.innerHTML = `触发 Hash 变化  当前Hash ${location.hash}`

    div.appendChild(child)

    const node = document.createElement('micro-app')
    node.setAttribute('name', 'test')
    node.setAttribute('url', `http://${host}/test/`)

    window.addEventListener('hashchange', () => {
        alert('=== host hash change ===')
    })

    document.getElementById('app')
        .appendChild(node)
}

const subSystemLogic = () => {
    const div = document.createElement('div')
    div.innerHTML = "=== SUB SYSTEM IS RUNNING ===\n注意当前页面是否跳转"
    const hash = document.createElement('div')
    hash.innerHTML = 'subSystem hash is: ' + document.location.hash
    document.body.appendChild(div)
    document.body.appendChild(hash)
    const hashHistory = createHashHistory();
    hashHistory.listen((location) => {
        hash.innerHTML = 'subSystem hash is:' + JSON.stringify(location);
    })
    window.addEventListener('hashchange', () => {
        alert('=== subSystem hash change ===')
    })
}

if (window.__MICRO_APP_ENVIRONMENT__) {
    subSystemLogic()
} else {
    hostLogic()
}