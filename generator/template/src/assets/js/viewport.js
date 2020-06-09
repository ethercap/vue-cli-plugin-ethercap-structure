let viewportEl = false;
let viewportContent = '';

export default {
    set: remBase => {
        const fontSize = remBase || 100,
            dom = window.document,
            userAgent = navigator.userAgent,
            android = userAgent.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
            ua = userAgent.match(/U3\/((\d+|\.){5,})/i),
            ios = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
        let devicePixelRatio = window.devicePixelRatio || 1;
        if (!(
                ios ||
                (android && android[1] > 534) ||
                (ua && parseInt(ua[1].split('.').join(''), 10) >= 80)
            )) {
            devicePixelRatio = 1;
        }
        var scale = 1 / devicePixelRatio;
        viewportEl = dom.querySelector('meta[name="viewport"]');
        if (!viewportEl) {
            viewportEl = dom.createElement('meta');
            viewportEl.setAttribute('name', 'viewport');
            dom.head.appendChild(viewportEl);
        }
        viewportContent = viewportEl.getAttribute('content') || '';
        viewportEl.setAttribute(
            'content',
            `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},viewport-fit=cover`
        );
        dom.documentElement.style.fontSize = devicePixelRatio * fontSize + 'px';
    },
    unset: () => {
        if (viewportEl) {
            viewportEl.setAttribute('content', viewportContent);
            viewportEl = false;
        }
        document.documentElement.style.fontSize = '';
    }
};