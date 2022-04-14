export const theme = {
    data() {
        return {
            program: 'dance-music-',
        }
    },
    computed: {
        /**监听theme */
        theme() {
            return this.$store.getters.getTheme;
        },
        /**获取当前theme */
        getTheme() {
            let theme = 'light';
            return theme;
        },
        /**边框、按钮--活跃颜色 */
        getActiveColor() {
            let color = "white";
            return color;
        },
        /**全局斑马线背景颜色 */
        getStripeColor() {
            // let stripeColor = "skyblue";            
            // let stripeColor = "pink";
            let stripeColor = "#f2fdff";
            return stripeColor;
        },
        /**全局关键动态组件主题颜色*/
        iconActiveColor() {
            let color = "light";
            return color;
        },
    }
}