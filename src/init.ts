import {
    backButton,
    viewport,
    themeParams,
    miniApp,
    initData,
    $debug,
    init as initSDK,
} from '@telegram-apps/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
    // Set @telegram-apps/sdk-react debug mode.
    $debug.set(debug);


    initSDK();

    if (!backButton.isSupported() || !miniApp.isSupported()) {
        throw new Error('ERR_NOT_SUPPORTED');
    }

    backButton.mount();
    miniApp.mount();
    themeParams.mount();
    initData.restore();
    void viewport
        .mount()
        .catch(e => {
            console.error(`Something went wrong mounting the viewport ${e}`);
        })
        .then(() => {
            viewport.bindCssVars();
        });

    // Define components-related CSS variables.
    miniApp.bindCssVars();
    themeParams.bindCssVars();
    if (!viewport.isExpanded()) {
        viewport.expand();
    }
}