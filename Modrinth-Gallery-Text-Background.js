// ==UserScript==
// @name           Modrinth Gallery Text Background
// @name:tr        Modrinth Galeri Yazısı Arkaplanı
// @namespace      https://github.com/Arcdashckr/Modrinth-Gallery-Text-Background
// @version        1.0
// @description    Adds background color to text on gallery images
// @description:tr Galeri sayfasında görsellerin metinlerine arka plan rengi ekler
// @author         Arcdashckr
// @match          https://modrinth.com/*
// @run-at         document-end
// @icon           https://modrinth.com/favicon-light.ico
// @grant          none
// @license        MIT
// @supportURL     https://github.com/Arcdashckr/Modrinth-Gallery-Text-Background/issues
// @downloadURL    https://github.com/Arcdashckr/Modrinth-Gallery-Text-Background/raw/main/Modrinth-Gallery-Text-Background.js
// @updateURL      https://github.com/Arcdashckr/Modrinth-Gallery-Text-Background/raw/main/Modrinth-Gallery-Text-Background.js
// ==/UserScript==

(function () {
    'use strict';

    let lastLog = "";

    function log(message, type = "INFO") {
        if (lastLog === message) return;
        lastLog = message;

        const styles = {
            INFO: "color: #3b82f6; font-weight: bold;",
            SUCCESS: "color: #22c55e; font-weight: bold;",
            WARN: "color: #f59e0b; font-weight: bold;",
            SYSTEM: "background: #3b82f6; color: white; padding: 2px 5px; border-radius: 3px;"
        };

        console.log(`%c[Modrinth-Gallery][${type}]%c ${message}`, styles.SYSTEM, styles[type]);
    }

    function isGalleryPage() {
        return window.location.pathname.endsWith("/gallery");
    }

    function applyStyle() {
        const elements = document.querySelectorAll(
            '.expanded-image-modal .content .floating .text[data-v-b80ce4e8]'
        );

        if (elements.length > 0) {
            elements.forEach(el => {
                el.style.backgroundColor = 'var(--color-scrollbar)';
            });
            log("Gallery text styled.", "SUCCESS");
        }
    }

    function handlePageState() {
        if (isGalleryPage()) {
            log("Gallery page detected.", "INFO");
            applyStyle();
        } else {
            log("Not a gallery page.", "WARN");
        }
    }

    const onMutate = function () {
        if (isGalleryPage()) {
            applyStyle();
        }
    };

    const observer = new MutationObserver(onMutate);
    observer.observe(document.body, { childList: true, subtree: true });

    log("Script initialized.", "SYSTEM");
    handlePageState();

})();
