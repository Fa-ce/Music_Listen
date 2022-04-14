import { request } from 'network/request'

export function _phoneVerify(phone) {
    return request({
        url: '/cellphone/existence/check',
        params: {
            phone: phone
        }
    })
}

/**获取用户歌单 */
export function _getSongList(id) {
    return request({
        url: '/user/playlist',
        params: {
            uid: id
        }
    })
}

export class PlayList {
    constructor(playlist) {
        this.name = playlist.name;//为了方便menu使用
        this.id = playlist.id;
        this.cover = playlist.coverImgUrl;
    }
}