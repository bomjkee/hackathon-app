import { FC, useMemo } from 'react';
import { Placeholder, AppRoot } from '@telegram-apps/telegram-ui';
import { retrieveLaunchParams, isColorDark, isRGB } from '@telegram-apps/sdk-react';
import { z } from 'zod';

// Схема валидации с использованием Zod для LaunchParams
const launchParamsSchema = z.object({
    platform: z.string(),
    themeParams: z.object({
        bgColor: z.string().optional(),
    }).optional()
});

type LaunchParam = z.infer<typeof launchParamsSchema>;

export const EnvUnsupported: FC = () => {
    const [platform, isDark] = useMemo(() => {
        let platform: string = 'base';
        let isDark: boolean = false;
        try {
            const rawLaunchParams = retrieveLaunchParams();
            const parsedLaunchParams = launchParamsSchema.safeParse(rawLaunchParams);

            if (parsedLaunchParams.success) {
                const lp = parsedLaunchParams.data;
                const bgColor = lp.themeParams?.bgColor;
                platform = lp.platform;
                isDark = bgColor && isRGB(bgColor) ? isColorDark(bgColor) : false;
            } else {
                console.error("Validation Error:", parsedLaunchParams.error);
            }

        } catch (error) {
            console.error("Error while retrieving launch params", error);
        }

        return [platform, isDark];
    }, []);

    return (
        <AppRoot
            appearance={isDark ? 'dark' : 'light'}
            platform={['macos', 'ios'].includes(platform) ? 'ios' : 'base'}
        >
            <Placeholder
                header="Oops"
                description="You are using too old Telegram client to run this application"
            >
                <img
                    alt="Telegram sticker"
                    src="https://xelene.me/telegram.gif"
                    style={{ display: 'block', width: '144px', height: '144px' }}
                />
            </Placeholder>
        </AppRoot>
    );
}