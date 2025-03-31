import {
    backButton,
    viewport,
    themeParams,
    miniApp,
    initData,
    $debug,
    init as initSDK,
} from '@telegram-apps/sdk-react';

// Флаг для отслеживания, были ли связаны CSS-переменные
let cssVarsBound = false;

/**
 * Инициализирует приложение и настраивает его зависимости.
 */
export function init(debug: boolean = false): void {
    // Устанавливаем режим отладки @telegram-apps/sdk-react
    $debug.set(debug);

    initSDK();

    if (!backButton.isSupported() || !miniApp.isSupported()) {
        console.warn('Некоторые функции Telegram не поддерживаются в текущем окружении');
        return;
    }

    backButton.mount();
    miniApp.mount();
    themeParams.mount();
    initData.restore();
    void viewport
        .mount()
        .catch(e => {
            console.error(`Ошибка при монтировании viewport: ${e}`);
        })
        .then(() => {
            // Связываем CSS-переменные только если они еще не были связаны
            if (!cssVarsBound) {
                viewport.bindCssVars();
                cssVarsBound = true;
            }
        });

    // Определяем переменные CSS, связанные с компонентами
    // Связываем их только если они еще не были связаны
    if (!cssVarsBound) {
        miniApp.bindCssVars();
        themeParams.bindCssVars();
        cssVarsBound = true;
    }
    
    if (!viewport.isExpanded()) {
        viewport.expand();
    }
} 