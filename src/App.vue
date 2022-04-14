<template>
    <div id="app">
        <layout-header class="head" />
        <layout-aside class="aside" />
        <layout-article class="article" />
        <layout-footer class="footer" />
    </div>
</template>
<script>
import LayoutHeader from "layout/Header";
import LayoutAside from "layout/Aside";
import LayoutArticle from "layout/Article";
import LayoutFooter from "layout/Footer";
export default {
    name: "App",
    components: {
        LayoutHeader,
        LayoutAside,
        LayoutArticle,
        LayoutFooter,
    },
};
</script>

<style lang="less">
body {
}
@import url("./styles/index.css");
#app {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: linear-gradient(to right bottom, #00c3ff, pink, #ffff1c);
    .head {
        border-bottom: pink 2px dotted;
    }
    .aside {
        border-right: pink 2px dotted;
    }
    .head,
    .aside,
    .article,
    .footer {
        border-radius: 5px;
    }
}
</style>
