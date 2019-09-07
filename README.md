







# 1. vue-bootstrap4-table

> Advanced table based on Vue 2 and Bootstrap 4


<p align="center">
  <a href="https://travis-ci.org/rubanraj54/vue-bootstrap4-table"><img src="https://img.shields.io/travis/rubanraj54/vue-bootstrap4-table.svg?style=popout-square" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/vue-bootstrap4-table"><img src="https://img.shields.io/npm/dt/vue-bootstrap4-table.svg?style=popout-square" alt="Total downloads"></a>
  <a href="https://www.npmjs.com/package/vue-bootstrap4-table"><img src="https://img.shields.io/npm/v/vue-bootstrap4-table.svg?style=popout-square" alt="Latest version"></a>
  <a href="https://www.npmjs.com/package/vue-bootstrap4-table"><img src="https://img.shields.io/bundlephobia/minzip/vue-bootstrap4-table.svg?style=popout-square" alt="Latest version"></a>
  <a href="https://www.npmjs.com/package/vue-bootstrap4-table"><img src="https://img.shields.io/npm/l/vue-bootstrap4-table.svg?style=popout-square" alt="Latest version"></a>
</p>

[Quick Demo in Codepen](https://codepen.io/rubanraj54/full/zyZdzN).

[Docs in gitbook](https://rubanraj54.gitbook.io/vue-bootstrap4-table/).

![Demo](https://raw.githubusercontent.com/rubanraj54/vue-bootstrap4-table/develop/src/assets/img/demo.gif)


# 2. Features
* Multi column filtering (Optimized filtering)
	* Simple filter
	* Select filter (Single & Multiple)
* Global search
* Single & Multi column sorting
* Pagination (True! It works out of the box intelligently)
* Pagination Information
* Checkbox selection for rows
* Client & Server mode
* Highly customizable

Table of Contents
=================
- [1. vue-bootstrap4-table](#1-vue-bootstrap4-table)
- [2. Features](#2-features)
- [3. Installation](#3-installation)
  * [3.1. Install via npm or yarn](#31-install-via-npm-or-yarn)
    + [3.1.1. Dependencies](#311-dependencies)
  * [3.2. Install via CDN](#32-install-via-cdn)
- [4. Basic Usage](#4-basic-usage)
- [5. Columns](#5-columns)
  * [5.1. Basic structure](#51-basic-structure)
  * [5.2. Attributes details](#52-attributes-details)
  * [5.3. Column slot](#53-column-slot)
    + [5.3.1. Example](#531-example)
    + [5.3.2. Note](#532-note)
    + [5.3.3. props](#533-props)
- [6. Rows](#6-rows)
  * [6.1. Basic structure](#61-basic-structure)
  * [6.2. Row Slot](#62-row-slot)
    + [6.2.1. Example](#621-example)
    + [6.2.2. Note](#622-note)
    + [6.2.3. props](#623-props)
  * [6.3. Empty result message slot](#63-empty-result-message-slot)
    + [6.3.1. Example](#631-example)
- [7. Sorting](#7-sorting)
  * [7.1. Example](#71-example)
  * [7.2. Attributes details](#72-attributes-details)
  * [7.3. Single column sorting](#73-single-column-sorting)
  * [7.4. Multi column sorting](#74-multi-column-sorting)
    + [7.4.1. Example](#741-example)
  * [7.5. Slot](#75-slot)
    + [7.5.1. Sort Icon](#751-sort-icon)
      - [7.5.1.1. Example](#7511-example)
- [8. Filtering](#8-filtering)
  * [8.1. Simple Filter](#81-simple-filter)
    + [8.1.1. Example](#811-example)
    + [8.1.2. Attributes details](#812-attributes-details)
    + [8.1.3. Clear button icon slot](#813-clear-button-icon-slot)
  * [8.2. Multi-Select Filter](#82-multi-select-filter)
    + [8.2.1. Example (Single select)](#821-example--single-select-)
    + [8.2.2. Example (Multi select)](#822-example--multi-select-)
    + [8.2.3. Attribute details](#823-attribute-details)
- [9. Global search](#9-global-search)
  * [9.1. Example](#91-example)
  * [9.2. Attributes details](#92-attributes-details)
  * [9.3. Clear button icon slot](#93-clear-button-icon-slot)
- [10. Pagination & Info](#10-pagination---info)
  * [10.1. Example](#101-example)
  * [10.2. Attributes details](#102-attributes-details)
  * [10.3. Slot](#103-slot)
    + [10.3.1. Previous & Next button](#1031-previous---next-button)
    + [10.3.2. Pagination info](#1032-pagination-info)
      - [10.3.2.1. props](#10321-props)
    + [10.3.3. Selected rows info](#1033-selected-rows-info)
      - [10.3.3.1. props](#10331-props)
- [11. Refresh and Reset button](#11-refresh-and-reset-button)
  * [11.1. Refresh Button](#111-refresh-button)
    + [11.1.1. Example](#1111-example)
  * [11.2. Reset button](#112-reset-button)
  * [11.3. Slots](#113-slots)
    + [11.3.1. Button text and icons](#1131-button-text-and-icons)
      - [11.3.1.1. Example](#11311-example)
- [12. Custom action buttons](#12-custom-action-buttons)
  * [12.1. Example](#121-example)
  * [12.2. Attributes details](#122-attributes-details)
- [13. Custom classes](#13-custom-classes)
  * [13.1. Example](#131-example)
- [14. vbt-classes](#14-vbt-classes)
  * [14.1. vbt-row-selected](#141-vbt-row-selected)
  * [14.2. vbt-table-wrapper](#142-vbt-table-wrapper)
- [15. Config](#15-config)
  * [15.1. Example](#151-example)
  * [15.2. Attributes details](#152-attributes-details)
- [16. Server mode](#16-server-mode)
  * [16.1. Example](#161-example)
    + [16.1.1. Step 1](#1611-step-1)
    + [16.1.2. Step 2](#1612-step-2)
    + [16.1.3. Step 3](#1613-step-3)
    + [16.1.4. Step 4](#1614-step-4)
    + [16.1.5. Note](#1615-note)
- [17. Events](#17-events)
  * [17.1. on-select-row](#171-on-select-row)
    + [17.1.1. Payload (Object)](#1711-payload--object-)
  * [17.2. on-all-select-rows](#172-on-all-select-rows)
    + [17.2.1. Payload (Object)](#1721-payload--object-)
  * [17.3. on-unselect-row](#173-on-unselect-row)
    + [17.3.1. Payload (Object)](#1731-payload--object-)
  * [17.4. on-all-unselect-rows](#174-on-all-unselect-rows)
    + [17.4.1. Payload (Object)](#1741-payload--object-)
  * [17.5. refresh-data](#175-refresh-data)
- [18. Build Setup](#18-build-setup)

# 3. Installation
## 3.1. Install via npm or yarn

**`$ npm i vue-bootstrap4-table --save`**

**`$ yarn add vue-bootstrap4-table`**

Currently this package will install only the vue-bootstrap4-table component, not their dependencies. So make sure to install the following dependencies.

### 3.1.1. Dependencies

-   bootstrap 4 (js and css) You should include bootstrap before vue-bootstrap4-table plugin.


We are using **`lodash`** internally, so you don't need to install separately for this plugin.

## 3.2. Install via CDN
```html
<link  rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"  crossorigin="anonymous">

...
<script  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"  crossorigin="anonymous"></script>

<script  src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"  crossorigin="anonymous"></script>

<script  src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"  crossorigin="anonymous"></script>

...

<script  src="https://unpkg.com/vue-bootstrap4-table@1.1.10/dist/vue-bootstrap4-table.min.js"  crossorigin="anonymous"></script>
```
**Note:** If you've included bootstrap & jQuery packages already in your project, then include only **vue-bootstrap4-table.min.js** script.

# 4. Basic Usage
It is easy to include vue-bootstrap4-table as a component in your application.

Import VueBootstrap4Table component in any of your vue component and start using it right away.

**Note:** If you included the library via CDN, then you don't need to import, you can use **`vue-bootstrap4-table`**  component right away.

**`rows`** and **`columns`** props should be passed down to **`vue-bootstrap4-table`** component to work with the table.

```vue
<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
        </vue-bootstrap4-table>
    </div>
</template>

<script>
import VueBootstrap4Table from 'vue-bootstrap4-table'

export default {
    name: 'App',
    data: function() {
        return {
            rows: [{
                    "id": 1,
                    "name": {
                        "first_name": "Vladimir",
                        "last_name": "Nitzsche"
                    },
                    "address": {
                        "country": "Mayotte"
                    },
                    "email": "franecki.anastasia@gmail.com",
                },
                {
                    "id": 2,
                    "name": {
                        "first_name": "Irwin",
                        "last_name": "Bayer"
                    },
                    "age": 23,
                    "address": {
                        "country": "Guernsey"
                    },
                    "email": "rlittle@macejkovic.biz",
                },
                {
                    "id": 3,
                    "name": {
                        "first_name": "Don",
                        "last_name": "Herman"
                    },
                    "address": {
                        "country": "Papua New Guinea"
                    },
                    "email": "delia.becker@cormier.com",
                }],
            columns: [{
                    label: "id",
                    name: "id",
                    filter: {
                        type: "simple",
                        placeholder: "id"
                    },
                    sort: true,
                },
                {
                    label: "First Name",
                    name: "name.first_name",
                    filter: {
                        type: "simple",
                        placeholder: "Enter first name"
                    },
                    sort: true,
                },
                {
                    label: "Email",
                    name: "email",
                    sort: true,
                },
                {
                    label: "Country",
                    name: "address.country",
                    filter: {
                        type: "simple",
                        placeholder: "Enter country"
                    },
                }],
            config: {
                checkbox_rows: true,
                rows_selectable: true,
                card_title: "Vue Bootsrap 4 advanced table"
            }
        }
    },
    components: {
        VueBootstrap4Table
    }
}
</script>
```
# 5. Columns
## 5.1. Basic structure
For example, your "columns" object might look like this,

```javascript
columns: [{
        label: "id",
        name: "id",
        filter: {
            type: "simple",
            placeholder: "Enter id"
        },
        sort: true,
        uniqueId: true
    },
    {
        label: "First Name",
        name: "name.first_name", // access nested objects properties with "."
        filter: {
            type: "simple",
            placeholder: "Enter first name",
            case_sensitive: true, // "false" by default
        },
        sort: true, // "false" by default
        initial_sort: true, // "false" by default
        initial_sort_order: "desc" // "asc" by default
    },
    {
        label: "Email",
        name: "email",
        sort: true,
        row_text_alignment:  "text-left",
        column_text_alignment:  "text-left",
        row_classes:  "my-row-class1 my-row-class2",
        column_classes:  "my-column-class1 my-column-class2"
    },
    {
        label: "Country",
        name: "address.country", // access nested objects properties with "."
        filter: {
            type: "simple",
            placeholder: "Enter country"
        },
        visibility: false
    }]
```

## 5.2. Attributes details
|Attributes|Description|Type|Default|
|--|--|--|--|
|label | Name for the column header | String| " " |
|name | Name of the attribute that you would like to show from **`"rows"`** object. You can access nested objects properties with "." | String| " " |
|slot_name | Overrides default slot name assignment. For more details refer "Rows" section | String| " " |
|uniqueId | You can teach table which column has unique values. It helps table to do faster operations and it is really useful in "server_mode". | Boolean| false |
|visibility | Show/Hide specific column. | Boolean| true |
|filter | Configuration for the column filter. If you don't want to have filtering for specific columns, then just don't mention it :-) | Object| Empty |
|filter.type | Type of filter you want to use for your column. | String| " " |
|filter.placeholder | Placeholder is **`hint`** text for filter text box |String |" " |
|filter.case_sensitive | Enable/Disable case sensitive filtering.| Boolean | false |
|sort | Enable or disable sorting in column.| Boolean | false |
|initial_sort | Sort the column at the first time loading. This only works if **`sort`** is **`true`** | Boolean | false |
|initial_sort_order | Sort the column at the first time loading based on given order. This only works if **`initial_sort`** is **`true`** |String | "asc" |
| row_text_alignment | Align your text in the row cell. Possible options are, `"text-justify","text-right","text-left","text-center"` | String | "text-center" |
| column_text_alignment | Align your text in the column header. Possible options are, `"text-justify","text-right","text-left","text-center"` | String | "text-center" |
| row_classes | You can specify your custom classes for each row under specified column. You can add multiple classes with a space delimiter. This classes will be added to **`<td>`** element. | String | " " |
| column_classes | You can specify your custom classes for each column header. You can add multiple classes with a space delimiter.This classes will be added to **`<th>`** element. |  String|" "  |

## 5.3. Column slot

At some point, you might want to override or format the values in the column header. **`vue-bootstrap4-table`** allow you to achieve that with the help of vue slotting.
### 5.3.1. Example

```vue
...
<vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
    <template slot="column_email" slot-scope="props">
        <i>
            {{props.column.label}}
        </i>
    </template>
    <template slot="column_name_first_name" slot-scope="props">
        <b>
            {{props.column.label}}
        </b>
    </template>
</vue-bootstrap4-table>
...
<script>
...
columns: [{
            label: "First Name",
            name: "name.first_name", // access nested objects properties with "."
            sort: false,
        },
        {
            label: "Email",
            name: "email",
            sort: true,
        }],
...
</script>
```
Column slot name will be combination of **`column_`** keyword with the **`name`** which you provided in the columns configuration. In the above example, **`slot="column_email"`** represents the "email" column header in the table.

### 5.3.2. Note
You might have some columns with nested objects names. In that case, the slot name will be **`column_`** keyword + column **`name`** and dots(.) in the column **`name`** will be replaced by underscore(_).

You can see the above example, slot name for **`name.first_name`** column is **`column_name_first_name`**.

### 5.3.3. props
From **`slot-scope="props"`** you can access the following attributes.

|Attributes  | Description |
|--|--|
| props.column | Current column config object |
# 6. Rows
You bind your list of items as array of objects to **`rows`** props to **`vue-bootstrap4-table`** component, then voilà.. you can start work with the table.
## 6.1. Basic structure
```javascript
rows: [{
        "id": 1,
        "name": {
            "first_name": "Vladimir",
            "last_name": "Nitzsche"
        },
        "address": {
            "country": "Mayotte"
        },
        "email": "franecki.anastasia@gmail.com",
    },
    {
        "id": 2,
        "name": {
            "first_name": "Irwin",
            "last_name": "Bayer"
        },
        "age": 23,
        "address": {
            "country": "Guernsey"
        },
        "email": "rlittle@macejkovic.biz",
    },
    {
        "id": 3,
        "name": {
            "first_name": "Don",
            "last_name": "Herman"
        },
        "address": {
            "country": "Papua New Guinea"
        },
        "email": "delia.becker@cormier.com",
    }]
```
## 6.2. Row Slot
At some point, you might want to override or format the values in the row cells. **`vue-bootstrap4-table`** allow you to achieve that with the help of vue slotting.
### 6.2.1. Example
```vue
...
<vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
    <template slot="email" slot-scope="props">
        <i>
            {{props.cell_value}}
        </i>
    </template>
    <template slot="name_first_name" slot-scope="props">
        <b>
            {{props.cell_value}}
        </b>
    </template>
    <template slot="lastname" slot-scope="props">
        <b>
            {{props.cell_value}}
        </b>
    </template>
</vue-bootstrap4-table>
...
<script>
...
columns: [{
            label: "First Name",
            name: "name.first_name" // access nested objects properties with "."
        },
        {
            label: "Last Name",
            name: "name.last_name", // access nested objects properties with "."
            slot_name: "lastname" // optional, if you don't provide slot name
                                  //then default slot name will be name_last_name
        },
        {
            label: "Email",
            name: "email"
        }],
...
</script>
```
Slot name will be same as the name which you provided in the columns configuration. In the above example, **`slot="email"`** represents the "email" column in the table.
### 6.2.2. Note
You might have some columns getting the values from nested objects from **`rows`**. In that case, the slot name will be column **`name`** and dots(.) in the column **`name`** will be replaced by underscore(_).

You can see the above example, slot name for **`name.first_name`** column is **`name_first_name`**.

If you don't like this default "slot name" assignment, then you can set names to row slots as shown in the above example.

### 6.2.3. props
From **`slot-scope="props"`** you can access the following attributes.

| Attributes | Description |
|--|--|
| props.cell_value |  Returns the actual value of the cell|
| props.row |  Current row object|
| props.column |  Current column config object|

## 6.3. Empty result message slot
If the given **`rows`** data is empty or result set is empty after applying filters, vue-bootstrap4-table shows this default message "No results found". You can override the message as like your wish with the help of **`empty-results`** slot.

### 6.3.1. Example
```vue
...
<vue-bootstrap4-table :rows="rows" :columns="columns">
    <template slot="empty-results">
        Users not found
    </template>
</vue-bootstrap4-table>
...
```

# 7. Sorting
Sorting configuration is added along with the each column config.
## 7.1. Example
```vue
...
columns: [
    {
        label: "First Name",
        name: "name.first_name", // access nested objects properties with "."
        sort: true, // "false" by default
        initial_sort: true, // "false" by default
        initial_sort_order: "desc", // "asc" by default
        sortCaseSensitive: false // "true" by default
    }
]
...
```
## 7.2. Attributes details
| Attributes | Description |
|--|--|
| sort | Enable or disable sorting in column. Default value is **`false`**.|
| initial_sort | Sort the column at the first time loading. Default value is **`false`**. This only works if **`sort`** is **`true`**. |
| initial_sort_order | Sort the column at the first time loading based on given order. Default value is **`asc`**. This only works if **`initial_sort`** is **`true`**. |
| sortCaseSensitive | Enable or disable case sensitive sorting. Default value is **`true`**. |

## 7.3. Single column sorting
By default single column sort mode is enabled.

## 7.4. Multi column sorting
If you would like to enable the multi column sorting, set **`multi_column_sort`**  to **`true`**  in table **`config`** props.

### 7.4.1. Example

```vue
<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
        </vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from 'vue-bootstrap4-table'

    export default {
        name: 'App',
        data: function() {
            return {
                rows: [
                ...
                ],
                columns: [
                ...
                ],
                config: {
                    ...
                    multi_column_sort: true, // default false
                    ...
                }
            }
        },
        components: {
            VueBootstrap4Table
        }
    }
</script>
```
## 7.5. Slot

### 7.5.1. Sort Icon

You can change the sort icons based on your choice, For example if you're using font-awesome or glyphicon in your application, you can still use them for vue-bootstrap4-table.

You can inject your favorite sort icons via slots.

#### 7.5.1.1. Example
```vue
...
<vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
    <template slot="sort-asc-icon">
        <i class="fas fa-sort-up"></i>
    </template>
    <template slot="sort-desc-icon">
        <i class="fas fa-sort-down"></i>
    </template>
    <template slot="no-sort-icon">
        <i class="fas fa-sort"></i>
    </template>
</vue-bootstrap4-table>
...
```
After applying the above custom template to sort icons , output will look like this.

| ![Custom sort icons](https://raw.githubusercontent.com/rubanraj54/vue-bootstrap4-table/develop/src/assets/img/sort_icons_slot.png) |
|:--:|
| *Custom sort icons* |

# 8. Filtering
Filtering configuration is added along with the each column config.
## 8.1. Simple Filter
Filter the rows based on the given keyword. If you don't specify filter config then filter feature will be disabled for the specific column.
### 8.1.1. Example
```javascript
...
columns: [
    {
        label: "First Name",
        name: "name.first_name", // access nested objects properties with "."
        filter: {
            type: "simple",
            placeholder: "Enter first name",
            case_sensitive: true, // "false" by default
            showClearButton: false,
            filterOnPressEnter: false,
            debounceRate: 1000,
            init: {
                value : "Christin"
            }
        }
    }
]
...
```
### 8.1.2. Attributes details

|Attributes  |  Description | Type |Default |
|--|--|--|--|
| filter.type | Defines the type of filter. | String | Empty string  |
| filter.placeholder | Placeholder is **`hint`** text for filter text box | String | Empty string |
| filter.case_sensitive | Enable/Disable case sensitive filtering. | Boolean | false |
| filter.filterOnPressEnter | Enable/Disable filtering on "enter" key press. | Boolean | false |
| filter.debounceRate | Defines the wait time for filtering between the key strokes. Value should be in milliseconds. | Number | 60 |
| filter.showClearButton | Show/Hide clear button in the simple filter. | Boolean | true |
| filter.init.value | Assign initial value to the the filter before rendering the table. | String | Empty string |

### 8.1.3. Clear button icon slot

You can override the default clear button icon in the simple filter text input.

```vue
...
<vue-bootstrap4-table :rows="rows" :columns="columns">
    <template slot="simple-filter-clear-icon">
        <i class="fas fa-times-circle"></i>
    </template>
</vue-bootstrap4-table>
...
```

## 8.2. Multi-Select Filter

You can have multi select dropdown filter for each columns. The options in the dropdown will be rendered with bootstrap 4 custom checkboxes.

### 8.2.1. Example (Single select)

```vue
...
columns: [
    {
        label: "First Name",
        name: "name.first_name", // access nested objects properties with "."
        filter: {
            type: "select",
            mode: "single",
            closeDropdownOnSelection: true,
            placeholder: "Select options",
            options: [{
                    "name": "option one",
                    "value": "option one"
                },
                {
                    "name": "option two",
                    "value": "option two"
                },
                {
                    "name": "option three",
                    "value": "option three"
                }
            ],
            init: {
                value : 2
            }
        }
    }
]
...
```
### 8.2.2. Example (Multi select)

```vue
...
columns: [
    {
        label: "First Name",
        name: "name.first_name", // access nested objects properties with "."
        filter: {
            type: "select",
            mode: "multi",
            closeDropdownOnSelection: true,
            placeholder: "Select options",
            options: [{
                    "name": "option one",
                    "value": "option one"
                },
                {
                    "name": "option two",
                    "value": "option two"
                },
                {
                    "name": "option three",
                    "value": "option three"
                }
            ],
            select_all_checkbox : {
                visibility: true,
                text: "Select all items"
            },
            init: {
                value : [0,1]
            }
        }
    }
]
...
```

### 8.2.3. Attribute details

| Attributes |Description  | Type |Default  |
|--|--|--|--|
|  filter.type | Defines the type of filter. | String | Empty string |
| filter.mode | Defines the mode of selection in the dropdown. Allowed options are **`single`** and **`multi`**. If the mode is **`single`**, then dropdown will be rendered with **`radio`** buttons, else if the mode is multi, then dropdown will be rendered with **`checkboxes`**. | String | "single" |
| filter.placeholder | Default text for the dropdown. | String | Empty string |
| filter.closeDropdownOnSelection | Immediately close dropdown on selection. | Boolean | false |
| filter.options | You can provide your list of name and value objects to be populated in the multi-select filter dropdown. | Array | Empty array |
| filter.init.value | Select initial value in the dropdown list before rendering the table.<br> In **single** select mode, value should be a single number (index of the item). <br> In **multi** select mode, value should be array of numbers (indexes of the items). | Number(single mode) or Array(multi mode) | - |
| select_all_checkbox.visibility | Enable or disable select all items checkbox in the dropdown list. This option is valid only in **multi** select mode. | Boolean | true |
| select_all_checkbox.text | You can override the default text of **Select All** item text. This option is valid only in **multi** select mode. | String | "Select All" |

# 9. Global search
Global search searches the complete list of rows for the given search keyword.

You can enable or disable search text input with custom configuration as shown in the below example.

## 9.1. Example

```vue
<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
        </vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from 'vue-bootstrap4-table'

    export default {
        name: 'App',
        data: function() {
            return {
                rows: [
                ...
                ],
                columns: [
                ...
                ],
                config: {
                    ...
                   global_search: {
                        placeholder: "Enter custom Search text",
                        visibility: true,
                        case_sensitive: false,
                        showClearButton: false,
                        searchOnPressEnter: false,
                        searchDebounceRate: 1000,
                        init: {
                            value : "Christin"
                        }
                    },
                    ...
                }
            }
        },
        components: {
            VueBootstrap4Table
        }
    }
</script>
```
## 9.2. Attributes details

| Attributes | Description | Type| Default |
|--|--|--|--|
| global_search.placeholder | Placeholder is **`hint`** text for search text box | String | "Enter search text" |
| global_search.visibility | Show/Hide global search text input | Boolean | true |
| global_search.case_sensitive | Enable/Disable case sensitive searching. | Boolean | false |
| global_search.showClearButton | Show/Hide clear button in the global search input text. | Boolean | true |
| global_search.searchOnPressEnter | Enable/Disable global search on "enter" key press. | Boolean | false |
| global_search.searchDebounceRate | Defines the wait time for searching between the key strokes. Value should be in milliseconds. | Number | 60 |
| global_search.init.value | Assign initial value to the the global search filter before rendering the table. | String | Empty string |

## 9.3. Clear button icon slot

You can override the default clear button icon in the global search text input.


```vue
...
<vue-bootstrap4-table :rows="rows" :columns="columns">
    <template slot="global-search-clear-icon">
        <i class="fas fa-times-circle"></i>
    </template>
</vue-bootstrap4-table>
...
```

# 10. Pagination & Info
Pagination component is built based on Bootstrap 4 pagination template. You can enable or disable pagination and pagination info details based on your choice.

| ![Default pagination component](https://raw.githubusercontent.com/rubanraj54/vue-bootstrap4-table/develop/src/assets/img/default_pagination.png) |
|:--:|
| *Default pagination component* |

| ![Default pagination info compoent](https://raw.githubusercontent.com/rubanraj54/vue-bootstrap4-table/develop/src/assets/img/default_pagination_info.png) |
|:--:|
| *Default pagination info compoent* |

## 10.1. Example
```vue
<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
        </vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from 'vue-bootstrap4-table'

    export default {
        name: 'App',
        data: function() {
            return {
                rows: [
                ...
                ],
                columns: [
                ...
                ],
                config: {
                    pagination: true, // default true
                    pagination_info: true, // default true
                    num_of_visibile_pagination_buttons: 7, // default 5
                    per_page: 5, // default 10
                    per_page_options:  [5,  10,  20,  30],
                }
            }
        },
        components: {
            VueBootstrap4Table
        }
    }
</script>
```
## 10.2. Attributes details
| Attributes | Description | type | Default |
|--|--|--|--|
| pagination | Enable/Disable pagination in the table | Boolean |true  |
| pagination_info |Enable/Disable pagination info in the table  |  Boolean|  true|
|num_of_visibile_pagination_buttons  | Limit the number of visible pagination buttons in the pagination bar | Number | 5 |
| per_page |Number of rows to display per page  |Number  |10  |
| per_page_options |List of options to choose how many rows being showed in single page  |Array of numbers  |[5,10,15]  |
## 10.3. Slot
Currently you can override "Previous" & "Next" button icon/text.
### 10.3.1. Previous & Next button
```vue
...
<vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
    <template slot="paginataion-previous-button">
        Previous
    </template>
    <template slot="paginataion-next-button">
        Next
    </template>
</vue-bootstrap4-table>
...
```
After applying the above custom template to **`previous`** and  **`next`** button, pagination component will look like this.

| ![Pagination after applying slot](https://raw.githubusercontent.com/rubanraj54/vue-bootstrap4-table/develop/src/assets/img/default_pagination_slot.png) |
|:--:|
| *Pagination after applying slot* |

### 10.3.2. Pagination info

```vue
...
<vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
    <template slot="pagination-info" slot-scope="props">
        This page total is {{props.currentPageRowsLength}} |
        Filterd results total is {{props.filteredRowsLength}} |
        Original data total is {{props.originalRowsLength}}
    </template>
</vue-bootstrap4-table>
...
```
After applying the above custom template to pagination info , pagination info component will look like this.

| ![Pagination info after applying slot](https://raw.githubusercontent.com/rubanraj54/vue-bootstrap4-table/develop/src/assets/img/default_pagination_info_slot.png) |
|:--:|
| *Pagination info after applying slot* |

#### 10.3.2.1. props
From **`slot-scope="props"`** you can access the following attributes.

| Attributes |  Description|
|--|--|
| props.currentPageRowsLength | Number of rows currently showing in the page |
| props.filteredRowsLength | Total number of items in the result after filtering |
|  props.originalRowsLength| Original number of items in the data|

### 10.3.3. Selected rows info

```vue
...
<vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
    <template slot="selected-rows-info" slot-scope="props">
        Total Number of rows selected : {{props.selectedItemsCount}}
    </template>
</vue-bootstrap4-table>
...
```

#### 10.3.3.1. props
From **`slot-scope="props"`** you can access the following attributes.

| Attributes |  Description|
|--|--|
| props.selectedItemsCount | Number of rows currently showing in the pageNumber of rows currently being selected |

# 11. Refresh and Reset button

## 11.1. Refresh Button

Refresh button emits a refresh event to your application (parent component). You can listen for this event and make ajax call for new data and update **`rows`** data. Table will receive the new data and update the rows with current queries.

### 11.1.1. Example

```vue
<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows"
                                :columns="columns"
                                :config="config"
                                @refresh-data="onRefreshData">
        </vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from 'vue-bootstrap4-table'

    export default {
        name: 'App',
        data: function() {
            return {
                rows: [
                ...
                ],
                columns: [
                ...
                ],
                config: {
                    ...
                    show_refresh_button: true, // default is also true
                    ...
                }
            }
        },
        methods: {
            onRefreshData() {
                // you can make ajax call here for new data and
                // set result to this.rows
            }
        },
        components: {
            VueBootstrap4Table
        }
    }
</script>
```

## 11.2. Reset button

Reset button resets currently applied **`sorting, filtering, and global search`** queries.

By default reset button is enabled. If you would like to disable reset button, set **`show_reset_button`** to **`false`** in initial config.

| Attributes | Description | type | Default |
|--|--|--|--|
|show_refresh_button  | Show/Hide Refresh button | Boolean | true |
| show_reset_button | Show/Hide Refresh button. Resets all query (sort, filter, global search) currently applied in the table. | Boolean | true |

## 11.3. Slots

### 11.3.1. Button text and icons

You can override the text in the refresh & reset buttons with slots **`refresh-button-text`** & **`reset-button-text.`** If you like, you can add icon to the buttons.

#### 11.3.1.1. Example

```vue
...
<vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
    <template slot="refresh-button-text">
        <i class="fas fa-sync-alt"></i> My refresh
    </template>
    <template slot="reset-button-text">
        <i class="fas fa-broom"></i> My reset
    </template>
</vue-bootstrap4-table>
...
```

After applying the above custom template to refresh & reset buttons , output will look like this.

| ![Custom sort icons](https://raw.githubusercontent.com/rubanraj54/vue-bootstrap4-table/develop/src/assets/img/refresh_reset_slot.png) |
|:--:|
| *Custom refresh and reset button texts & icons* |


# 12. Custom action buttons

You can add your custom buttons in the table by **`actions`** props and listen for their events in your component.

## 12.1. Example

```vue
<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows"
                                :columns="columns"
                                :config="config"
                                :actions="actions"
                                @on-download="onDownload">
        </vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from 'vue-bootstrap4-table'

    export default {
        name: 'App',
        data: function() {
            return {
                rows: [
                ...
                ],
                columns: [
                ...
                ],
                actions: [
                    {
                        btn_text: "Download",
                        event_name: "on-download",
                        class: "btn btn-primary my-custom-class",
                        event_payload: {
                            msg: "my custom msg"
                        }
                    }
                ],
                config: {
                    ...
                }
            }
        },
        methods: {
            onDownload(payload) {
                console.log(payload);
            }
        },
        components: {
            VueBootstrap4Table
        }
    }
</script>
```

Each action object should contain the below attributes.

## 12.2. Attributes details

| Attributes | Description | type | Default |
|--|--|--|--|
| btn_name | Display name for the button |String  |  " "|
| event_name |  Name of the event that you want to listen back (Mandatory)| String | undefined |
| class | Class which you want to override default button classes | String | " " |
| event_payload | Payload you want to send with the event | Any | undefined |

# 13. Custom classes

You can pass your classes for the table, row, cell, etc.. via **`classes`**  prop. And interesting thing is you can pass a validator function to apply custom classes conditionally.

## 13.1. Example
```vue
<template>
    <div id="app">
        <vue-bootstrap4-table :classes="classes"
                              :rows="rows"
                              :columns="columns">
        </vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from 'vue-bootstrap4-table'
    export default {
        name: 'App',
        data: function() {
            return {
                rows: [
                    ...
                ],
                columns: [
                    ...
                ],
                classes: {
                    tableWrapper: "outer-table-div-class wrapper-class-two",
                    table : {
                        "table-striped my-class" : true,
                        "table-bordered my-class-two" : function(rows) {
                            return true
                        }
                    },
                    row : {
                        "my-row my-row2" : true,
                        "function-class" : function(row) {
                            return row.id == 1
                        }
                    },
                    cell : {
                        "my-cell my-cell2" : true,
                        "text-danger" : function(row,column,cellValue) {
                            return column.name == "salary" && row.salary > 2500
                        }
                    }
                }
            }
        },
        components: {
            VueBootstrap4Table
        }
    }
</script>
```
Currently you can add custom classes to **`<div>, <table>, <tr> and <td>`** elements for table outer div element, table, row, and cell properties respectively.

You can either pass the custom classes directly or pass a function with your condition check to decide whether to apply to class or not.

For example, in the above example, look at the property **`cell`**. There we are applying classes **"my-cell my-cell2"** directly to **`<td>`** element and **"text-danger"** class only to the "salary" column & also the salary value should be above 2500.

# 14. vbt-classes
By default, vue-bootstrap-table add classes to table elements which allows users to override the default styles.
## 14.1. vbt-row-selected
If a row is being selected with checkbox or row, then the selected row <tr> element will have "vbt-row-selected" class attached to it.

```html
<tr class="vbt-row-selected">
    ...
</tr>
```
## 14.2. vbt-table-wrapper
This class is being applied to outer <div> element of <table> element.

```html
<div class="vbt-table-wrapper">
    <table>
        ...
    </table>
</div>
```

# 15. Config
You can optionally pass config as a prop to **`vue-bootstrap4-table`** component to override the table configuration defaults.

## 15.1. Example
```vue
<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
        </vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from 'vue-bootstrap4-table'

    export default {
        name: 'App',
        data: function() {
            return {
                rows: [
                ...
                ],
                columns: [
                ...
                ],
                config: {
                    card_mode:  true,
                    selected_rows_info:  false,
                    pagination: true,
                    pagination_info: true,
                    num_of_visibile_pagination_buttons: 7,
                    per_page: 5,
                    checkbox_rows: true,
                    highlight_row_hover: true,
                    rows_selectable: true,
                    multi_column_sort: true,
                    highlight_row_hover_color:"grey",
                    card_title: "Vue Bootsrap 4 advanced table",
                    global_search:  {
	                    placeholder:  "Enter custom Search text",
	                    visibility:  true,
	                    case_sensitive:  false
	                },
	                per_page_options:  [5,  10,  20,  30],
	                show_refresh_button:  true,
	                show_reset_button:  true,
	                server_mode:  true,
                    preservePageOnDataChange: true
                }
            }
        },
        components: {
            VueBootstrap4Table
        }
    }
</script>
```

> If you don't provide an attribute in the config, then default value will be assigned to that attribute.

## 15.2. Attributes details

|Attributes  | Description | type| Default |
|--|--|--|--|
| card_mode | You can choose between table surrounded with card layout and plain default table alone.| Boolean | true |
| pagination | Enable/Disable pagination in the table |Boolean |  true|
| pagination_info | Enable/Disable pagination info in the table | Boolean|  true|
|selected_rows_info |Enable/Disable number of rows selected info in the table | Boolean | false |
| num_of_visibile_pagination_buttons | Limit the number of visible pagination buttons in the pagination bar |Number | 5 |
| per_page | Number of rows to display per page |Number | 10  |
| checkbox_rows | Enable/Disable checkbox in each rows |Boolean | false |
| highlight_row_hover | Enable/Disable highlighting row on hover |Boolean | true |
|rows_selectable  | Enable/Disable selecting items on row click |Boolean | false |
| multi_column_sort | Enable/Disable multi column sorting | Boolean|  false|
| highlight_row_hover_color | Change the row hover highlighting color | String| "#d6d6d6" |
| card_title | Sets the table title in the card header | String| "" (empty string) |
|  global_search.placeholder | Placeholder is **`hint`** text for search text box  | String  |  "Enter search text" |
| global_search.visibility  |  Show/Hide global search text input |  Boolean |  true |
|global_search.case_sensitive   | Enable/Disable case sensitive searching.  | Boolean  |  false |
| per_page_options  | List of options to choose how many rows being showed in single page  |  Array of numbers  | [5,10,15]|
| show_refresh_button  |  Show/Hide Refresh button | Boolean  | true  |
| show_reset_button  |  Show/Hide Refresh button. Resets all query (sort, filter, global search) currently applied in the table. |Boolean   | true  |
| server_mode  |  Enable/Disable server side processing (Sorting, Filtering, Global search & pagination) |Boolean   | false  |
| preservePageOnDataChange  |  Enable/Disable preserving current index of the page on data change. For example, if this option is set to true, consider that you are in page **4** and performed some actions like sorting or filtering, then now table gets a new data and still the pagination will be in page **4**. If this config is set to false (default), for any data change current page in the pagination will be shifted to page **1**. |Boolean   | false  |

# 16. Server mode

In server mode, client side filtering, sorting, global search and pagination will be disabled. Instead your server will do all this and returns only the processed response. New response will update the rows in the table.

## 16.1. Example

```vue
<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows"
                              :columns="columns"
                              :config="config"
                              @on-change-query="onChangeQuery"
                              :total-rows="total_rows">
        </vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from 'vue-bootstrap4-table'
    export default {
        name: 'App',
        data: function() {
            return {
                rows: [],
                columns: [
                ...
                ],
                config: {
                    ...
                    server_mode: true // by default false
                    ...
                },
                queryParams: {
                    sort: [],
                    filters: [],
                    global_search: "",
                    per_page: 10,
                    page: 1,
                },
                total_rows: 0,
            }
        },
        methods: {
            onChangeQuery(queryParams) {
                this.queryParams = queryParams;
                this.fetchData();
            },
            fetchData() {
                let self = this;
                axios.get('http://example.com/search', {
                        params: {
                            "queryParams": this.queryParams,
                            "page": this.queryParams.page
                        }
                    })
                    .then(function(response) {
                        self.rows = response.data.data;
                        self.total_rows = response.data.total;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

        },
        components: {
            VueBootstrap4Table
        },
        mounted() {
            this.fetchData();
        },
    }
</script>

<style>

</style>
```

### 16.1.1. Step 1

In your application you should have the below information in **`data.`**

```javascript
queryParams: {
    sort: [],
    filters: [],
    global_search: "",
    per_page: 10,
    page: 1,
},
total_rows: 0,
```

### 16.1.2. Step 2

If you want to work with pagination, then don't forget to set **`total_rows`** as prop to **`totalRows`**.

Then listen for the event **`on-change-query`**.

```vue
<vue-bootstrap4-table :rows="rows"
        :columns="columns"
        :config="config"
        @on-change-query="onChangeQuery"
        :totalRows="total_rows">
</vue-bootstrap4-table>
```

### 16.1.3. Step 3

Wherever there is a change in table query params, you will get your new query params in your **`onChangeQuery`** function. With the new values update your **`queryParams`** and fetch new data from server.

```javascript
onChangeQuery(queryParams) {
    this.queryParams = queryParams;
    this.fetchData();
},
```

### 16.1.4. Step 4

I assume you are using **`axios`** library for handling ajax requests.

Once you have the new updated result, update **rows** with new data and also update **`total_rows`** with the total number of records.

```javascript
fetchData() {
    let self = this;
    axios.get('http://example.com/search', {
            params: {
                "queryParams": this.queryParams,
                "page": this.queryParams.page
            }
        })
        .then(function(response) {
            self.rows = response.data.data;
            self.total_rows = response.data.total;
        })
        .catch(function(error) {
            console.log(error);
        });
}
```
### 16.1.5. Note
To get best performance, it is recommended to mention in column config that which column have unique values. You can refer the below example.
```javascript
columns: [
    ...
    {
        label: "id",
        name: "id",
        filter: {
            type: "simple",
            placeholder: "Enter id"
        },
        sort: true,
        uniqueId: true // like this
    }
    ...
]
```
# 17. Events

## 17.1. on-select-row

Triggered after selecting a row.

### 17.1.1. Payload (Object)

|  Attribute| Description |
|--|--|
|selected_items  | List of currently selected rows |
| selected_item | Currently selected item |

## 17.2. on-all-select-rows

Triggers after clicking select all check box.

### 17.2.1. Payload (Object)

|  Attribute| Description |
|--|--|
|selected_items  | List of currently selected rows |

## 17.3. on-unselect-row

Triggered after deselecting a row.

### 17.3.1. Payload (Object)

|  Attribute| Description |
|--|--|
|selected_items  | List of currently selected rows |
| unselected_item |Currently deselected item |

## 17.4. on-all-unselect-rows

Triggers after clicking deselect all check box.

### 17.4.1. Payload (Object)

|  Attribute| Description |
|--|--|
|selected_items  | List of currently selected rows |

## 17.5. refresh-data

Triggers after clicking refresh button. This event doesn't carry any payload.

# 18. Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080 (if it is not running in 8080, then check console for right port)
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
