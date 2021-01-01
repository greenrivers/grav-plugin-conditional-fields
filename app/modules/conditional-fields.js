/**
 * @author Greenrivers Team
 * @copyright Copyright (c) 2021 Greenrivers
 */

import $ from 'jquery';

export default function conditionalFields() {
    const isBlueprint = () => {
        const {pathname} = location;
        return pathname.startsWith('/admin/plugins') || pathname.startsWith('/admin/themes');
    };

    const toggleDisplayField = item => {
        let formField = item.closest('.form-field.grid');
        const value = item.val();
        const checked = item.prop('checked');

        if (isBlueprint()) {
            formField = formField.parent();
        }

        if (formField && checked) {
            $(formField).siblings().each((i, sibling) => {
                sibling = $(sibling);

                if (isBlueprint()) {
                    sibling = sibling.children(':first');
                }

                if(sibling.hasClass('conditional')) {
                    if (sibling.hasClass(`option-${value}`)) {
                        if (isBlueprint()) {
                            sibling.parent().removeClass('hidden');
                        } else {
                            sibling.removeClass('hidden');
                        }
                    } else {
                        if (isBlueprint()) {
                            sibling.parent().addClass('hidden');
                        } else {
                            sibling.addClass('hidden');
                        }
                    }
                }
            });
        }
    }

    const items = $('div.conditional.condition input');

    items.each((i, item) => {
        item = $(item);

        toggleDisplayField(item);

        item.on('change', e => {
            const field = $(e.currentTarget);
            toggleDisplayField(field);
        });
    });

    const buttons = $('button[data-action="add"]');

    buttons.each((i, button) => {
        button = $(button);

        button.on('click', e => {
            setTimeout(() => {
                const li = button.parent().parent().find('li[data-collection-item]:last-of-type');
                const item = li.find('div.conditional.condition input');

                toggleDisplayField(item);

                $(document).on('change', e => {
                    if (e.target && e.target.type === 'radio') {
                        const field = $(e.target);
                        toggleDisplayField(field);
                    }
                });
            }, 100);
        });
    })
}
