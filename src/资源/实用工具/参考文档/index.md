---
sidebar: true
footer: false
---

# 快速文档参考手册

<script setup lang='ts'>
// import References from '../../../.vitepress/theme/components/References.vue'
import {FrontEndItems,
        JavaScriptItems, 
        JavaScriptToolItems, 
        NodejsItems, 
        AnimationLibItems,
        VisualizationItems,
        VueItems, 
        ReactItems, 
        ComponentLibItems, 
        PythonItems, 
        LinuxItems, 
        BlogItems,
        FormatItems,
        CssPreprocessorItems,
        AiItems,
        CompilerPreProcessorItems,
        LeaningWebsites,
        DevelopmentDocumentsItems,
        ColorPaletteItems,
        ResourceItems,
        MediaItems } from '../../../.vitepress/configuration/modules/sources'
</script>

## 在线辅助工具

<References :items="FrontEndItems" />

## 设计与调色盘

<References :items="ColorPaletteItems" />

## 资源大全

<References :items="ResourceItems" />

## 免费在线媒体资源

<References :items="MediaItems" />

## JavaScript & TypeScript

<References :items="JavaScriptItems"/>

## JS 工具库

<References :items="JavaScriptToolItems"/>

## Nodejs 库

<References :items="NodejsItems" />

## 前端动画库

<References :items="AnimationLibItems" />

## CSS 库 & 图标库 & 预处理器

<References :items="CssPreprocessorItems"/>

## 可视化学习文档

<References :items="VisualizationItems"/>

## Vue 全家桶

<References :items="VueItems"/>

## React 全家桶

<References :items="ReactItems"/>

## 高性能编译工具

<References :items="CompilerPreProcessorItems"/>

## 代码规范工具

<References :items="FormatItems"/>

## 开源组件库

<References :items="ComponentLibItems" />

## 人工智能

<References :items="AiItems"/>

## Python 技术

<References :items="PythonItems"/>

## Linux 运维

<References :items="LinuxItems"/>

## 优秀博客

<References :items="BlogItems"/>

## 优质学习网站

<References :items="LeaningWebsites"/>

## 实用开发文档

<References :items="DevelopmentDocumentsItems"/>
