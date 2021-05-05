import * as Utils from '../utils/utils'
import {GameConfig, Const} from '../index';

const GameUtil = {
	randomLeaveSpawnPoint: () => {
		const minX = Const.leaveWidth / 2;
		const maxX = Const.getSceneWidth() - minX;
		const maxY = Const.getSceneHeight();
		const randX = Utils.randomInt(minX, maxX);
		const randY = Utils.randomInt(70, 80);
		const adjustMaxX = maxY <= 768 ? 6 : 12;
		const adjustMinX = maxY <= 768 ? 4 : 8;
		const randSpeedX = Utils.randomInt(GameConfig.leaveSpeedX.min, GameConfig.leaveSpeedX.max);
		//const randSpeedY = Utils.randomInt(GameConfig.leaveSpeedY.min, adjustMaxX);
		const randSpeedY = Utils.randomInt(adjustMinX, adjustMaxX);
		return {
			x: randX,
			y: randY,
			speedX: randSpeedX,
			speedY: randSpeedY,
		}
	}
}

export default GameUtil;
