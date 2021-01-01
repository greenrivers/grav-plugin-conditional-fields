# Greenrivers Conditional Fields Plugin

The **Conditional Fields** Plugin is an extension for [Grav CMS](http://github.com/getgrav/grav).

It allows You to create conditional fields in admin blueprints.

Works with toggle and radio field.

<ins>Not working with editor field type.</ins>

## Installation

Installing the Conditional Fields plugin can be done in one of three ways:
- GPM (Grav Package Manager)
- manual method
- admin method

### GPM Installation (Preferred)

To install the plugin via the [GPM](http://learn.getgrav.org/advanced/grav-gpm),
through your system's terminal (also called the command line), navigate to the root of your Grav-installation, and enter:

    bin/gpm install conditional-fields

This will install the Conditional Fields plugin into your `/user/plugins`-directory within Grav.
Its files can be found under `/your/site/grav/user/plugins/conditional-fields`.

### Manual Installation

To install the plugin manually, download the zip-version of this repository and unzip it under `/your/site/grav/user/plugins`.
Then rename the folder to `conditional-fields`.
You can find these files on [GitHub](https://github.com/greenrivers/grav-plugin-conditional-fields) or via [GetGrav.org](http://getgrav.org/downloads/plugins#extras).

You should now have all the plugin files under

    /your/site/grav/user/plugins/conditional-fields

> NOTE: This plugin is a modular component for Grav which may require other plugins to operate,
> please see its [blueprints.yaml-file on GitHub](https://github.com/greenrivers/grav-plugin-conditional-fields/blob/master/blueprints.yaml).

### Admin Plugin

If you use the Admin Plugin, you can install the plugin directly by browsing the `Plugins`-menu and clicking on the `Add` button.

## Configuration

Before configuring this plugin, you should copy the `user/plugins/conditional-fields/conditional-fields.yaml` to `user/config/plugins/conditional-fields.yaml` and only edit that copy.

Here is the default configuration and an explanation of available options:

```yaml
enabled: true
```

Note that if you use the Admin Plugin, a file with your configuration named conditional-fields.yaml will be saved in the `user/config/plugins/`-folder once the configuration is saved in the Admin.

## Usage

Conditional fields work by setting the appropriate classes for fields.

In Grav We have 2 properties which responsible for css classes:
- classes
- outerclasses

Set up **outerclassess** for field which should be responsible for control show/hide.

```yaml
outerclasses: conditional condition
```

Add classes to fields that you want to respond to the control field settings.

```yaml
outerclasses: conditional option option-X
```

Where X have possible values depend on control field options.

If You want to toggle fieldset set up values in classes property.

```yaml
classes: conditional option option-X
```

### Examples:

Toggle field with show/hide all fields.

```yaml
mysection.visibility:
  type: toggle
  outerclasses: conditional condition
  label: Visibility
  highlight: 1
  default: 1
  options:
    1: Show
    0: Hide
  validate:
    type: bool
mysection.title:
  type: text
  label: Title
  outerclasses: conditional option option-1
mysection.description:
  type: text
  label: Description
  outerclasses: conditional option option-1
```

Toggle field with switch between fields.

```yaml
mysection.visibility:
  type: toggle
  outerclasses: conditional condition
  label: Visibility
  highlight: 1
  default: 1
  options:
    1: Date
    0: Color
  validate:
    type: bool
mysection.date:
  type: datetime
  label: Date
  outerclasses: conditional option option-1
mysection.color:
  type: colorpicker
  label: Color
  outerclasses: conditional option option-0
```

Radio field with switch between fieldsets.

```yaml
mysection.type:
  type: radio
  outerclasses: conditional condition
  label: Type
  default: files
  options:
    'files': Files
    'pages': Pages
    'colors': Colors
mysection.files:
  type: fieldset
  title: Files
  collapsed: true
  collapsible: true
  classes: conditional option option-files
  fields:
    mysection.files.file1:
      type: filepicker
      folder: 'theme@:/images/pages'
      label: Select a first file
      preview_images: true
      accept:
        - .png
        - .jpg
    mysection.files.file2:
      type: filepicker
      folder: 'theme@:/images/pages'
      label: Select a second file
      preview_images: true
      accept:
        - .png
        - .jpg
mysection.pages:
  type: fieldset
  title: Pages
  collapsed: true
  collapsible: true
  classes: conditional option option-pages
  fields:
    mysection.pages.homepage:
      type: pages
      label: Homepage
      start_route: '/home'
      show_all: false
      show_modular: false
      show_root: false
    mysection.pages.contact:
      type: pages
      label: Contact
      start_route: '/contact'
      show_all: false
      show_modular: false
      show_root: false
mysection.colors:
  type: fieldset
  title: Colors
  collapsed: true
  collapsible: true
  classes: conditional option option-colors
  fields:
    mysection.colors.background:
      type: colorpicker
      label: Background color
    mysection.colors.text:
      type: colorpicker
      label: Text color
```
