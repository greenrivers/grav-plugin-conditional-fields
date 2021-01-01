<?php
/**
 * @author Greenrivers Team
 * @copyright Copyright (c) 2021 Greenrivers
 * @package Grav\Plugin
 */

namespace Grav\Plugin;

use Grav\Common\Grav;
use Grav\Common\Plugin;

class ConditionalFieldsPlugin extends Plugin
{
    /**
     * @return array
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'onPluginsInitialized' => [
                ['onPluginsInitialized', 0]
            ]
        ];
    }

    public function onPluginsInitialized(): void
    {
        $this->enable([
            'onAssetsInitialized' => ['onAssetsInitialized', 0]
        ]);
    }

    public function onAssetsInitialized(): void
    {
        if ($this->isAdmin() && self::isEnabled()) {
            $this->grav['assets']->addJs('plugin://conditional-fields/assets/js/admin.min.js');
        }
    }

    /**
     * @return bool
     */
    private static function isEnabled(): bool
    {
        return Grav::instance()['config']->get('plugins.conditional-fields.enabled');
    }
}
