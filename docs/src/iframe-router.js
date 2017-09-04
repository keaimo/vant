/**
 * 同步父窗口和 iframe 的 vue-router 状态
 */

import isMobile from './is-mobile';

window.syncPath = function(dir) {
  const router = window.vueRouter;
  const isInIframe = window !== window.top;
  const currentDir = router.history.current.path;
  const iframe = document.querySelector('iframe');

  if (!isInIframe && !isMobile && iframe) {
    iframeReady(iframe, () => {
      iframe.contentWindow.changePath(currentDir);
    });
  }
};

window.changePath = function(path) {
  const router = window.vueRouter;
  router.replace(path);
};

function iframeReady(iframe, callback) {
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  if (doc.readyState === 'complete') {
    callback();
  } else {
    iframe.onload = () => {
      setTimeout(() => {
        callback();
      }, 50);
    };
  }
}