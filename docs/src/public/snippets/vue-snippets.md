### vue snippets

::: details
::: code-group

```json [vue.json]
{
  "vue2 模板": {
    "prefix": "v2init",
    "body": [
      "<template>",
      "\t<div>",
      "\t\t$1",
      "\t</div>",
      "</template>",
      "",
      "<script>",
      "\texport default {",
      "\tname: '$2'",
      "\tdata () {",
      "\t\treturn {",
      "\t\t\t$3",
      "\t\t}",
      "\t},",
      "\tmethods: {",
      "\t\t$4",
      "\t},",
      "\tcomputed: {",
      "\t\t$5",
      "\t},",
      "\tcomponents: {",
      "\t\t$6",
      "\t},",
      "}",
      "</script>",
      "",
      "<style scoped>",
      "\t$0",
      "</style>"
    ],
    "description": "粘贴 Vue2 组件基本模板代码"
  },
  "vue3 模板": {
    "prefix": "v3init",
    "body": [
      "<script setup lang='$1'>",
      "\timport { ref } from 'vue'",
      "</script>",
      "",
      "<template>",
      "\t<div>",
      "\t\t$2",
      "\t</div>",
      "</template>",
      "",
      "<style scoped lang='$3'>",
      "\t$0",
      "</style>"
    ],
    "description": "粘贴 Vue3 组件基本模板代码"
  }
}
```

:::

### javascript snippets

::: details
::: code-group

```json [javascript.json]
{
  "Print to console": {
    "prefix": "clg",
    "body": ["console.log($1);", "$2"],
    "description": "log to console"
  },
  "warnings to console": {
    "prefix": "clw",
    "body": ["console.warn($1);", "$2"],
    "description": "warnings to console"
  },
  "info to console": {
    "prefix": "cli",
    "body": ["console.info($1);", "$2"],
    "description": "info to console"
  },
  "error to console": {
    "prefix": "cle",
    "body": ["console.error($1);", "$2"],
    "description": "error to console"
  },
  "table to console": {
    "prefix": "clt",
    "body": ["console.table($1);", "$2"],
    "description": "table to console"
  }
}
```

:::

### html snippets

::: details
::: code-group

```json [html.json]
{
  "初始化html基本结构": {
    "prefix": "!",
    "body": [
      "<!DOCTYPE html>",
      "<html lang='zh-CN'>",
      "<head>",
      "\t<meta charset='UTF-8'>",
      "\t<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
      "\t<meta name='keywords' content='关键字'>",
      "\t<meta name='description' content='描述'>",
      "\t<meta name='author' content='作者'>",
      "\t<title>初始化html结构</title>",
      "</head>",
      "<body>",
      "\t<div id='app'>",
      "\t</div>",
      "\t<script>",
      "\t\t$0",
      "\t</script>",
      "</body>",
      "</html>"
    ],
    "description": "初始化html基本结构"
  }
}
```

:::