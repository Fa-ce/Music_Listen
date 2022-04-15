<template>
    <div class="asideMenu" :class="asideClass">
        <div class="menu" ref="menu">
            <b-menu
                :menu="menuList"
                vertical
                item-width="100%"
                item-height="50px"
                :text-color="theme == 'dark' ? 'var(--dark-text-color)' : ''"
                :active-color="getActiveColor"
            ></b-menu>
            <div
                class="my-music-list"
                @mouseenter="handleRefresh"
                v-if="playList.length"
            >
                <p class="title">创建的歌单</p>
                <scroll class="aside-scroll" ref="scroll">
                    <ul class="my-music-list-main">
                        <li
                            v-for="(item, index) in playList"
                            :key="index"
                            @click="enterMusicListDetail(index)"
                        >
                            <img :src="item.cover" alt="" />
                            <div class="my-music-list-main-name">
                                {{ item.name }}
                            </div>
                        </li>
                    </ul>
                </scroll>
            </div>
        </div>
    </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
import { forcible } from "mixin/components/forcible-refresh";
import { _getSongList, PlayList } from "network/user";
import Scroll from "common/scroll/Scroll";
export default {
    name: "LayoutAside",
    mixins: [theme, forcible],
    components: { Scroll },
    data() {
        return {
            menuList: [
                {
                    link: "/individuation",
                    icon: "el-icon-share",
                    content: "热门推荐",
                },
                {
                    link: "/artist-list",
                    icon: "el-icon-s-custom",
                    content: "歌手查找",
                },
                {
                    link: "/new-songs",
                    icon: "el-icon-s-promotion",
                    content: "最新音乐",
                },
                {
                    link: "/mv",
                    icon: "el-icon-magic-stick",
                    content: "MV推送",
                },
                {
                    link: "/ranklist",
                    icon: "el-icon-s-data",
                    content: "榜单排行",
                },
                {
                    link: "/allmusiclist",

                    icon: "el-icon-s-order",
                    content: "歌单分类",
                },
                {
                    link: "/mv-list",
                    icon: "el-icon-video-camera",
                    content: "全部MV",
                },
            ],
            playList: [],
        };
    },
    computed: {
        asideClass() {
            return [
                `${this.program + "aside"}`,
                `${this.program + "aside-" + this.theme}`,
            ];
        },
        getUserId() {
            return this.$store.getters.getUserId;
        },
    },
    methods: {
        getPriPlayList() {
            this.playList = [];
            _getSongList(this.getUserId).then((res) => {
                let playlist = res.data.playlist;
                for (let i in playlist) {
                    let playList = new PlayList(playlist[i]);
                    this.playList.push(playList);
                    if (i == playlist.length - 1) {
                        // localStorage目前只能存储字符串，想存储复杂类型可行要使用JSON.stringify(this.playList)格式转换
                        localStorage.setItem(
                            "playList",
                            JSON.stringify(this.playList)
                        );
                    }
                }
            });
        },
        /**进入歌单详情 */
        enterMusicListDetail(index) {
            this.$router.push(
                "/musiclistdetail/" +
                    this.playList[index].id +
                    "/" +
                    new Date().getTime()
            );
        },
    },
    created() {
        /**首先从本地存储获取歌单，没有则请求数据 */
        if (localStorage.getItem("playList")) {
            this.playList = JSON.parse(localStorage.getItem("playList"));
        } else {
            if (this.getUserId) this.getPriPlayList();
        }
    },
    watch: {
        getUserId() {
            this.getPriPlayList();
        },
    },
};
</script>
<style lang="less" scoped>
.asidemenu {
    background-color: skyblue;
    // height: 100%;
    border: 1px solid black;
}
.dance-music-aside {
    height: calc(100% - 58px - 60px);
    width: 18%;
    float: left;
    padding-left: 1px;
    &-light {
        background: var(--light-aside-bg-color);
    }
}
.menu {
    height: 50%;
}
.aside-scroll {
    height: calc(50% -60px);
}
.my-music-list {
    height: calc(50% -60px);
    padding: 10px 0px;
    .title {
        font-size: 13px;
    }
    &-main {
        list-style-type: none;
        padding-left: 20px;
        li {
            height: 30px;
            font-size: 13px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
            display: flex;
            align-items: center;
            img {
                height: 80%;
                border-radius: 2px;
            }
        }
        &-name {
            padding: 0px 10px;
        }
    }
}
</style>