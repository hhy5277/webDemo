/**
 * Created by laixiangran on 2016/12/25.
 * homepage：http://www.laixiangran.cn
 */

/**
 * 汉诺塔益智游戏
 * @param disc 当前移动的圆盘编号
 * @param src 源柱子
 * @param aux 辅助柱子
 * @param dst 目标柱子
 */
function hanoi(disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        console.log(`从柱子${src}移动圆盘${disc}到柱子${dst}`);
        hanoi(disc - 1, aux, src, dst);
    }
}

hanoi(3,'1','2','3');