<template>
    <div class="headClass-class">
        <div :class="program + 'header-title'">
            <div class="titleIcon">
                <img
                    src="../assets/img/icon.gif"
                    alt=""
                    srcset=""
                    @click="titleInfo"
                />
            </div>
        </div>
        <div :class="program + 'header-main'">
            <div class="left">
                <b-poptip
                    ref="searchPoptip"
                    trigger="focus"
                    :theme="getTheme"
                    placement="bottom-start"
                    max-length="430px"
                >
                    <b-input
                        v-model="keywords"
                        search
                        @search="handleSearchForword"
                        @keyupEnter="handleSearchForword"
                        size="large"
                        round
                        :maxlength="10"
                    />
                    <template v-slot:content>
                        <hot-search-list
                            v-show="!isSearch"
                            @hidden="handleSearchPopHidden"
                        />
                        <search-suggest
                            :keywords="keywords"
                            v-show="isSearch"
                            @hidden="handleSearchPopHidden"
                        />
                    </template>
                </b-poptip>
            </div>
            <div class="right">
                <div class="headline">
                    <b-tooltip
                        placement="left-start"
                        trigger="click"
                        :theme="getTheme"
                    >
                        <!-- <h2>Music Listen</h2> -->
                        <i class="iconfont">Music Listen</i>
                        <div slot="content">悦听 Music Listen</div>
                    </b-tooltip>
                </div>
                <a href="https://github.com/Fa-ce/Music_Listen" target="_blank">
                    <b-tooltip :theme="getTheme">
                        <div
                            :class="[
                                `${theme + '-item'}`,
                                'item iconfont icon-github',
                            ]"
                        ></div>
                        <div slot="content">Github</div>
                    </b-tooltip>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
import HotSearchList from "content/search/hot-search-list";
import SearchSuggest from "content/search/search-suggest";
export default {
    name: "LayoutHeader",
    mixins: [theme],
    components: {
        HotSearchList,
        SearchSuggest,
    },
    data() {
        return {
            isShow: false,
            keywords: "",
            isSearch: false, //是否在搜索
        };
    },
    computed: {
        getAvatar() {
            return this.$store.getters.getAvatar;
        },
    },
    methods: {
        handleMouseEnter() {
            this.isShow = true;
        },
        handleMouseLeave() {
            this.isShow = false;
        },

        /**处理搜索建议点击，Poptip隐藏 */
        handleSearchPopHidden() {
            this.$refs.searchPoptip.hidden();
        },
        /**处理搜索-->跳转到搜索详情 */
        handleSearchForword() {
            if (this.keywords.trim() === "") {
                this.keywords = "";
                this.$Toast.error("输入内容为空,请输入要查询的歌曲");
            } else {
                this.$router.push(`/search-detail/${this.keywords}`);
                this.$refs.searchPoptip.hidden();
                this.keywords = "";
            }
        },
        titleInfo() {
            this.$Notice.info({
                title: "系统提示：",
                desc: "欢迎使用悦听音乐~",
            });
            this.$router.push({
                path: "/individuation",
            });
        },
    },
    watch: {
        /**监听搜索关键词 ，控制热搜列表显示隐藏*/
        keywords() {
            if (this.keywords != "" && !this.isSearch) {
                this.isSearch = true;
            }
            /**搜索关键词为空，并且isSearch为true时设置isSearch为false显示热搜列表 */
            if (this.keywords == "" && this.isSearch) {
                this.isSearch = false;
            }
        },
    },
};
</script>
<style lang="less" scoped>
.headClass-class {
    .titleIcon img {
        width: 80px;
        height: 60px;
        margin-left: 50px;
        cursor: pointer;
    }
    display: flex;
    .el-icon-service {
        margin: 10%;
        width: 200%;
        height: 100%;
    }
    .left input {
        border-radius: 5px;
        .inputSear {
            border-radius: 5px;
            width: 50%;
            height: 80%;
        }
    }
}
.dance-music-header {
    // .Music-Listen {
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    &-title {
        width: 28%;
        height: 100%;
        text-align: center;
        display: flex;
        cursor: pointer;
        &-left {
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .item {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                line-height: 18px;
                overflow: hidden;
                cursor: pointer;
                i {
                    display: inline-block;
                }
            }
        }
        &-right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .item {
                flex: 1;
                text-align: center;
                cursor: pointer;
            }
            .title {
                color: #30dff3;
            }
        }
    }
    &-main {
        width: 85%;
        height: 100%;
        display: flex;
        // flex: 1;
        .left {
            flex: 1;
            text-align: center;
            line-height: 58px;
            ::v-deep .vbestui-bubble {
                padding: 0px;
            }
        }
        .right {
            flex: 2;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .avatar {
                margin-right: 60px;
                cursor: pointer;
            }
            a {
                text-decoration: none;
            }
            .item {
                width: 60px;
                text-align: center;
                font-size: 22px;
            }
            .iconfont {
                font-size: 24px;
            }
            .poptip-title {
                font-size: 16px;
                text-align: left;
            }
        }
    }
}
.el-icon-back {
    font-size: 20px;
}
.header-side-enter-active {
    animation: slideInDown 0.4s;
}
.header-side-leave-active {
    animation: slideInDown 0.4s reverse;
}
// light主题
.dance-music-light-header {
    background: var(--light-bg-color);
}
.vbestui-tool-tip {
    margin-right: 20px;
}
</style>