<script setup lang='ts'>
</script>

<template>
    <div class="body-demo">
        <header>1</header>
        <aside>2</aside>
        <main>3</main>
        <footer>4</footer>
    </div>
</template>

<style scoped lang='css'>
@property --sidebar-width {
    /** 属性值的数据类型, 后续更改会依据数据类型是否一致从而决定是否覆盖该属性 */
    syntax: "<length>";
    /** 是否允许继承, 允许继承也就表示可以重写, 不允许继承则会始终使用初始值 */
    inherits: true;
    /** 初始值 */
    initial-value: 200px;
}

.body-demo {
    * {
        margin: 0;
        padding: 0;
        box-sizing: content-box;
    }

    min-height: 300px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: var(--sidebar-width) 1fr;
    grid-template-areas: "navbar navbar"
    "sidebar main"
    "sidebar footer";
}

header {
    grid-area: navbar;
    background-color: #f1c40f;
    height: 100px;
}

aside {
    grid-area: sidebar;
    background-color: #3498db;
}

main {
    grid-area: main;
    background-color: #2ecc71;
}

footer {
    grid-area: footer;
    background-color: #e74c3c;
}
</style>