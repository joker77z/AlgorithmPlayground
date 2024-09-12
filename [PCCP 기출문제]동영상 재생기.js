function getSeconds(time) {
  let totalSeconds = 0;
  const [minute, second] = time.split(":");
  totalSeconds += Number(minute) * 60;
  totalSeconds += Number(second);

  return totalSeconds;
}
function checkOpeningAndOverTime(curSeconds, opStartSeconds, opEndSeconds) {
  if (opStartSeconds <= curSeconds && curSeconds <= opEndSeconds) {
    return opEndSeconds;
  } else {
    return curSeconds;
  }
}
function transformSecondsToTime(seconds) {
  const minute = Math.floor(seconds / 60);
  const second = Math.floor(seconds % 60);
  return `${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}

const COMMAND = Object.freeze({
  NEXT: "next",
  PREV: "prev",
});

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/340213?language=javascript
 * [PCCP 기출문제] 1번 / 동영상 재생기
 */
function solution(video_len, pos, op_start, op_end, commands) {
  let curSeconds = getSeconds(pos);
  const videoLenSeconds = getSeconds(video_len);
  const opStartSeconds = getSeconds(op_start);
  const opEndSeconds = getSeconds(op_end);

  curSeconds = checkOpeningAndOverTime(curSeconds, opStartSeconds, opEndSeconds);
  commands.forEach((command) => {
    if (command === COMMAND.NEXT) {
      curSeconds = Math.min(curSeconds + 10, videoLenSeconds);
    } else if (command === COMMAND.PREV) {
      curSeconds = Math.max(0, curSeconds - 10);
    }
    curSeconds = checkOpeningAndOverTime(curSeconds, opStartSeconds, opEndSeconds);
  });

  return transformSecondsToTime(curSeconds);
}
