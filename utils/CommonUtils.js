/**
 * Created by liuyandong on 2017/10/22.
 */
export default class CommonUtils {
    static reject(message) {
        return Promise.reject({code: message, message: message});
    }
}