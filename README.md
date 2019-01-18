





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

# 3. Installation
## 3.1. Install via npm

**`$ npm i vue-bootstrap4-table --save`**

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

<script  src="https://unpkg.com/vue-bootstrap4-table@1.0.21/dist/vue-bootstrap4-table.min.js"  crossorigin="anonymous"></script>
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
    }]
```

## 5.2. Attributes details
|Attributes|Description|Type|Default|
|--|--|--|--|
|label | Name for the column header | String| " " |
|name | Name of the attribute that you would like to show from **`"rows"`** object. You can access nested objects properties with "." | String| " " |
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
Slot name will be same as the name which you provided in the columns configuration. In the above example, **`slot="email"`** represents the "email" column in the table.
### 6.2.2. Note
You might have some columns getting the values from nested objects from **`rows`**. In that case, the slot name will be column **`name`** and dots(.) in the column **`name`** will be replaced by underscore(_).

You can see the above example, slot name for **`name.first_name`** column is **`name_first_name`**.

### 6.2.3. props
From **`slot-scope="props"`** you can access the following attributes.

| Attributes | Description |
|--|--|
| props.cell_value |  Returns the actual value of the cell|
| props.row |  Current row object|
| props.column |  Current column config object|

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
        initial_sort_order: "desc" // "asc" by default
    }
]
...
```
## 7.2. Attributes details
| Attributes | Description |
|--|--|
| sort | Enable or disable sorting in column. Default value is **`false`** |
| initial_sort | Sort the column at the first time loading. Default value is **`false`**. This only works if **`sort`** is **`true`** |
| initial_sort_order | Sort the column at the first time loading based on given order. Default value is **`asc`**. This only works if **`initial_sort`** is **`true`** |

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
        }
    }
]
...
```
### 8.1.2. Attributes details

|Attributes  |  Description | Default |
|--|--|--|
| filter.type | Defines the type of filter. Currently basic filter is supported. |Empty string  |
| filter.placeholder | Placeholder is **`hint`** text for filter text box | Empty string |
| filter.case_sensitive | Enable/Disable case sensitive filtering. | false |

## 8.2. Multi-Select Filter

You can have multi select dropdown filter for each columns. The options in the dropdown will be rendered with bootstrap 4 custom checkboxes.

### 8.2.1. Example

```vue
...
columns: [
    {
        label: "First Name",
        name: "name.first_name", // access nested objects properties with "."
        filter: {
            type: "select",
            mode: "multi",
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
        }
    }
]
...
```

### 8.2.2. Attribute details

| Attributes |Description  | Type |Default  |
|--|--|--|--|
|  filter.type | Defines the type of filter. | String | Empty string |
| filter.mode | Defines the mode of selection in the dropdown. Allowed options are **`single`** and **`multi`**. If the mode is **`single`**, then dropdown will be rendered with **`radio`** buttons, else if the mode is multi, then dropdown will be rendered with **`checkboxes`**. | String | "single" |
| filter.placeholder | Default text for the dropdown. | String | Empty string |
| filter.options | You can provide your list of name and value objects to be populated in the multi-select filter dropdown. | Array | Empty array |


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
                        case_sensitive: false
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
| event_payload | Payload you want to send with the event | Any | undefined |


# 13. Config
You can optionally pass config as a prop to **`vue-bootstrap4-table`** component to override the table configuration defaults.

## 13.1. Example
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

## 13.2. Attributes details

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

# 14. Server mode

In server mode, client side filtering, sorting, global search and pagination will be disabled. Instead your server will do all this and returns only the processed response. New response will update the rows in the table.

## 14.1. Example

```vue
<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows"
                              :columns="columns"
                              :config="config"
                              @on-change-query="onChangeQuery"
                              :totalRows="total_rows">
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

### 14.1.1. Step 1

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

### 14.1.2. Step 2

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

### 14.1.3. Step 3

Wherever there is a change in table query params, you will get your new query params in your **`onChangeQuery`** function. With the new values update your **`queryParams`** and fetch new data from server.

```javascript
onChangeQuery(queryParams) {
    this.queryParams = queryParams;
    this.fetchData();
},
```

### 14.1.4. Step 4

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
# 15. Events

## 15.1. on-select-row

Triggered after selecting a row.

### 15.1.1. Payload (Object)

|  Attribute| Description |
|--|--|
|selected_items  | List of currently selected rows |
| selected_item | Currently selected item |

## 15.2. on-all-select-rows

Triggers after clicking select all check box.

### 15.2.1. Payload (Object)

|  Attribute| Description |
|--|--|
|selected_items  | List of currently selected rows |

## 15.3. on-unselect-row

Triggered after deselecting a row.

### 15.3.1. Payload (Object)

|  Attribute| Description |
|--|--|
|selected_items  | List of currently selected rows |
| unselected_item |Currently deselected item |

## 15.4. on-all-unselect-rows

Triggers after clicking deselect all check box.

### 15.4.1. Payload (Object)

|  Attribute| Description |
|--|--|
|selected_items  | List of currently selected rows |

## 15.5. refresh-data

Triggers after clicking refresh button. This event doesn't carry any payload.

# 16. Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
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
